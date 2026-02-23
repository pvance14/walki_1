import { useEffect, useMemo, useState } from 'react';
import { Button, Card, ProgressBar, StreakCounter } from '@/components/ui';
import { NotificationFeed } from '@/components/demo/NotificationFeed';
import { StepEntryModal } from '@/components/demo/StepEntryModal';
import { BottomNav } from '@/components/demo/BottomNav';
import { MilestoneModal } from '@/components/demo/MilestoneModal';
import { CalendarView } from '@/components/demo/CalendarView';
import { DayDetailModal } from '@/components/demo/DayDetailModal';
import { PersonasTab } from '@/components/demo/PersonasTab';
import { SettingsTab } from '@/components/demo/SettingsTab';
import { NOTIFICATION_LIBRARY } from '@/data/notificationLibrary';
import { createNotificationContext, getTimeOfDay, selectNotification } from '@/utils/messageSelector';
import { injectContext } from '@/utils/contextInjection';
import { useDemoStore } from '@/store/demoStore';
import { useQuizStore } from '@/store/quizStore';
import type { DayData, NotificationContext, Settings } from '@/types';

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
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

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

  const addSteps = useDemoStore((state) => state.addSteps);
  const addNotification = useDemoStore((state) => state.addNotification);
  const dismissMilestone = useDemoStore((state) => state.dismissMilestone);
  const setActiveTab = useDemoStore((state) => state.setActiveTab);
  const setPersonaWeight = useDemoStore((state) => state.setPersonaWeight);
  const hydratePersonaWeights = useDemoStore((state) => state.hydratePersonaWeights);
  const updateSettings = useDemoStore((state) => state.updateSettings);
  const setDailyGoal = useDemoStore((state) => state.setDailyGoal);
  const resetDemo = useDemoStore((state) => state.resetDemo);

  const quizResults = useQuizStore((state) => state.results);

  useEffect(() => {
    if (quizResults) {
      hydratePersonaWeights(quizResults.percentages);
    }
  }, [hydratePersonaWeights, quizResults]);

  const freezeSummary = useMemo(() => getFreezeSummary(calendarData), [calendarData]);

  const handleGenerateMotivation = () => {
    const context = createNotificationContext(streak, currentSteps, dailyGoal, getPreferredTimeOfDay(settings));
    const template = selectNotification(NOTIFICATION_LIBRARY, context, personaWeights, recentTemplateIds);
    const message = injectContext(template.template, context);

    addNotification(
      {
        id: `demo-notification-${Date.now()}`,
        personaId: template.personaId,
        message,
        timestamp: new Date(),
        context,
      },
      template.id,
    );
  };

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
      return <PersonasTab personaWeights={personaWeights} onSetPersonaWeight={setPersonaWeight} />;
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
          {settings.showStreakOnHome ? <StreakCounter streak={streak} /> : null}
          <ProgressBar steps={currentSteps} goal={dailyGoal} persona="pep" />
        </Card>

        <Card className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => setIsStepModalOpen(true)}>
              Add Steps
            </Button>
            <Button type="button" variant="persona" persona="sunny" onClick={handleGenerateMotivation}>
              Get Motivation
            </Button>
          </div>
          <p className="text-xs text-slate-500">
            Personalization source: {quizResults ? 'your quiz profile (editable in Personas tab)' : 'default demo persona mix'}
          </p>
        </Card>

        <Card variant="elevated" className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Notification Feed</h2>
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Newest first</span>
          </div>
          <NotificationFeed notifications={notifications} />
        </Card>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
        onSubmit={(steps) => addSteps(steps)}
      />
      <DayDetailModal day={selectedDay} isOpen={Boolean(selectedDay)} onClose={() => setSelectedDay(null)} />
      <MilestoneModal milestone={activeMilestone} onDismiss={dismissMilestone} />
    </div>
  );
};
