import { useMemo, useState } from 'react';
import { Button, Card, ProgressBar, StreakCounter } from '@/components/ui';
import { NotificationFeed } from '@/components/demo/NotificationFeed';
import { StepEntryModal } from '@/components/demo/StepEntryModal';
import { BottomNav } from '@/components/demo/BottomNav';
import { MilestoneModal } from '@/components/demo/MilestoneModal';
import { INITIAL_DEMO_STATE } from '@/data/demoData';
import { NOTIFICATION_LIBRARY } from '@/data/notificationLibrary';
import { createNotificationContext, selectNotification } from '@/utils/messageSelector';
import { injectContext } from '@/utils/contextInjection';
import { useDemoStore } from '@/store/demoStore';
import { useQuizStore } from '@/store/quizStore';
import type { Notification } from '@/types';

export const DemoHome = () => {
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);

  const currentSteps = useDemoStore((state) => state.currentSteps);
  const streak = useDemoStore((state) => state.streak);
  const dailyGoal = useDemoStore((state) => state.dailyGoal);
  const notifications = useDemoStore((state) => state.notifications);
  const recentTemplateIds = useDemoStore((state) => state.recentTemplateIds);
  const activeMilestone = useDemoStore((state) => state.activeMilestone);
  const addSteps = useDemoStore((state) => state.addSteps);
  const addNotification = useDemoStore((state) => state.addNotification);
  const dismissMilestone = useDemoStore((state) => state.dismissMilestone);

  const quizResults = useQuizStore((state) => state.results);
  const fallbackPersonaWeights = useMemo(() => INITIAL_DEMO_STATE.personaWeights, []);

  const personaWeights = quizResults?.percentages ?? fallbackPersonaWeights;

  const handleGenerateMotivation = () => {
    const context = createNotificationContext(streak, currentSteps, dailyGoal);
    const template = selectNotification(NOTIFICATION_LIBRARY, context, personaWeights, recentTemplateIds);
    const message = injectContext(template.template, context);

    const notification: Notification = {
      id: `demo-notification-${Date.now()}`,
      personaId: template.personaId,
      message,
      timestamp: new Date(),
      context,
    };

    addNotification(notification, template.id);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Walki Demo</p>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Interactive Motivation Core</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-4 px-4 py-4 pb-24">
        <Card variant="elevated" className="space-y-4">
          <StreakCounter streak={streak} />
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
            Personalization source: {quizResults ? 'your quiz profile' : 'default demo persona mix'}
          </p>
        </Card>

        <Card variant="elevated" className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Notification Feed</h2>
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Newest first</span>
          </div>
          <NotificationFeed notifications={notifications} />
        </Card>
      </main>

      <BottomNav />
      <StepEntryModal
        isOpen={isStepModalOpen}
        onClose={() => setIsStepModalOpen(false)}
        onSubmit={(steps) => addSteps(steps)}
      />
      <MilestoneModal milestone={activeMilestone} onDismiss={dismissMilestone} />
    </div>
  );
};
