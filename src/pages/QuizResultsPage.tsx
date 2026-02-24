import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Navigation } from '@/components/layout/Navigation';
import { Button, Card, Modal, NotificationCard, PersonaCard } from '@/components/ui';
import { PERSONAS } from '@/data/personas';
import { PERSONA_ICON } from '@/lib/persona';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';
import { useQuizStore } from '@/store/quizStore';
import type { Notification } from '@/types';

const QUIZ_QUESTION_COUNT = QUIZ_QUESTIONS.length;
const SHARE_TRACKING_KEY = 'walki_share_events_count';
const ANALYSIS_DURATION_MS = 2400;

type ShareStatus = 'idle' | 'shared' | 'copied' | 'copy-failed';

type PersonaRow = {
  id: (typeof PERSONAS)[number]['id'];
  name: string;
  title: string;
  description: string;
  voice: string;
  color: string;
  score: number;
  percentage: number;
  exampleMessages: string[];
};

const formatPercentage = (value: number) => `${Math.round(value)}%`;

const buildShareText = (topPersonaName: string, personaRows: PersonaRow[]) => {
  const lines = personaRows.map((persona) => `${persona.name}: ${formatPercentage(persona.percentage)}`);

  return [
    `My Walki primary motivator is ${topPersonaName}.`,
    'Motivation profile:',
    ...lines,
    '',
    'Take the quiz: https://walki.app/quiz',
  ].join('\n');
};

const copyText = async (text: string) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  if (typeof document === 'undefined') {
    return false;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const success = document.execCommand('copy');
  document.body.removeChild(textarea);
  return success;
};

const trackShare = (method: 'web-share' | 'clipboard') => {
  if (typeof window === 'undefined') {
    return;
  }

  const count = Number(window.localStorage.getItem(SHARE_TRACKING_KEY) || '0') + 1;
  window.localStorage.setItem(SHARE_TRACKING_KEY, String(count));

  window.dispatchEvent(
    new CustomEvent('walki:share', {
      detail: {
        method,
        count,
      },
    }),
  );
};

const ChartTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: PersonaRow }> }) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const entry = payload[0].payload;

  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <p className="text-xs font-semibold text-slate-900">{entry.name}</p>
      <p className="text-xs text-slate-600">{formatPercentage(entry.percentage)} motivator fit</p>
    </div>
  );
};

