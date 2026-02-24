import { create } from 'zustand';
import { INITIAL_DEMO_STATE } from '@/data/demoData';
import { PERSONA_HEX } from '@/lib/persona';
import type { DayData, DemoTab, Notification, PersonaId, PersonaPercentages, Settings } from '@/types';

export const DEMO_STORAGE_KEY = 'walki_demo_state';

const STREAK_MILESTONES = new Set([7, 14, 21]);
const DEMO_TABS: DemoTab[] = ['home', 'calendar', 'personas', 'settings'];
const PERSONA_IDS: PersonaId[] = ['sunny', 'dr-quinn', 'pep', 'rico', 'fern', 'rusty'];

type MilestoneEvent = {
  id: string;
  title: string;
  message: string;
};

type PersistedNotification = Omit<Notification, 'timestamp'> & { timestamp: string };

type PersistedDemoState = {
  currentSteps: number;
  streak: number;
  dailyGoal: number;
  calendarData: DayData[];
  notifications: PersistedNotification[];
  seenMilestones: string[];
  personaWeights: PersonaPercentages;
  settings: Settings;
  activeTab?: DemoTab;
  recentTemplateIds?: string[];
  personaWeightsCustomized?: boolean;
  recentPersonaId?: PersonaId | null;
  recentPersonaColor?: string | null;
};

type DemoStore = {
  currentSteps: number;
  streak: number;
  dailyGoal: number;
  calendarData: DayData[];
  notifications: Notification[];
  recentTemplateIds: string[];
  seenMilestones: string[];
  activeMilestone: MilestoneEvent | null;
  queuedMilestones: MilestoneEvent[];
  personaWeights: PersonaPercentages;
  personaWeightsCustomized: boolean;
  recentPersonaId: PersonaId | null;
  recentPersonaColor: string | null;
  settings: Settings;
  activeTab: DemoTab;
  addSteps: (amount: number) => void;
  addNotification: (notification: Notification, templateId?: string) => void;
  dismissMilestone: () => void;
  setActiveTab: (tab: DemoTab) => void;
  setPersonaWeight: (personaId: PersonaId, value: number) => void;
  resetPersonaWeights: (weights: PersonaPercentages) => void;
  hydratePersonaWeights: (weights: PersonaPercentages) => void;
  updateSettings: (updates: Partial<Settings>) => void;
  setDailyGoal: (dailyGoal: number) => void;
  resetDemo: () => void;
};

const getTodayIso = () => new Date().toISOString().split('T')[0];

const clampInt = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Math.round(Number.isFinite(value) ? value : min)));

const sanitizeGoal = (goal: number) => clampInt(goal, 3000, 20000);

const sanitizeSettings = (value: Partial<Settings> | undefined, base: Settings): Settings => ({
  dailyGoal:
    typeof value?.dailyGoal === 'number' && Number.isFinite(value.dailyGoal)
      ? sanitizeGoal(value.dailyGoal)
      : base.dailyGoal,
  morningNotificationTime:
    typeof value?.morningNotificationTime === 'string' && value.morningNotificationTime.trim().length > 0
      ? value.morningNotificationTime
      : base.morningNotificationTime,
  eveningNotificationTime:
    typeof value?.eveningNotificationTime === 'string' && value.eveningNotificationTime.trim().length > 0
      ? value.eveningNotificationTime
      : base.eveningNotificationTime,
  notificationFrequency:
    typeof value?.notificationFrequency === 'number' && Number.isFinite(value.notificationFrequency)
      ? clampInt(value.notificationFrequency, 1, 4)
      : base.notificationFrequency,
  randomizeTiming: typeof value?.randomizeTiming === 'boolean' ? value.randomizeTiming : base.randomizeTiming,
  showStreakOnHome: typeof value?.showStreakOnHome === 'boolean' ? value.showStreakOnHome : base.showStreakOnHome,
  enableMorningNotifications:
    typeof value?.enableMorningNotifications === 'boolean'
      ? value.enableMorningNotifications
      : base.enableMorningNotifications,
  enableAfternoonNotifications:
    typeof value?.enableAfternoonNotifications === 'boolean'
      ? value.enableAfternoonNotifications
      : base.enableAfternoonNotifications,
  enableEveningNotifications:
    typeof value?.enableEveningNotifications === 'boolean'
      ? value.enableEveningNotifications
      : base.enableEveningNotifications,
});

