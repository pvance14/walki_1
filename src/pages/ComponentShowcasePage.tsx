import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Navigation } from '@/components/layout/Navigation';
import {
  Button,
  Card,
  Input,
  Modal,
  NotificationCard,
  PersonaCard,
  ProgressBar,
  QuizProgress,
  QuizQuestion,
  StreakCounter,
} from '@/components/ui';
import { PERSONAS } from '@/data/personas';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';
import type { Notification, QuizOption } from '@/types';
import { getMotionProps } from '@/lib/animations';

const sampleNotification: Notification = {
  id: 'notification-sample',
  personaId: 'pep',
  message: "YESSS! You are 850 steps away from your goal. Let's close this out!",
  timestamp: new Date('2026-02-17T17:22:00'),
  context: {
    streakLength: 8,
    stepsRemaining: 850,
    stepsTaken: 6150,
    dailyGoal: 7000,
    timeOfDay: 'afternoon',
    dayOfWeek: 'Tuesday',
  },
};

const firstQuestion = QUIZ_QUESTIONS[0];

const ComponentShowcasePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizSelection, setQuizSelection] = useState<string | undefined>();
  const [sampleInput, setSampleInput] = useState('');
  const [showInputError, setShowInputError] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleQuizSelection = (option: QuizOption) => {
    setQuizSelection(option.id);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <motion.header className="space-y-2" {...getMotionProps('fade', reduceMotion)}>
          <h1 className="text-3xl font-bold text-slate-900">Component Showcase</h1>
          <p className="text-slate-600">
            Mobile and desktop component validation for the phase 2 component library.
          </p>
        </motion.header>

        <motion.section className="grid gap-4 md:grid-cols-2" {...getMotionProps('slide', reduceMotion)}>
          <Card variant="elevated" className="space-y-3">
            <h2 className="text-lg font-semibold">Buttons</h2>
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="persona" persona="fern">Persona</Button>
              <Button isLoading>Save</Button>
            </div>
          </Card>

          <Card variant="elevated" className="space-y-3">
            <h2 className="text-lg font-semibold">Input</h2>
            <Input
              label="Step goal"
              value={sampleInput}
              placeholder="Enter daily goal"
              onChange={(event) => {
                setSampleInput(event.target.value);
                setShowInputError(false);
              }}
              error={showInputError ? 'Daily goal must be a positive number.' : undefined}
            />
            <Button
              variant="secondary"
              onClick={() => setShowInputError(sampleInput.trim().length === 0)}
            >
              Validate
            </Button>
          </Card>
        </motion.section>

        <motion.section className="grid gap-4 lg:grid-cols-3" {...getMotionProps('scale', reduceMotion)}>
          <Card variant="default" className="space-y-3">
            <h2 className="text-lg font-semibold">ProgressBar</h2>
            <ProgressBar steps={6150} goal={7000} persona="dr-quinn" />
          </Card>

          <Card variant="default" className="space-y-3">
            <h2 className="text-lg font-semibold">StreakCounter</h2>
            <StreakCounter streak={14} />
          </Card>

          <Card variant="default" className="space-y-3">
            <h2 className="text-lg font-semibold">NotificationCard</h2>
            <NotificationCard notification={sampleNotification} />
          </Card>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-2">
          <Card variant="elevated" className="space-y-4">
            <h2 className="text-lg font-semibold">Quiz components</h2>
            <QuizProgress current={2} total={10} />
            <QuizQuestion
              question={firstQuestion}
              selectedOptionId={quizSelection}
              onSelectOption={handleQuizSelection}
            />
          </Card>

          <Card variant="elevated" className="space-y-4">
            <h2 className="text-lg font-semibold">Modal</h2>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <p className="text-sm text-slate-600">
              The modal supports backdrop close, escape close, and focus trapping.
            </p>
            <Modal isOpen={isModalOpen} title="Phase 2 Modal" onClose={() => setIsModalOpen(false)}>
              <p className="mb-3">This validates core modal behavior for the app shell.</p>
              <Input label="Name" placeholder="Type here" />
            </Modal>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">PersonaCard</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PERSONAS.map((persona) => (
              <PersonaCard key={persona.id} persona={persona} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ComponentShowcasePage;