const QuizResultsPage = () => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const results = useQuizStore((state) => state.results);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const [isRetakeModalOpen, setIsRetakeModalOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<ShareStatus>('idle');
  const [revealRun, setRevealRun] = useState(0);
  const [revealPhase, setRevealPhase] = useState<'analyzing' | 'revealed'>(reduceMotion ? 'revealed' : 'analyzing');
  const [activePersonaId, setActivePersonaId] = useState<(typeof PERSONAS)[number]['id']>('sunny');

  const personaRows = useMemo<PersonaRow[]>(() => {
    if (!results) {
      return [];
    }

    return PERSONAS.map((persona) => ({
      ...persona,
      score: results.scores[persona.id] ?? 0,
      percentage: results.percentages[persona.id] ?? 0,
    })).sort((a, b) => b.score - a.score);
  }, [results]);

  const topPersona = personaRows[0] ?? PERSONAS[0];

  const sampleNotifications = useMemo(() => {
    if (!results) {
      return [];
    }

    return personaRows.map((persona, personaIndex) => ({
      persona,
      notifications: persona.exampleMessages.slice(0, 2).map((message, messageIndex) => {
        const timestampOffsetMinutes = personaIndex * 5 + messageIndex;

        return {
          id: `${persona.id}-example-${messageIndex}`,
          personaId: persona.id,
          message,
          timestamp: new Date(results.timestamp.getTime() + timestampOffsetMinutes * 60_000),
          context: {
            streakLength: 8,
            stepsRemaining: 1400,
            stepsTaken: 5600,
            dailyGoal: 7000,
            timeOfDay: 'evening',
            dayOfWeek: 'Monday',
          },
        } as Notification;
      }),
    }));
  }, [personaRows, results]);

  useEffect(() => {
    if (!results || personaRows.length < 3) {
      return;
    }

    if (reduceMotion) {
      setRevealPhase('revealed');
      setActivePersonaId(topPersona.id);
      return;
    }

    setRevealPhase('analyzing');

    const sequence = [
      ...personaRows.map((persona) => persona.id),
      ...personaRows.map((persona) => persona.id),
      ...personaRows.map((persona) => persona.id),
      personaRows[0].id,
      personaRows[1].id,
      personaRows[2].id,
      topPersona.id,
    ];
    const delays = [110, 110, 120, 120, 140, 160, 180, 220, 260, 320, 420];
    const timers: number[] = [];
    let elapsed = 0;

    sequence.forEach((personaId, index) => {
      const delay = delays[Math.min(index, delays.length - 1)];
      elapsed += delay;
      timers.push(
        window.setTimeout(() => {
          setActivePersonaId(personaId);
        }, elapsed),
      );
    });

    const revealTimer = window.setTimeout(
      () => {
        setActivePersonaId(topPersona.id);
        setRevealPhase('revealed');
      },
      Math.max(ANALYSIS_DURATION_MS, elapsed),
    );
    timers.push(revealTimer);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [personaRows, reduceMotion, results, revealRun, topPersona.id]);

  if (!results) {
    return <Navigate to="/quiz" replace />;
  }

  const revealMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  const shareText = buildShareText(topPersona.name, personaRows);

  const handleShare = async () => {
    setShareStatus('idle');

    const sharePayload = {
      title: 'My Walki Motivation Profile',
      text: shareText,
      url: window.location.origin,
    };

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(sharePayload);
        trackShare('web-share');
        setShareStatus('shared');
        return;
      }

      const copied = await copyText(shareText);
      if (copied) {
        trackShare('clipboard');
        setShareStatus('copied');
      } else {
        setShareStatus('copy-failed');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      const copied = await copyText(shareText);
      if (copied) {
        trackShare('clipboard');
        setShareStatus('copied');
      } else {
        setShareStatus('copy-failed');
      }
    }
  };

  const handleRetakeConfirm = () => {
    setIsRetakeModalOpen(false);
    resetQuiz(QUIZ_QUESTION_COUNT);
    navigate('/quiz');
  };

  const analyzingPersona = personaRows.find((persona) => persona.id === activePersonaId) ?? topPersona;
  const topThreePersonas = personaRows.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:py-10">
        {revealPhase === 'analyzing' ? (
          <Card variant="elevated" className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Analyzing Results</p>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Analyzing your motivation style...</h1>
              <p className="text-sm text-slate-700">
                Comparing all six persona voices to find your strongest motivation match.
              </p>
            </div>

            <motion.div
              key={analyzingPersona.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="mx-auto flex max-w-sm items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full border text-2xl"
                style={{ borderColor: analyzingPersona.color, backgroundColor: `${analyzingPersona.color}22` }}
              >
                {PERSONA_ICON[analyzingPersona.id]}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{analyzingPersona.name}</p>
                <p className="text-xs text-slate-600">{analyzingPersona.title}</p>
              </div>
            </motion.div>

            <Button type="button" variant="outline" onClick={() => setRevealPhase('revealed')}>
              Skip Reveal
            </Button>
          </Card>
        ) : null}

        {revealPhase === 'revealed' ? (
          <>
        <motion.section
          {...revealMotion}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
        >
          <Card
            variant="elevated"
            className="space-y-4 border-l-4"
            style={{ borderLeftColor: topPersona.color }}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Quiz Complete</p>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Your primary motivator: {topPersona.name}
            </h1>
            <p className="text-sm text-slate-700 sm:text-base">
              {topPersona.title} energy drives your consistency most. {topPersona.description}
            </p>
            <div className="rounded-lg border border-slate-200 bg-white/80 px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">Voice style</p>
              <p className="text-sm text-slate-700">{topPersona.voice}</p>
            </div>
            {!reduceMotion ? (
              <Button type="button" variant="outline" onClick={() => setRevealRun((value) => value + 1)}>
                Replay Persona Reveal
              </Button>
            ) : null}
          </Card>
        </motion.section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">Top 3 Persona Matches</h2>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {topThreePersonas.map((persona, index) => (
              <motion.div
                key={persona.id}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 260, damping: 18, delay: 0.2 + index * 0.2 }
                }
              >
                <PersonaCard persona={persona} onClick={() => navigate('/demo')} />
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          {...revealMotion}
          transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : 0.08, ease: 'easeOut' }}
        >
          <Card variant="elevated" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">Motivation Profile</h2>
              <p className="text-sm text-slate-600">All 6 personas ranked by quiz score</p>
            </div>

            <div className="h-72 w-full min-w-0 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={personaRows}
                  layout="vertical"
                  margin={{ top: 8, right: 16, bottom: 8, left: 6 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    width={72}
                    interval={0}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="percentage" radius={[0, 8, 8, 0]} isAnimationActive={!reduceMotion}>
                    {personaRows.map((persona) => (
                      <Cell key={persona.id} fill={persona.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {personaRows.map((persona) => (
                <div key={persona.id} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900">{persona.name}</p>
                    <p className="text-slate-700">{formatPercentage(persona.percentage)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        <motion.section
          {...revealMotion}
          transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : 0.14, ease: 'easeOut' }}
        >
          <Card variant="elevated" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">Persona Showcase</h2>
              <p className="text-sm text-slate-600">Tap any persona card to jump into the demo</p>
            </div>

            <div className="max-h-[38rem] space-y-4 overflow-y-auto pr-1">
              {personaRows.map((persona) => (
                <div key={persona.id} className="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
                  <PersonaCard persona={persona} onClick={() => navigate('/demo')} />
                  <div className="flex items-center justify-between gap-2 px-1">
                    <p className="text-xs text-slate-600">{formatPercentage(persona.percentage)} persona match</p>
                    <Button type="button" variant="outline" onClick={() => navigate('/demo')}>
                      Try {persona.name} in Demo
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        <motion.section
          {...revealMotion}
          transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
        >
          <Card variant="elevated" className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Example Messages</h2>
            <p className="text-sm text-slate-600">Here are sample notifications from each persona voice.</p>

            <div className="space-y-6">
              {sampleNotifications.map(({ persona, notifications }) => (
                <section key={persona.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-slate-900">{persona.name}</h3>
                    <span className="text-xs text-slate-600">{persona.title}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {notifications.map((notification) => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </Card>
        </motion.section>

        <motion.section
          {...revealMotion}
          transition={{ duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
        >
          <Card variant="elevated" className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Next Steps</h2>
            <p className="text-sm text-slate-700">
              See how these motivations feel in action with streak tracking and live notification generation.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={() => navigate('/demo')}>
                Try the Demo
              </Button>
              <Button type="button" variant="secondary" onClick={handleShare}>
                Share My Results
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsRetakeModalOpen(true)}>
                Retake Quiz
              </Button>
            </div>

            <p className="text-sm text-slate-600" aria-live="polite">
              {shareStatus === 'shared' && 'Shared successfully.'}
              {shareStatus === 'copied' && 'Copied share text to clipboard.'}
              {shareStatus === 'copy-failed' && 'Share unavailable and clipboard copy failed.'}
              {shareStatus === 'idle' && 'Use Share on mobile or copy text on desktop.'}
            </p>
          </Card>
        </motion.section>
          </>
        ) : null}
      </main>

      <Modal
        isOpen={isRetakeModalOpen}
        title="Retake quiz?"
        onClose={() => setIsRetakeModalOpen(false)}
      >
        <p className="mb-4">This will clear your current answers and results.</p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => setIsRetakeModalOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleRetakeConfirm}>
            Yes, Retake Quiz
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default QuizResultsPage;