const getSafeActiveTab = (tab: unknown): DemoTab => (typeof tab === 'string' && DEMO_TABS.includes(tab as DemoTab) ? (tab as DemoTab) : 'home');

const toPersistedNotification = (notification: Notification): PersistedNotification => ({
  ...notification,
  timestamp: notification.timestamp.toISOString(),
});

const toRuntimeNotification = (notification: PersistedNotification): Notification => ({
  ...notification,
  timestamp: new Date(notification.timestamp),
});

const toNormalizedPercentages = (values: Record<PersonaId, number>): PersonaPercentages => {
  const rawTotal = PERSONA_IDS.reduce((sum, personaId) => sum + Math.max(0, values[personaId] ?? 0), 0);
  if (rawTotal <= 0) {
    return {
      sunny: 17,
      'dr-quinn': 17,
      pep: 17,
      rico: 17,
      fern: 16,
      rusty: 16,
    };
  }

  const exactValues = PERSONA_IDS.map((personaId) => ({
    personaId,
    exact: (Math.max(0, values[personaId] ?? 0) / rawTotal) * 100,
  }));
  const floors = exactValues.map((item) => ({
    ...item,
    floored: Math.floor(item.exact),
    remainder: item.exact - Math.floor(item.exact),
  }));

  let remaining = 100 - floors.reduce((sum, item) => sum + item.floored, 0);
  const byRemainder = [...floors].sort((a, b) => b.remainder - a.remainder);

  const result: Record<PersonaId, number> = {
    sunny: 0,
    'dr-quinn': 0,
    pep: 0,
    rico: 0,
    fern: 0,
    rusty: 0,
  };

  for (const item of floors) {
    result[item.personaId] = item.floored;
  }

  for (let index = 0; index < byRemainder.length && remaining > 0; index += 1) {
    result[byRemainder[index].personaId] += 1;
    remaining -= 1;
  }

  return result;
};

const sanitizePersonaWeights = (weights: Partial<PersonaPercentages> | undefined, base: PersonaPercentages): PersonaPercentages => {
  if (!weights) {
    return base;
  }

  const candidate: Record<PersonaId, number> = {
    sunny: typeof weights.sunny === 'number' ? weights.sunny : base.sunny,
    'dr-quinn': typeof weights['dr-quinn'] === 'number' ? weights['dr-quinn'] : base['dr-quinn'],
    pep: typeof weights.pep === 'number' ? weights.pep : base.pep,
    rico: typeof weights.rico === 'number' ? weights.rico : base.rico,
    fern: typeof weights.fern === 'number' ? weights.fern : base.fern,
    rusty: typeof weights.rusty === 'number' ? weights.rusty : base.rusty,
  };

  return toNormalizedPercentages(candidate);
};

const updateWeightsForPersona = (
  current: PersonaPercentages,
  personaId: PersonaId,
  value: number,
): PersonaPercentages => {
  const nextValue = clampInt(value, 0, 100);
  const remainingBudget = 100 - nextValue;
  const otherIds = PERSONA_IDS.filter((id) => id !== personaId);
  const currentOtherTotal = otherIds.reduce((sum, id) => sum + current[id], 0);

  const raw: Record<PersonaId, number> = {
    ...current,
    [personaId]: nextValue,
  };

  if (remainingBudget === 0) {
    for (const id of otherIds) {
      raw[id] = 0;
    }
    return raw;
  }

  if (currentOtherTotal <= 0) {
    const evenSplit = remainingBudget / otherIds.length;
    for (const id of otherIds) {
      raw[id] = evenSplit;
    }
    return toNormalizedPercentages(raw);
  }

  for (const id of otherIds) {
    raw[id] = (current[id] / currentOtherTotal) * remainingBudget;
  }

  return toNormalizedPercentages(raw);
};

