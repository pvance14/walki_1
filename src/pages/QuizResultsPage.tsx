import { useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Button, Card } from '@/components/ui';
import { PERSONAS } from '@/data/personas';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';
import { useQuizStore } from '@/store/quizStore';

const QUIZ_QUESTION_COUNT = QUIZ_QUESTIONS.length;

const QuizResultsPage = () => {
  const navigate = useNavigate();
  const results = useQuizStore((state) => state.results);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);

  const personaRows = useMemo(() => {
    if (!results) {
      return [];
    }

    return PERSONAS.map((persona) => ({
      ...persona,
      score: results.scores[persona.id],
      percentage: results.percentages[persona.id],
    })).sort((a, b) => b.score - a.score);
  }, [results]);

  if (!results) {
    return <Navigate to="/quiz" replace />;
  }

  const topPersona = PERSONAS.find((persona) => persona.id === results.topPersona);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Card variant="elevated" className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Quiz Complete</p>
            <h1 className="text-3xl font-bold text-slate-900">
              Your primary motivator: {topPersona?.name ?? 'Unknown'}
            </h1>
            <p className="text-slate-700">Detailed persona showcase and sharing features arrive in Phase 5.</p>
          </div>

          <div className="space-y-3">
            {personaRows.map((persona) => (
              <div key={persona.id} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{persona.name}</p>
                  <p className="text-sm text-slate-700">{persona.percentage}%</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                resetQuiz(QUIZ_QUESTION_COUNT);
                navigate('/quiz');
              }}
            >
              Retake Quiz
            </Button>
            <Button type="button" onClick={() => navigate('/demo')}>
              Try Demo
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default QuizResultsPage;
