import type { NotificationTemplate, NotificationContext, PersonaPercentages } from '@/types';

/**
 * Select a notification based on context, persona weights, and exclusion list
 * @param library - Array of all notification templates
 * @param context - Current notification context (time, steps, streak, etc.)
 * @param personaWeights - User's persona preference percentages
 * @param recentMessageIds - IDs of recently shown messages to exclude
 * @returns Selected notification template
 */
export function selectNotification(
  library: NotificationTemplate[],
  context: NotificationContext,
  personaWeights: PersonaPercentages,
  recentMessageIds: string[] = []
): NotificationTemplate {
  // Step 1: Filter by context tags
  const contextFiltered = filterByContext(library, context);

  // Step 2: Exclude recent messages
  const availableMessages = contextFiltered.filter(
    (template) => !recentMessageIds.includes(template.id)
  );

  // If no messages left after filtering, use all context-filtered messages
  const candidateMessages = availableMessages.length > 0 ? availableMessages : contextFiltered;

  // Step 3: Apply weighted selection based on persona preferences
  const selectedMessage = weightedRandomSelection(candidateMessages, personaWeights);

  // Fallback to first message if selection fails
  return selectedMessage || candidateMessages[0] || library[0];
}

/**
 * Filter notification templates by context tags
 * @param library - Array of notification templates
 * @param context - Current notification context
 * @returns Filtered array of templates matching the context
 */
function filterByContext(
  library: NotificationTemplate[],
  context: NotificationContext
): NotificationTemplate[] {
  const contextTags: string[] = [];

  // Add time-of-day tag
  contextTags.push(context.timeOfDay);

  // Add progress-related tags
  if (context.stepsRemaining <= 1000) {
    contextTags.push('close-to-goal');
  } else if (context.stepsRemaining > context.dailyGoal * 0.5) {
    contextTags.push('behind-goal');
  } else {
    contextTags.push('on-track');
  }

  // Add milestone tags
  if (context.streakLength % 7 === 0 || context.streakLength >= 30) {
    contextTags.push('milestone');
  }
  contextTags.push('streak');

  // Add goal-related tags
  if (context.stepsRemaining === 0) {
    contextTags.push('goal-reached');
  }

  // Filter templates that have at least one matching tag
  const filtered = library.filter((template) =>
    template.contextTags.some((tag) => contextTags.includes(tag))
  );

  // If no matches, return all templates (fallback)
  return filtered.length > 0 ? filtered : library;
}

/**
 * Perform weighted random selection based on persona preferences
 * @param templates - Array of candidate notification templates
 * @param personaWeights - User's persona preference percentages
 * @returns Randomly selected template weighted by persona preferences
 */
function weightedRandomSelection(
  templates: NotificationTemplate[],
  personaWeights: PersonaPercentages
): NotificationTemplate | null {
  if (templates.length === 0) return null;

  // Calculate weights for each template
  const weights = templates.map((template) => {
    const personaWeight = personaWeights[template.personaId] || 0;
    const templateWeight = template.weight || 1;
    return personaWeight * templateWeight;
  });

  // Calculate total weight
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  if (totalWeight === 0) {
    // If all weights are 0, select randomly with equal probability
    return templates[Math.floor(Math.random() * templates.length)];
  }

  // Perform weighted random selection
  let random = Math.random() * totalWeight;
  for (let i = 0; i < templates.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return templates[i];
    }
  }

  // Fallback (shouldn't reach here)
  return templates[templates.length - 1];
}

/**
 * Get time of day from current hour
 * @param hour - Hour of day (0-23), defaults to current hour
 * @returns Time of day category
 */
export function getTimeOfDay(hour?: number): 'morning' | 'afternoon' | 'evening' {
  const currentHour = hour !== undefined ? hour : new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
}

/**
 * Get day of week name
 * @param date - Date object, defaults to current date
 * @returns Day of week name (e.g., "Monday")
 */
export function getDayOfWeek(date?: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = date || new Date();
  return days[currentDate.getDay()];
}

/**
 * Create notification context from demo state
 * @param streakLength - Current streak length
 * @param stepsTaken - Steps taken today
 * @param dailyGoal - Daily step goal
 * @returns NotificationContext object
 */
export function createNotificationContext(
  streakLength: number,
  stepsTaken: number,
  dailyGoal: number,
  timeOfDayOverride?: NotificationContext['timeOfDay'],
  dateOverride?: Date,
): NotificationContext {
  return {
    streakLength,
    stepsRemaining: Math.max(0, dailyGoal - stepsTaken),
    stepsTaken,
    dailyGoal,
    timeOfDay: timeOfDayOverride ?? getTimeOfDay(dateOverride?.getHours()),
    dayOfWeek: getDayOfWeek(dateOverride),
  };
}