const withGoalApplied = (calendarData: DayData[], stepsForToday: number, dailyGoal: number): DayData[] => {
  const today = getTodayIso();
  let hasToday = false;

  const updated = calendarData.map((day) => {
    const steps = day.date === today ? stepsForToday : Math.max(0, Math.floor(day.steps));
    if (day.date === today) {
      hasToday = true;
    }

    return {
      ...day,
      steps,
      goal: dailyGoal,
      completed: day.freezeUsed ? true : steps >= dailyGoal,
      walkingEvents: Array.isArray(day.walkingEvents) ? day.walkingEvents : [],
    };
  });

  if (hasToday) {
    return updated;
  }

  return [
    ...updated,
    {
      date: today,
      steps: stepsForToday,
      goal: dailyGoal,
      completed: stepsForToday >= dailyGoal,
      freezeUsed: false,
      walkingEvents: [],
    },
  ];
};

const calculateCurrentStreak = (calendarData: DayData[]): number => {
  const sorted = [...calendarData].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;

  for (const day of sorted) {
    const activeDay = day.completed || day.freezeUsed;
    if (!activeDay) {
      break;
    }
    streak += 1;
  }

  return streak;
};

const persistState = (state: DemoStore) => {
  if (typeof window === 'undefined') {
    return;
  }

  const payload: PersistedDemoState = {
    currentSteps: state.currentSteps,
    streak: state.streak,
    dailyGoal: state.dailyGoal,
    calendarData: state.calendarData,
    notifications: state.notifications.slice(0, 50).map(toPersistedNotification),
    seenMilestones: state.seenMilestones,
    personaWeights: state.personaWeights,
    settings: state.settings,
    activeTab: state.activeTab,
    recentTemplateIds: state.recentTemplateIds,
    personaWeightsCustomized: state.personaWeightsCustomized,
    recentPersonaId: state.recentPersonaId,
    recentPersonaColor: state.recentPersonaColor,
  };

  window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(payload));
};

const getBaseState = () => {
  const baseGoal = sanitizeGoal(INITIAL_DEMO_STATE.dailyGoal);
  const baseSettings = sanitizeSettings(INITIAL_DEMO_STATE.settings, INITIAL_DEMO_STATE.settings);
  const currentSteps = Math.max(0, Math.floor(INITIAL_DEMO_STATE.todaySteps));
  const calendarData = withGoalApplied(INITIAL_DEMO_STATE.calendarData, currentSteps, baseGoal);

  return {
    currentSteps,
    streak: calculateCurrentStreak(calendarData),
    dailyGoal: baseGoal,
    calendarData,
    notifications: [] as Notification[],
    recentTemplateIds: [] as string[],
    seenMilestones: [] as string[],
    personaWeights: sanitizePersonaWeights(INITIAL_DEMO_STATE.personaWeights, INITIAL_DEMO_STATE.personaWeights),
    personaWeightsCustomized: false,
    recentPersonaId: null as PersonaId | null,
    recentPersonaColor: null as string | null,
    settings: {
      ...baseSettings,
      dailyGoal: baseGoal,
    },
    activeTab: 'home' as DemoTab,
  };
};

