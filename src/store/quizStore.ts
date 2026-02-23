import { create } from 'zustand';
import type { QuizQuestion, QuizResults } from '@/types';
import { calculateQuizResults } from '@/utils/personaScoring';

export const QUIZ_STORAGE_KEY = 'walki_quiz_progress';

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
};

const clearState = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(QUIZ_STORAGE_KEY);
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
  } catch {
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
      return next;
    });
  },

  setAnswer: (questionIndex, answerId) => {
    set((state) => {
      const nextAnswers = [...state.answers];
      nextAnswers[questionIndex] = answerId;
      const next = { ...state, answers: nextAnswers, hasStarted: true };
      saveState(next);
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
      return next;
    });
  },

  goToPreviousQuestion: () => {
    set((state) => {
      const next = { ...state, currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0) };
      saveState(next);
      return next;
    });
  },

  completeQuiz: (questions) => {
    const state = get();
    const selectedAnswers = state.answers.filter((answer): answer is string => Boolean(answer));
    if (selectedAnswers.length !== questions.length) {
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
      return next;
    });

    return results;
  },

  resetQuiz: (totalQuestions) => {
    clearState();
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
