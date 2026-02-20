import type { DayData } from '@/types';

/**
 * Calculate the current streak from calendar data
 * @param calendarData - Array of daily activity data (sorted by date, newest first)
 * @returns Current streak length in days
 */
export function calculateStreak(calendarData: DayData[]): number {
  if (calendarData.length === 0) return 0;

  // Sort calendar data by date (newest first)
  const sortedData = [...calendarData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedData.length; i++) {
    const dayData = sortedData[i];
    const dayDate = new Date(dayData.date);
    dayDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);

    // Check if this day matches the expected date
    if (dayDate.getTime() !== expectedDate.getTime()) {
      // Gap in calendar - streak is broken
      break;
    }

    // Check if goal was completed or freeze was used
    if (dayData.completed || dayData.freezeUsed) {
      streak++;
    } else {
      // Goal not met and no freeze - streak is broken
      break;
    }
  }

  return streak;
}

/**
 * Calculate the longest streak from calendar data
 * @param calendarData - Array of daily activity data
 * @returns Longest streak length in days
 */
export function calculateLongestStreak(calendarData: DayData[]): number {
  if (calendarData.length === 0) return 0;

  // Sort calendar data by date (oldest first)
  const sortedData = [...calendarData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate: Date | null = null;

  for (const dayData of sortedData) {
    const currentDate = new Date(dayData.date);
    currentDate.setHours(0, 0, 0, 0);

    // Check if this day is consecutive to the previous day
    if (previousDate !== null) {
      const expectedDate = new Date(previousDate);
      expectedDate.setDate(expectedDate.getDate() + 1);
      expectedDate.setHours(0, 0, 0, 0);

      if (currentDate.getTime() !== expectedDate.getTime()) {
        // Gap detected - reset current streak
        currentStreak = 0;
      }
    }

    // Check if goal was completed or freeze was used
    if (dayData.completed || dayData.freezeUsed) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      // Goal not met and no freeze - reset streak
      currentStreak = 0;
    }

    previousDate = currentDate;
  }

  return longestStreak;
}

/**
 * Count total active days (days where goal was met)
 * @param calendarData - Array of daily activity data
 * @returns Total number of days where goal was completed
 */
export function countActiveDays(calendarData: DayData[]): number {
  return calendarData.filter((day) => day.completed).length;
}

/**
 * Check if a specific date is part of the current streak
 * @param date - Date to check
 * @param calendarData - Array of daily activity data
 * @returns True if date is part of current streak
 */
export function isDateInStreak(date: Date, calendarData: DayData[]): boolean {
  const currentStreak = calculateStreak(calendarData);
  if (currentStreak === 0) return false;

  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysAgo = Math.floor((today.getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24));

  return daysAgo >= 0 && daysAgo < currentStreak;
}

/**
 * Get the date when the current streak started
 * @param calendarData - Array of daily activity data
 * @returns Date when current streak started, or null if no streak
 */
export function getStreakStartDate(calendarData: DayData[]): Date | null {
  const streakLength = calculateStreak(calendarData);
  if (streakLength === 0) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (streakLength - 1));

  return startDate;
}

/**
 * Check if user has used a freeze in the current streak
 * @param calendarData - Array of daily activity data
 * @returns True if a freeze was used in current streak
 */
export function hasUsedFreezeInStreak(calendarData: DayData[]): boolean {
  const streakLength = calculateStreak(calendarData);
  if (streakLength === 0) return false;

  // Sort by date (newest first)
  const sortedData = [...calendarData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Check the last 'streakLength' days
  for (let i = 0; i < Math.min(streakLength, sortedData.length); i++) {
    if (sortedData[i].freezeUsed) {
      return true;
    }
  }

  return false;
}

/**
 * Predict if streak is at risk based on current progress
 * @param todaySteps - Steps taken today
 * @param dailyGoal - Daily step goal
 * @param currentHour - Current hour (0-23)
 * @returns Risk level: 'low', 'medium', 'high'
 */
export function assessStreakRisk(
  todaySteps: number,
  dailyGoal: number,
  currentHour: number = new Date().getHours()
): 'low' | 'medium' | 'high' {
  const progress = todaySteps / dailyGoal;
  const timeProgress = currentHour / 24;

  // Already reached goal
  if (progress >= 1) return 'low';

  // Late in the day with low progress
  if (timeProgress > 0.8 && progress < 0.5) return 'high';
  if (timeProgress > 0.7 && progress < 0.7) return 'medium';

  // On track or ahead
  if (progress >= timeProgress) return 'low';

  // Behind but recoverable
  if (progress >= timeProgress * 0.7) return 'medium';

  // Significantly behind
  return 'high';
}