const hydrateInitial = () => {
  const base = getBaseState();

  if (typeof window === 'undefined') {
    return base;
  }

  try {
    const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) {
      return base;
    }

    const parsed = JSON.parse(raw) as PersistedDemoState;
    const currentSteps = typeof parsed.currentSteps === 'number' ? Math.max(0, Math.floor(parsed.currentSteps)) : base.currentSteps;
    const dailyGoal = typeof parsed.dailyGoal === 'number' ? sanitizeGoal(parsed.dailyGoal) : base.dailyGoal;
    const settings = sanitizeSettings(parsed.settings, {
      ...base.settings,
      dailyGoal,
    });

    const calendarSource = Array.isArray(parsed.calendarData) ? parsed.calendarData : base.calendarData;
    const calendarData = withGoalApplied(calendarSource, currentSteps, dailyGoal);

    const notifications = Array.isArray(parsed.notifications)
      ? parsed.notifications.map(toRuntimeNotification).slice(0, 50)
      : base.notifications;

    const seenMilestones = Array.isArray(parsed.seenMilestones)
      ? parsed.seenMilestones.filter((id): id is string => typeof id === 'string')
      : base.seenMilestones;

    const recentTemplateIds = Array.isArray(parsed.recentTemplateIds)
      ? parsed.recentTemplateIds.filter((id): id is string => typeof id === 'string').slice(0, 30)
      : base.recentTemplateIds;

    const personaWeights = sanitizePersonaWeights(parsed.personaWeights, base.personaWeights);
    const recentPersonaId =
      typeof parsed.recentPersonaId === 'string' && PERSONA_IDS.includes(parsed.recentPersonaId as PersonaId)
        ? (parsed.recentPersonaId as PersonaId)
        : null;
    const recentPersonaColor =
      typeof parsed.recentPersonaColor === 'string' && parsed.recentPersonaColor.trim().length > 0
        ? parsed.recentPersonaColor
        : recentPersonaId
          ? PERSONA_HEX[recentPersonaId]
          : null;

    return {
      currentSteps,
      dailyGoal,
      streak: calculateCurrentStreak(calendarData),
      calendarData,
      notifications,
      seenMilestones,
      recentTemplateIds,
      personaWeights,
      personaWeightsCustomized: Boolean(parsed.personaWeightsCustomized),
      recentPersonaId,
      recentPersonaColor,
      settings: {
        ...settings,
        dailyGoal,
      },
      activeTab: getSafeActiveTab(parsed.activeTab),
    };
  } catch {
    return base;
  }
};

const initial = hydrateInitial();

