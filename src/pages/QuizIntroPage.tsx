import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Button, Card } from '@/components/ui';
import { useQuizStore } from '@/store/quizStore';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';

const QUIZ_QUESTION_COUNT = QUIZ_QUESTIONS.length;

const QuizIntroPage = () => {
  const navigate = useNavigate();
  const hydrate = useQuizStore((state) => state.hydrate);
  const startQuiz = useQuizStore((state) => state.startQuiz);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);
  const answers = useQuizStore((state) => state.answers);
  const isComplete = useQuizStore((state) => state.isComplete);

  useEffect(() => {
    hydrate(Math.min(QUIZ_QUESTION_COUNT, QUIZ_QUESTIONS.length));
  }, [hydrate]);

  const hasInProgressAnswers = answers.some((answer) => Boolean(answer)) && !isComplete;

  const handleStart = () => {
    startQuiz();
    navigate('/quiz/questions');
  };

  const handleRestart = () => {
    resetQuiz(Math.min(QUIZ_QUESTION_COUNT, QUIZ_QUESTIONS.length));
    startQuiz();
    navigate('/quiz/questions');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main className="mx-auto flex w-full max-w-2xl px-4 py-12">
        <Card variant="elevated" className="w-full space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Walki Motivation Quiz</p>
            <h1 className="text-3xl font-bold text-slate-900">Find your motivation style</h1>
            <p className="text-slate-700">
              Answer 10 quick questions and we&apos;ll personalize your Walki persona mix.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-100 p-4">
            <p className="text-sm font-medium text-slate-700">10 questions, about 3 minutes, no wrong answers.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={handleStart}>
              {hasInProgressAnswers ? 'Continue Quiz' : 'Start Quiz'}
            </Button>
            {hasInProgressAnswers ? (
              <Button type="button" variant="secondary" onClick={handleRestart}>
                Restart
              </Button>
            ) : null}
          </div>

          <Link to="/" className="inline-flex text-sm font-medium text-slate-700 underline-offset-4 hover:underline">
            Back to landing
          </Link>
        </Card>
      </main>
    </div>
  );
};

export default QuizIntroPage;
