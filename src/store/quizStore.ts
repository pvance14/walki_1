import { create } from 'zustand';
import type { QuizQuestion, QuizResults } from '@/types';
import { calculateQuizResults } from '@/utils/personaScoring';
import { logger } from '@/lib/logger';

export const QUIZ_STORAGE_KEY = 'walki_quiz_progress';
const quizLogger = logger.child({ scope: 'quiz-store' });

type PersistedQuizState = {
  currentQuestionIndex: number;
  answers: (string | null)[];
  isComplete: boolean;
  hasStarted: boolean;
  completedAt?: string;
  results?: Omit<QuizResults, 'timestamp'> & { timestamp: string };
};

type QuizStore = {
  currentQuestionIndex: number;
  answers: (string | null)[];
  isComplete: boolean;
  hasStarted: boolean;
  completedAt?: string;
  results: QuizResults | null;
  hydrate: (totalQuestions: number) => void;
  startQuiz: () => void;
  setAnswer: (questionIndex: number, answerId: string) => void;
  goToNextQuestion: (totalQuestions: number) => void;
  goToPreviousQuestion: () => void;
  completeQuiz: (questions: QuizQuestion[]) => QuizResults | null;
  resetQuiz: (totalQuestions: number) => void;
};

const getEmptyAnswers = (totalQuestions: number): (string | null)[] =>
  Array.from({ length: totalQuestions }, () => null);

const toPersisted = (state: QuizStore): PersistedQuizState => ({
  currentQuestionIndex: state.currentQuestionIndex,
  answers: state.answers,
  isComplete: state.isComplete,
  hasStarted: state.hasStarted,
  completedAt: state.completedAt,
  results: state.results
    ? {
        ...state.results,
        timestamp: state.results.timestamp.toISOString(),
      }
    : undefined,
});

const saveState = (state: QuizStore) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(toPersisted(state)));
  quizLogger.debug('quiz_state_saved', {
    currentQuestionIndex: state.currentQuestionIndex,
    isComplete: state.isComplete,
    hasStarted: state.hasStarted,
  });
};

const clearState = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(QUIZ_STORAGE_KEY);
  quizLogger.info('quiz_state_cleared');
};

const parseStoredState = (totalQuestions: number): PersistedQuizState | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as PersistedQuizState;
    if (!Array.isArray(parsed.answers)) {
      return null;
    }

    const answers = parsed.answers.slice(0, totalQuestions);
    if (answers.length < totalQuestions) {
      answers.push(...Array.from({ length: totalQuestions - answers.length }, () => null));
    }

    return {
      ...parsed,
      answers,
      currentQuestionIndex: Math.max(0, Math.min(parsed.currentQuestionIndex || 0, totalQuestions - 1)),
      isComplete: Boolean(parsed.isComplete),
      hasStarted: Boolean(parsed.hasStarted) || answers.some((answer) => Boolean(answer)) || Boolean(parsed.isComplete),
    };
  } catch (error) {
    quizLogger.warn('quiz_state_parse_failed', { error });
    return null;
  }
};

export const useQuizStore = create<QuizStore>((set, get) => ({
  currentQuestionIndex: 0,
  answers: [],
  isComplete: false,
  hasStarted: false,
  completedAt: undefined,
  results: null,

  hydrate: (totalQuestions) => {
    const stored = parseStoredState(totalQuestions);
    if (!stored) {
      quizLogger.info('quiz_hydrate_empty', { totalQuestions });
      set({
        currentQuestionIndex: 0,
        answers: getEmptyAnswers(totalQuestions),
        isComplete: false,
        hasStarted: false,
        completedAt: undefined,
        results: null,
      });
      return;
    }

    quizLogger.info('quiz_hydrate_restored', {
      totalQuestions,
      currentQuestionIndex: stored.currentQuestionIndex,
      answeredCount: stored.answers.filter(Boolean).length,
      isComplete: stored.isComplete,
    });
    set({
      currentQuestionIndex: stored.currentQuestionIndex,
      answers: stored.answers,
      isComplete: stored.isComplete,
      hasStarted: stored.hasStarted,
      completedAt: stored.completedAt,
      results: stored.results
        ? {
            ...stored.results,
            timestamp: new Date(stored.results.timestamp),
          }
        : null,
    });
  },

  startQuiz: () => {
    set((state) => {
      const next = { ...state, hasStarted: true };
      saveState(next);
      quizLogger.info('quiz_started', {
        currentQuestionIndex: next.currentQuestionIndex,
        answeredCount: next.answers.filter(Boolean).length,
      });
      return next;
    });
  },

  setAnswer: (questionIndex, answerId) => {
    set((state) => {
      const nextAnswers = [...state.answers];
      nextAnswers[questionIndex] = answerId;
      const next = { ...state, answers: nextAnswers, hasStarted: true };
      saveState(next);
      quizLogger.debug('quiz_answer_set', {
        questionIndex,
        answerId,
        answeredCount: nextAnswers.filter(Boolean).length,
      });
      return next;
    });
  },

  goToNextQuestion: (totalQuestions) => {
    set((state) => {
      const next = {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, totalQuestions - 1),
      };
      saveState(next);
      quizLogger.debug('quiz_next_question', { currentQuestionIndex: next.currentQuestionIndex });
      return next;
    });
  },

  goToPreviousQuestion: () => {
    set((state) => {
      const next = { ...state, currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0) };
      saveState(next);
      quizLogger.debug('quiz_previous_question', { currentQuestionIndex: next.currentQuestionIndex });
      return next;
    });
  },

  completeQuiz: (questions) => {
    const state = get();
    const selectedAnswers = state.answers.filter((answer): answer is string => Boolean(answer));
    if (selectedAnswers.length !== questions.length) {
      quizLogger.warn('quiz_complete_blocked_incomplete_answers', {
        selectedAnswers: selectedAnswers.length,
        totalQuestions: questions.length,
      });
      return null;
    }

    const results = calculateQuizResults(questions, selectedAnswers);
    const completedAt = new Date().toISOString();

    set((current) => {
      const next = {
        ...current,
        isComplete: true,
        hasStarted: true,
        completedAt,
        results,
      };
      saveState(next);
      quizLogger.info('quiz_completed', {
        topPersonaId: results.topPersona,
        totalQuestions: questions.length,
      });
      return next;
    });

    return results;
  },

  resetQuiz: (totalQuestions) => {
    clearState();
    quizLogger.info('quiz_reset', { totalQuestions });
    set({
      currentQuestionIndex: 0,
      answers: getEmptyAnswers(totalQuestions),
      isComplete: false,
      hasStarted: false,
      completedAt: undefined,
      results: null,
    });
  },
}));
