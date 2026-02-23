import { create } from 'zustand';
import { INITIAL_DEMO_STATE } from '@/data/demoData';
import type { DayData, Notification } from '@/types';

export const DEMO_STORAGE_KEY = 'walki_demo_state';

const STREAK_MILESTONES = new Set([7, 14, 21]);

type MilestoneEvent = {
  id: string;
  title: string;
  message: string;
};

type PersistedNotification = Omit<Notification, 'timestamp'> & { timestamp: string };

type PersistedDemoState = {
  currentSteps: number;
  streak: number;
  notifications: PersistedNotification[];
  seenMilestones: string[];
  calendarData?: DayData[];
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
  addSteps: (amount: number) => void;
  addNotification: (notification: Notification, templateId?: string) => void;
  dismissMilestone: () => void;
};

const getTodayIso = () => new Date().toISOString().split('T')[0];

const withTodaySteps = (calendarData: DayData[], steps: number, goal: number): DayData[] => {
  const today = getTodayIso();
  let hasToday = false;

  const updated = calendarData.map((day) => {
    if (day.date !== today) {
      return day;
    }

    hasToday = true;
    return {
      ...day,
      steps,
      goal,
      completed: steps >= goal,
    };
  });

  if (hasToday) {
    return updated;
  }

  return [
    ...updated,
    {
      date: today,
      steps,
      goal,
      completed: steps >= goal,
      freezeUsed: false,
      walkingEvents: [],
    },
  ];
};

const toPersistedNotification = (notification: Notification): PersistedNotification => ({
  ...notification,
  timestamp: notification.timestamp.toISOString(),
});

const toRuntimeNotification = (notification: PersistedNotification): Notification => ({
  ...notification,
  timestamp: new Date(notification.timestamp),
});

const hydrateInitial = () => {
  const baseCurrentSteps = INITIAL_DEMO_STATE.todaySteps;
  const baseDailyGoal = INITIAL_DEMO_STATE.dailyGoal;
  const baseStreak = INITIAL_DEMO_STATE.currentStreak;
  const baseCalendarData = withTodaySteps(INITIAL_DEMO_STATE.calendarData, baseCurrentSteps, baseDailyGoal);

  if (typeof window === 'undefined') {
    return {
      currentSteps: baseCurrentSteps,
      streak: baseStreak,
      dailyGoal: baseDailyGoal,
      calendarData: baseCalendarData,
      notifications: [] as Notification[],
      seenMilestones: [] as string[],
    };
  }

  try {
    const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
    if (!raw) {
      return {
        currentSteps: baseCurrentSteps,
        streak: baseStreak,
        dailyGoal: baseDailyGoal,
        calendarData: baseCalendarData,
        notifications: [] as Notification[],
        seenMilestones: [] as string[],
      };
    }

    const parsed = JSON.parse(raw) as PersistedDemoState;
    const currentSteps =
      typeof parsed.currentSteps === 'number' && Number.isFinite(parsed.currentSteps)
        ? Math.max(0, Math.floor(parsed.currentSteps))
        : baseCurrentSteps;
    const streak =
      typeof parsed.streak === 'number' && Number.isFinite(parsed.streak) ? Math.max(0, Math.floor(parsed.streak)) : baseStreak;
    const seenMilestones = Array.isArray(parsed.seenMilestones)
      ? parsed.seenMilestones.filter((id): id is string => typeof id === 'string')
      : [];
    const notifications = Array.isArray(parsed.notifications)
      ? parsed.notifications.map(toRuntimeNotification).slice(0, 50)
      : [];

    const baseWithCurrentSteps = withTodaySteps(baseCalendarData, currentSteps, baseDailyGoal);
    const calendarData = Array.isArray(parsed.calendarData)
      ? withTodaySteps(parsed.calendarData, currentSteps, baseDailyGoal)
      : baseWithCurrentSteps;

    return {
      currentSteps,
      streak,
      dailyGoal: baseDailyGoal,
      calendarData,
      notifications,
      seenMilestones,
    };
  } catch {
    return {
      currentSteps: baseCurrentSteps,
      streak: baseStreak,
      dailyGoal: baseDailyGoal,
      calendarData: baseCalendarData,
      notifications: [] as Notification[],
      seenMilestones: [] as string[],
    };
  }
};

const persistState = (state: DemoStore) => {
  if (typeof window === 'undefined') {
    return;
  }

  const payload: PersistedDemoState = {
    currentSteps: state.currentSteps,
    streak: state.streak,
    notifications: state.notifications.slice(0, 50).map(toPersistedNotification),
    seenMilestones: state.seenMilestones,
    calendarData: state.calendarData,
  };

  window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(payload));
};

const initial = hydrateInitial();

export const useDemoStore = create<DemoStore>((set) => ({
  currentSteps: initial.currentSteps,
  streak: initial.streak,
  dailyGoal: initial.dailyGoal,
  calendarData: initial.calendarData,
  notifications: initial.notifications,
  recentTemplateIds: [],
  seenMilestones: initial.seenMilestones,
  activeMilestone: null,
  queuedMilestones: [],

  addSteps: (amount) => {
    const sanitizedAmount = Number.isFinite(amount) ? Math.floor(amount) : 0;
    if (sanitizedAmount <= 0) {
      return;
    }

    set((state) => {
      const nextSteps = state.currentSteps + sanitizedAmount;
      const wasGoalMet = state.currentSteps >= state.dailyGoal;
      const isGoalMet = nextSteps >= state.dailyGoal;
      const nextStreak = !wasGoalMet && isGoalMet ? state.streak + 1 : state.streak;
      const nextCalendarData = withTodaySteps(state.calendarData, nextSteps, state.dailyGoal);

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
}));

export type { DemoStore, MilestoneEvent };
