import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button, Card, ProgressBar, StreakCounter } from '@/components/ui';
import { NotificationFeed } from '@/components/demo/NotificationFeed';
import { StepEntryModal } from '@/components/demo/StepEntryModal';
import { BottomNav } from '@/components/demo/BottomNav';
import { MilestoneModal } from '@/components/demo/MilestoneModal';
import { CalendarView } from '@/components/demo/CalendarView';
import { DayDetailModal } from '@/components/demo/DayDetailModal';
import { PersonasTab } from '@/components/demo/PersonasTab';
import { SettingsTab } from '@/components/demo/SettingsTab';
import { GoalConfetti } from '@/components/demo/GoalConfetti';
import { NOTIFICATION_LIBRARY } from '@/data/notificationLibrary';
import { PERSONAS } from '@/data/personas';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';
import { createNotificationContext, getTimeOfDay, selectNotification } from '@/utils/messageSelector';
import { injectContext } from '@/utils/contextInjection';
import { useDemoStore } from '@/store/demoStore';
import { useQuizStore } from '@/store/quizStore';
import type { DayData, NotificationContext, PersonaId, Settings } from '@/types';

const getPreferredTimeOfDay = (settings: Settings): NotificationContext['timeOfDay'] => {
  const current = getTimeOfDay();

  if (current === 'morning' && settings.enableMorningNotifications) {
    return current;
  }
  if (current === 'afternoon' && settings.enableAfternoonNotifications) {
    return current;
  }
  if (current === 'evening' && settings.enableEveningNotifications) {
    return current;
  }

  if (settings.enableMorningNotifications) {
    return 'morning';
  }
  if (settings.enableAfternoonNotifications) {
    return 'afternoon';
  }
  return 'evening';
};

const getFreezeSummary = (calendarData: DayData[]) => {
  const freezeDays = calendarData.filter((day) => day.freezeUsed).sort((a, b) => b.date.localeCompare(a.date));

  if (freezeDays.length === 0) {
    return { count: 0, mostRecentDaysAgo: null as number | null };
  }

  const today = new Date();
  const latest = new Date(freezeDays[0].date);
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysAgo = Math.max(0, Math.floor((today.getTime() - latest.getTime()) / msPerDay));

  return {
    count: freezeDays.length,
    mostRecentDaysAgo: daysAgo,
  };
};