export const useDemoStore = create<DemoStore>((set) => ({
  currentSteps: initial.currentSteps,
  streak: initial.streak,
  dailyGoal: initial.dailyGoal,
  calendarData: initial.calendarData,
  notifications: initial.notifications,
  recentTemplateIds: initial.recentTemplateIds,
  seenMilestones: initial.seenMilestones,
  activeMilestone: null,
  queuedMilestones: [],
  personaWeights: initial.personaWeights,
  personaWeightsCustomized: initial.personaWeightsCustomized,
  recentPersonaId: initial.recentPersonaId,
  recentPersonaColor: initial.recentPersonaColor,
  settings: initial.settings,
  activeTab: initial.activeTab,

  addSteps: (amount) => {
    const sanitizedAmount = Number.isFinite(amount) ? Math.floor(amount) : 0;
    if (sanitizedAmount <= 0) {
      return;
    }

    set((state) => {
      const nextSteps = state.currentSteps + sanitizedAmount;
      const wasGoalMet = state.currentSteps >= state.dailyGoal;
      const isGoalMet = nextSteps >= state.dailyGoal;
      const nextCalendarData = withGoalApplied(state.calendarData, nextSteps, state.dailyGoal);
      const nextStreak = calculateCurrentStreak(nextCalendarData);

      const milestonesToAdd: MilestoneEvent[] = [];

      if (!wasGoalMet && isGoalMet) {
        const todayGoalMilestoneId = `goal-${getTodayIso()}`;
        if (!state.seenMilestones.includes(todayGoalMilestoneId)) {
          milestonesToAdd.push({
            id: todayGoalMilestoneId,
            title: 'Goal Reached',
            message: `You hit ${state.dailyGoal.toLocaleString()} steps. Incredible finish today.`,
          });
        }
      }

      if (STREAK_MILESTONES.has(nextStreak)) {
        const streakMilestoneId = `streak-${nextStreak}`;
        if (!state.seenMilestones.includes(streakMilestoneId)) {
          milestonesToAdd.push({
            id: streakMilestoneId,
            title: `${nextStreak}-Day Streak`,
            message: `Streak milestone unlocked: ${nextStreak} straight days.`,
          });
        }
      }

      const combinedQueue = [...state.queuedMilestones, ...milestonesToAdd];
      let nextActive = state.activeMilestone;
      let nextQueue = combinedQueue;

      if (!nextActive && nextQueue.length > 0) {
        const [firstMilestone, ...rest] = nextQueue;
        nextActive = firstMilestone;
        nextQueue = rest;
      }

      const next = {
        ...state,
        currentSteps: nextSteps,
        streak: nextStreak,
        calendarData: nextCalendarData,
        activeMilestone: nextActive,
        queuedMilestones: nextQueue,
        seenMilestones: [...state.seenMilestones, ...milestonesToAdd.map((milestone) => milestone.id)],
      };

      persistState(next);
      return next;
    });
  },

  addNotification: (notification, templateId) => {
    set((state) => {
      const nextNotifications = [notification, ...state.notifications].slice(0, 50);
      const nextRecentTemplateIds =
        templateId && templateId.length > 0 ? [templateId, ...state.recentTemplateIds].slice(0, 30) : state.recentTemplateIds;

      const next = {
        ...state,
        notifications: nextNotifications,
        recentTemplateIds: nextRecentTemplateIds,
        recentPersonaId: notification.personaId,
        recentPersonaColor: PERSONA_HEX[notification.personaId],
      };
      persistState(next);
      return next;
    });
  },

  dismissMilestone: () => {
    set((state) => {
      const [nextMilestone, ...rest] = state.queuedMilestones;
      const next = {
        ...state,
        activeMilestone: nextMilestone ?? null,
        queuedMilestones: rest,
      };
      persistState(next);
      return next;
    });
  },

  setActiveTab: (tab) => {
    set((state) => {
      const next = {
        ...state,
        activeTab: getSafeActiveTab(tab),
      };
      persistState(next);
      return next;
    });
  },

  setPersonaWeight: (personaId, value) => {
    set((state) => {
      const nextWeights = updateWeightsForPersona(state.personaWeights, personaId, value);
      const next = {
        ...state,
        personaWeights: nextWeights,
        personaWeightsCustomized: true,
      };
      persistState(next);
      return next;
    });
  },

  resetPersonaWeights: (weights) => {
    set((state) => {
      const next = {
        ...state,
        personaWeights: sanitizePersonaWeights(weights, state.personaWeights),
        personaWeightsCustomized: false,
      };
      persistState(next);
      return next;
    });
  },

  hydratePersonaWeights: (weights) => {
    set((state) => {
      if (state.personaWeightsCustomized) {
        return state;
      }

      const next = {
        ...state,
        personaWeights: sanitizePersonaWeights(weights, state.personaWeights),
      };
      persistState(next);
      return next;
    });
  },

  updateSettings: (updates) => {
    set((state) => {
      const nextSettings = sanitizeSettings(
        {
          ...state.settings,
          ...updates,
        },
        state.settings,
      );

      // Keep at least one time window enabled.
      if (!nextSettings.enableMorningNotifications && !nextSettings.enableAfternoonNotifications && !nextSettings.enableEveningNotifications) {
        nextSettings.enableEveningNotifications = true;
      }

      const next = {
        ...state,
        settings: nextSettings,
      };
      persistState(next);
      return next;
    });
  },

  setDailyGoal: (dailyGoal) => {
    set((state) => {
      const nextGoal = sanitizeGoal(dailyGoal);
      const nextCalendarData = withGoalApplied(state.calendarData, state.currentSteps, nextGoal);

      const next = {
        ...state,
        dailyGoal: nextGoal,
        calendarData: nextCalendarData,
        streak: calculateCurrentStreak(nextCalendarData),
        settings: {
          ...state.settings,
          dailyGoal: nextGoal,
        },
      };

      persistState(next);
      return next;
    });
  },

  resetDemo: () => {
    set((state) => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(DEMO_STORAGE_KEY);
      }

      const base = getBaseState();

      const next = {
        ...state,
        currentSteps: base.currentSteps,
        streak: base.streak,
        dailyGoal: base.dailyGoal,
        calendarData: base.calendarData,
        notifications: base.notifications,
        recentTemplateIds: base.recentTemplateIds,
        seenMilestones: base.seenMilestones,
        activeMilestone: null,
        queuedMilestones: [],
        personaWeights: base.personaWeights,
        personaWeightsCustomized: false,
        recentPersonaId: null,
        recentPersonaColor: null,
        settings: base.settings,
        activeTab: 'home' as DemoTab,
      };

      persistState(next);
      return next;
    });
  },
}));

export type { DemoStore, MilestoneEvent };
