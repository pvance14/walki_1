import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Button, Card, QuizProgress, QuizQuestion } from '@/components/ui';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';
import { useQuizStore } from '@/store/quizStore';

const QUIZ_QUESTION_COUNT = QUIZ_QUESTIONS.length;

const QuizPage = () => {
  const navigate = useNavigate();
  const hydrate = useQuizStore((state) => state.hydrate);
  const currentQuestionIndex = useQuizStore((state) => state.currentQuestionIndex);
  const answers = useQuizStore((state) => state.answers);
  const hasStarted = useQuizStore((state) => state.hasStarted);
  const setAnswer = useQuizStore((state) => state.setAnswer);
  const goToNextQuestion = useQuizStore((state) => state.goToNextQuestion);
  const goToPreviousQuestion = useQuizStore((state) => state.goToPreviousQuestion);
  const completeQuiz = useQuizStore((state) => state.completeQuiz);

  const questions = QUIZ_QUESTIONS.slice(0, Math.min(QUIZ_QUESTION_COUNT, QUIZ_QUESTIONS.length));
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    hydrate(totalQuestions);
  }, [hydrate, totalQuestions]);

  useEffect(() => {
    if (!hasStarted) {
      navigate('/quiz');
    }
  }, [hasStarted, navigate]);

  if (!currentQuestion) {
    return null;
  }

  const handleSelectOption = (optionId: string) => {
    setAnswer(currentQuestionIndex, optionId);

    if (currentQuestionIndex >= totalQuestions - 1) {
      const results = completeQuiz(questions);
      if (results) {
        navigate('/results');
      }
      return;
    }

    goToNextQuestion(totalQuestions);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Card variant="elevated" className="space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Motivation Quiz</h1>
          <QuizProgress current={currentQuestionIndex + 1} total={totalQuestions} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <QuizQuestion
                question={currentQuestion}
                selectedOptionId={answers[currentQuestionIndex] || undefined}
                onSelectOption={(option) => handleSelectOption(option.id)}
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Back
            </Button>
            <p className="text-sm text-slate-600">Tap an answer to continue</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