export const DemoHome = () => {
  const reduceMotion = useReducedMotion();
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [isGeneratingMotivation, setIsGeneratingMotivation] = useState(false);
  const [typingPersonaId, setTypingPersonaId] = useState<PersonaId | null>(null);
  const [highlightedNotificationId, setHighlightedNotificationId] = useState<string | null>(null);
  const [showGoalConfetti, setShowGoalConfetti] = useState(false);
  const motivationTimerRef = useRef<number | null>(null);
  const highlightTimerRef = useRef<number | null>(null);
  const confettiTimerRef = useRef<number | null>(null);

  const currentSteps = useDemoStore((state) => state.currentSteps);
  const streak = useDemoStore((state) => state.streak);
  const dailyGoal = useDemoStore((state) => state.dailyGoal);
  const calendarData = useDemoStore((state) => state.calendarData);
  const notifications = useDemoStore((state) => state.notifications);
  const recentTemplateIds = useDemoStore((state) => state.recentTemplateIds);
  const activeMilestone = useDemoStore((state) => state.activeMilestone);
  const personaWeights = useDemoStore((state) => state.personaWeights);
  const settings = useDemoStore((state) => state.settings);
  const activeTab = useDemoStore((state) => state.activeTab);
  const recentPersonaId = useDemoStore((state) => state.recentPersonaId);
  const recentPersonaColor = useDemoStore((state) => state.recentPersonaColor);

  const addSteps = useDemoStore((state) => state.addSteps);
  const addNotification = useDemoStore((state) => state.addNotification);
  const dismissMilestone = useDemoStore((state) => state.dismissMilestone);
  const setActiveTab = useDemoStore((state) => state.setActiveTab);
  const setPersonaWeight = useDemoStore((state) => state.setPersonaWeight);
  const resetPersonaWeights = useDemoStore((state) => state.resetPersonaWeights);
  const hydratePersonaWeights = useDemoStore((state) => state.hydratePersonaWeights);
  const updateSettings = useDemoStore((state) => state.updateSettings);
  const setDailyGoal = useDemoStore((state) => state.setDailyGoal);
  const resetDemo = useDemoStore((state) => state.resetDemo);

  const hydrateQuiz = useQuizStore((state) => state.hydrate);
  const quizResults = useQuizStore((state) => state.results);

  useEffect(() => {
    hydrateQuiz(QUIZ_QUESTIONS.length);
  }, [hydrateQuiz]);

  useEffect(() => {
    if (quizResults) {
      hydratePersonaWeights(quizResults.percentages);
    }
  }, [hydratePersonaWeights, quizResults]);

  const freezeSummary = useMemo(() => getFreezeSummary(calendarData), [calendarData]);
  const typingPersona = useMemo(
    () => PERSONAS.find((persona) => persona.id === typingPersonaId),
    [typingPersonaId],
  );

  useEffect(() => {
    return () => {
      if (motivationTimerRef.current) {
        window.clearTimeout(motivationTimerRef.current);
      }
      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current);
      }
      if (confettiTimerRef.current) {
        window.clearTimeout(confettiTimerRef.current);
      }
    };
  }, []);

  const handleGenerateMotivation = () => {
    if (isGeneratingMotivation) {
      return;
    }

    const context = createNotificationContext(streak, currentSteps, dailyGoal, getPreferredTimeOfDay(settings));
    const template = selectNotification(NOTIFICATION_LIBRARY, context, personaWeights, recentTemplateIds);
    const message = injectContext(template.template, context);
    const notificationId = `demo-notification-${Date.now()}`;

    setIsGeneratingMotivation(true);
    setTypingPersonaId(template.personaId);

    motivationTimerRef.current = window.setTimeout(() => {
      addNotification(
        {
          id: notificationId,
          personaId: template.personaId,
          message,
          timestamp: new Date(),
          context,
        },
        template.id,
      );
      setHighlightedNotificationId(notificationId);
      setTypingPersonaId(null);
      setIsGeneratingMotivation(false);

      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current);
      }
      highlightTimerRef.current = window.setTimeout(() => {
        setHighlightedNotificationId(null);
      }, 1400);
    }, reduceMotion ? 0 : 1000);
  };

  const handleStepSubmit = (steps: number) => {
    const crossesGoal = currentSteps < dailyGoal && currentSteps + steps >= dailyGoal;
    addSteps(steps);

    if (!crossesGoal || reduceMotion) {
      return;
    }

    setShowGoalConfetti(true);
    if (confettiTimerRef.current) {
      window.clearTimeout(confettiTimerRef.current);
    }
    confettiTimerRef.current = window.setTimeout(() => {
      setShowGoalConfetti(false);
    }, 1300);
  };

  const containerStyle =
    recentPersonaColor && !reduceMotion
      ? {
          backgroundImage: `radial-gradient(circle at top right, ${recentPersonaColor}22, transparent 60%)`,
        }
      : undefined;

  const renderTab = () => {
    if (activeTab === 'calendar') {
      return (
        <CalendarView
          calendarData={calendarData}
          onSelectDay={(day) => {
            setSelectedDay(day);
          }}
        />
      );
    }

    if (activeTab === 'personas') {
      return (
        <PersonasTab
          personaWeights={personaWeights}
          onSetPersonaWeight={setPersonaWeight}
          onResetToQuiz={() => {
            if (quizResults) {
              resetPersonaWeights(quizResults.percentages);
            }
          }}
          canResetToQuiz={Boolean(quizResults)}
        />
      );
    }

    if (activeTab === 'settings') {
      return (
        <SettingsTab
          settings={settings}
          onSetDailyGoal={setDailyGoal}
          onUpdateSettings={updateSettings}
          onResetDemo={resetDemo}
          freezeCount={freezeSummary.count}
          freezeMostRecentDaysAgo={freezeSummary.mostRecentDaysAgo}
        />
      );
    }

    return (
      <>
        <Card variant="elevated" className="space-y-4">
          {settings.showStreakOnHome ? (
            <StreakCounter
              streak={streak}
              glowColor={recentPersonaId === 'pep' ? recentPersonaColor : null}
            />
          ) : null}
          <ProgressBar steps={currentSteps} goal={dailyGoal} persona="pep" />
        </Card>

        <Card
          className="space-y-3 transition-all"
          style={recentPersonaId === 'rusty' ? { borderColor: '#334155' } : undefined}
        >
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setIsStepModalOpen(true)}>
              Add Steps
            </Button>
            <motion.div
              animate={
                isGeneratingMotivation && !reduceMotion
                  ? { scale: [1, 1.06, 1] }
                  : { scale: 1 }
              }
              transition={
                isGeneratingMotivation && !reduceMotion
                  ? { duration: 0.45, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }
                  : { duration: 0 }
              }
            >
              <Button
                type="button"
                variant="persona"
                persona="sunny"
                onClick={handleGenerateMotivation}
                disabled={isGeneratingMotivation}
              >
              Get Motivation
              </Button>
            </motion.div>
          </div>
          {isGeneratingMotivation && typingPersona ? (
            <div
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs text-slate-700"
              aria-live="polite"
            >
              <span>{typingPersona.name} is {typingPersona.id === 'rico' || typingPersona.id === 'rusty' ? 'thinking' : 'typing'}</span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" />
              </span>
            </div>
          ) : null}
          <p className="text-xs text-slate-500">
            Personalization source: {quizResults ? 'your quiz profile (editable in Personas tab)' : 'default demo persona mix'}
          </p>
        </Card>

        <Card variant="elevated" className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Notification Feed</h2>
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Newest first</span>
          </div>
          <NotificationFeed notifications={notifications} highlightedNotificationId={highlightedNotificationId} />
        </Card>
      </>
    );
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 transition-all duration-500 ${recentPersonaId === 'rusty' ? 'saturate-75' : ''}`}
      style={containerStyle}
    >
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Walki Demo</p>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Interactive Motivation Extended</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-4 px-4 py-4 pb-24">{renderTab()}</main>

      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

      <StepEntryModal
        isOpen={isStepModalOpen}
        onClose={() => setIsStepModalOpen(false)}
        onSubmit={handleStepSubmit}
      />
      <DayDetailModal day={selectedDay} isOpen={Boolean(selectedDay)} onClose={() => setSelectedDay(null)} />
      <MilestoneModal milestone={activeMilestone} onDismiss={dismissMilestone} />
      <GoalConfetti isActive={showGoalConfetti} />
    </div>
  );
};
