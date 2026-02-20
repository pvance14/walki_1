import type { QuizQuestion, QuizResults, PersonaScores, PersonaPercentages, PersonaId } from '@/types';

/**
 * Calculate quiz results from user answers
 * @param questions - Array of quiz questions
 * @param answers - Array of selected answer IDs
 * @returns QuizResults with scores, percentages, and top persona
 */
export function calculateQuizResults(
  questions: QuizQuestion[],
  answers: string[]
): QuizResults {
  // Initialize scores for all personas
  const scores: PersonaScores = {
    sunny: 0,
    'dr-quinn': 0,
    pep: 0,
    rico: 0,
    fern: 0,
    rusty: 0,
  };

  // Accumulate points from each answer
  questions.forEach((question, index) => {
    const selectedAnswerId = answers[index];
    const selectedOption = question.options.find((opt) => opt.id === selectedAnswerId);

    if (selectedOption) {
      // Add scores from this option to the totals
      Object.entries(selectedOption.scores).forEach(([personaId, points]) => {
        if (personaId in scores) {
          scores[personaId as keyof PersonaScores] += points || 0;
        }
      });
    }
  });

  // Calculate total points
  const totalPoints = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Calculate percentages
  const percentages: PersonaPercentages = {
    sunny: 0,
    'dr-quinn': 0,
    pep: 0,
    rico: 0,
    fern: 0,
    rusty: 0,
  };

  if (totalPoints > 0) {
    Object.keys(scores).forEach((personaId) => {
      const key = personaId as keyof PersonaScores;
      percentages[key] = Math.round((scores[key] / totalPoints) * 100);
    });
  }

  // Find top persona
  const topPersona = (Object.keys(scores) as PersonaId[]).reduce((top, current) => {
    return scores[current] > scores[top] ? current : top;
  }, 'sunny' as PersonaId);

  return {
    scores,
    percentages,
    topPersona,
    timestamp: new Date(),
  };
}

/**
 * Get top N personas from quiz results
 * @param results - Quiz results
 * @param count - Number of top personas to return (default 3)
 * @returns Array of persona IDs sorted by score (highest first)
 */
export function getTopPersonas(results: QuizResults, count: number = 3): PersonaId[] {
  const sortedPersonas = (Object.keys(results.scores) as PersonaId[]).sort(
    (a, b) => results.scores[b] - results.scores[a]
  );

  return sortedPersonas.slice(0, count);
}

/**
 * Validate that answers match the number of questions
 * @param questions - Array of quiz questions
 * @param answers - Array of selected answer IDs
 * @returns True if valid, false otherwise
 */
export function validateAnswers(questions: QuizQuestion[], answers: string[]): boolean {
  if (questions.length !== answers.length) {
    return false;
  }

  // Check that each answer corresponds to a valid option
  return questions.every((question, index) => {
    const answerId = answers[index];
    return question.options.some((option) => option.id === answerId);
  });
}
