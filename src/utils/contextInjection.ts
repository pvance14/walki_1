import type { NotificationContext } from '@/types';

/**
 * Inject context variables into a notification template
 * @param template - Message template with {{variable}} placeholders
 * @param context - Notification context containing variable values
 * @returns Message with all variables replaced
 */
export function injectContext(template: string, context: NotificationContext): string {
  let message = template;

  // Basic context variables
  message = message.replace(/\{\{streak_length\}\}/g, context.streakLength.toString());
  message = message.replace(/\{\{steps_remaining\}\}/g, context.stepsRemaining.toString());
  message = message.replace(/\{\{steps_taken\}\}/g, context.stepsTaken.toString());
  message = message.replace(/\{\{daily_goal\}\}/g, context.dailyGoal.toString());
  message = message.replace(/\{\{day_of_week\}\}/g, context.dayOfWeek);

  // Derived calculations
  const minutesRemaining = calculateMinutesRemaining(context.stepsRemaining);
  message = message.replace(/\{\{minutes_remaining\}\}/g, minutesRemaining.toString());

  const caloriesBurned = calculateCaloriesBurned(context.stepsTaken);
  message = message.replace(/\{\{calories_burned\}\}/g, caloriesBurned.toString());

  // Next milestone calculation
  const nextMilestone = calculateNextMilestone(context.streakLength);
  message = message.replace(/\{\{milestone_next\}\}/g, nextMilestone.toString());

  // Streak plus calculations
  message = message.replace(/\{\{streak_length_plus_3\}\}/g, (context.streakLength + 3).toString());

  // Yesterday's steps (placeholder - would need historical data)
  message = message.replace(/\{\{steps_yesterday\}\}/g, '7500');

  // Neighbor steps (fictional for motivation)
  message = message.replace(/\{\{neighbor_steps\}\}/g, '9200');

  // Weather (placeholder - would need weather API)
  message = message.replace(/\{\{weather\}\}/g, 'cloudy');

  // Increased goal
  const increasedGoal = Math.round(context.dailyGoal * 1.5);
  message = message.replace(/\{\{daily_goal_increased\}\}/g, increasedGoal.toString());

  return message;
}

/**
 * Calculate estimated minutes to complete remaining steps
 * @param stepsRemaining - Number of steps remaining
 * @returns Estimated minutes (assumes ~100 steps per minute)
 */
function calculateMinutesRemaining(stepsRemaining: number): number {
  // Average walking pace is about 100 steps per minute
  return Math.ceil(stepsRemaining / 100);
}

/**
 * Calculate approximate calories burned from steps
 * @param steps - Number of steps taken
 * @returns Approximate calories burned (assumes ~0.04 calories per step)
 */
function calculateCaloriesBurned(steps: number): number {
  // Average is about 0.04 calories per step (varies by weight)
  return Math.round(steps * 0.04);
}

/**
 * Calculate the next milestone streak length
 * @param currentStreak - Current streak length
 * @returns Next milestone (7, 14, 21, 30, 60, 90, 100, etc.)
 */
function calculateNextMilestone(currentStreak: number): number {
  const milestones = [7, 14, 21, 30, 60, 90, 100, 180, 365];

  for (const milestone of milestones) {
    if (currentStreak < milestone) {
      return milestone;
    }
  }

  // If past all predefined milestones, return next hundred
  return Math.ceil(currentStreak / 100) * 100;
}

/**
 * Validate that all required variables in template exist in context
 * @param template - Message template
 * @returns Array of missing variable names (empty if all present)
 */
export function validateTemplate(template: string): string[] {
  const validVariables = [
    'streak_length',
    'steps_remaining',
    'steps_taken',
    'daily_goal',
    'day_of_week',
    'minutes_remaining',
    'calories_burned',
    'milestone_next',
    'streak_length_plus_3',
    'steps_yesterday',
    'neighbor_steps',
    'weather',
    'daily_goal_increased',
  ];

  const variablePattern = /\{\{(\w+)\}\}/g;
  const foundVariables: string[] = [];
  const missingVariables: string[] = [];

  let match;
  while ((match = variablePattern.exec(template)) !== null) {
    const variable = match[1];
    if (!foundVariables.includes(variable)) {
      foundVariables.push(variable);
      if (!validVariables.includes(variable)) {
        missingVariables.push(variable);
      }
    }
  }

  return missingVariables;
}

/**
 * Extract all variables from a template
 * @param template - Message template
 * @returns Array of variable names found in template
 */
export function extractVariables(template: string): string[] {
  const variablePattern = /\{\{(\w+)\}\}/g;
  const variables: string[] = [];

  let match;
  while ((match = variablePattern.exec(template)) !== null) {
    const variable = match[1];
    if (!variables.includes(variable)) {
      variables.push(variable);
    }
  }

  return variables;
}
