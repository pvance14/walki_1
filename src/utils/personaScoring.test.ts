import { describe, it, expect } from 'vitest';
import { calculateQuizResults, getTopPersonas, validateAnswers } from './personaScoring';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';

describe('personaScoring', () => {
  describe('calculateQuizResults', () => {
    it('should calculate scores correctly for all Companion answers', () => {
      // Select answers that favor Sunny (The Companion)
      const answers = ['q1a', 'q2d', 'q3a', 'q4a', 'q5a', 'q6b', 'q7a', 'q8b', 'q9c', 'q10b'];
      const results = calculateQuizResults(QUIZ_QUESTIONS, answers);

      expect(results.scores.sunny).toBeGreaterThan(0);
      expect(results.topPersona).toBe('sunny');
      expect(results.timestamp).toBeInstanceOf(Date);
    });

    it('should calculate scores correctly for all Educator answers', () => {
      // Select answers that favor Dr. Quinn (The Educator)
      const answers = ['q1b', 'q2b', 'q3b', 'q4b', 'q5b', 'q6c', 'q7b', 'q8a', 'q9b', 'q10d'];
      const results = calculateQuizResults(QUIZ_QUESTIONS, answers);

      expect(results.scores['dr-quinn']).toBeGreaterThan(0);
      expect(results.topPersona).toBe('dr-quinn');
    });

    it('should calculate percentages that sum to 100', () => {
      const answers = ['q1a', 'q2d', 'q3a', 'q4a', 'q5a', 'q6b', 'q7a', 'q8b', 'q9c', 'q10b'];
      const results = calculateQuizResults(QUIZ_QUESTIONS, answers);

      const sum = Object.values(results.percentages).reduce((acc, val) => acc + val, 0);
      expect(sum).toBeGreaterThanOrEqual(99); // Allow for rounding
      expect(sum).toBeLessThanOrEqual(101);
    });

    it('should handle mixed answers', () => {
      const answers = ['q1a', 'q2b', 'q3c', 'q4d', 'q5a', 'q6a', 'q7b', 'q8c', 'q9d', 'q10a'];
      const results = calculateQuizResults(QUIZ_QUESTIONS, answers);

      // Should have multiple personas with non-zero scores
      const nonZeroScores = Object.values(results.scores).filter((score) => score > 0);
      expect(nonZeroScores.length).toBeGreaterThan(1);
    });

    it('should return valid persona ID as topPersona', () => {
      const answers = ['q1a', 'q2d', 'q3a', 'q4a', 'q5a', 'q6b', 'q7a', 'q8b', 'q9c', 'q10b'];
      const results = calculateQuizResults(QUIZ_QUESTIONS, answers);

      const validPersonas = ['sunny', 'dr-quinn', 'pep', 'rico', 'fern', 'rusty'];
      expect(validPersonas).toContain(results.topPersona);
    });
  });

  describe('getTopPersonas', () => {
    it('should return top 3 personas by default', () => {
      const answers = ['q1a', 'q2d', 'q3a', 'q4a', 'q5a', 'q6b', 'q7a', 'q8b', 'q9c', 'q10b'];
      const results = calculateQuizResults(QUIZ_QUESTIONS, answers);
      const topPersonas = getTopPersonas(results);

      expect(topPersonas).toHaveLength(3);
      expect(topPersonas[0]).toBe(results.topPersona);
    });

    it('should return requested number of personas', () => {
      const answers = ['q1a', 'q2d', 'q3a', 'q4a', 'q5a', 'q6b', 'q7a', 'q8b', 'q9c', 'q10b'];
      const results = calculateQuizResults(QUIZ_QUESTIONS, answers);
      const topPersonas = getTopPersonas(results, 5);

      expect(topPersonas).toHaveLength(5);
    });

    it('should return personas in descending order by score', () => {
      const answers = ['q1a', 'q2d', 'q3a', 'q4a', 'q5a', 'q6b', 'q7a', 'q8b', 'q9c', 'q10b'];
      const results = calculateQuizResults(QUIZ_QUESTIONS, answers);
      const topPersonas = getTopPersonas(results, 6);

      for (let i = 0; i < topPersonas.length - 1; i++) {
        expect(results.scores[topPersonas[i]]).toBeGreaterThanOrEqual(
          results.scores[topPersonas[i + 1]]
        );
      }
    });
  });

  describe('validateAnswers', () => {
    it('should return true for valid answers', () => {
      const answers = ['q1a', 'q2d', 'q3a', 'q4a', 'q5a', 'q6b', 'q7a', 'q8b', 'q9c', 'q10b'];
      const isValid = validateAnswers(QUIZ_QUESTIONS, answers);

      expect(isValid).toBe(true);
    });

    it('should return false if answer count does not match question count', () => {
      const answers = ['q1a', 'q2d', 'q3a']; // Only 3 answers for 10 questions
      const isValid = validateAnswers(QUIZ_QUESTIONS, answers);

      expect(isValid).toBe(false);
    });

    it('should return false if answer ID is invalid', () => {
      const answers = ['q1a', 'q2d', 'invalid', 'q4a', 'q5a', 'q6b', 'q7a', 'q8b', 'q9c', 'q10b'];
      const isValid = validateAnswers(QUIZ_QUESTIONS, answers);

      expect(isValid).toBe(false);
    });

    it('should return false for empty answers array', () => {
      const answers: string[] = [];
      const isValid = validateAnswers(QUIZ_QUESTIONS, answers);

      expect(isValid).toBe(false);
    });
  });
});
