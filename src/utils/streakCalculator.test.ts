import { describe, it, expect } from 'vitest';
import {
  calculateStreak,
  calculateLongestStreak,
  countActiveDays,
  isDateInStreak,
  getStreakStartDate,
  hasUsedFreezeInStreak,
  assessStreakRisk,
} from './streakCalculator';
import type { DayData } from '@/types';

describe('streakCalculator', () => {
  const createDayData = (daysAgo: number, completed: boolean, freezeUsed: boolean = false): DayData => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return {
      date: date.toISOString().split('T')[0],
      steps: completed ? 7500 : 3000,
      goal: 7000,
      completed,
      freezeUsed,
      walkingEvents: [],
    };
  };

  describe('calculateStreak', () => {
    it('should return 0 for empty calendar', () => {
      const streak = calculateStreak([]);
      expect(streak).toBe(0);
    });

    it('should calculate current streak correctly', () => {
      const calendarData = [
        createDayData(0, false), // Today (incomplete)
        createDayData(1, true),
        createDayData(2, true),
        createDayData(3, true),
        createDayData(4, false), // Break
        createDayData(5, true),
      ];

      const streak = calculateStreak(calendarData);
      expect(streak).toBe(0); // Today incomplete, so streak is 0
    });

    it('should count streak with freeze days', () => {
      const calendarData = [
        createDayData(0, true),
        createDayData(1, true),
        createDayData(2, false, true), // Freeze used
        createDayData(3, true),
        createDayData(4, true),
      ];

      const streak = calculateStreak(calendarData);
      expect(streak).toBe(5);
    });

    it('should stop at first incomplete day without freeze', () => {
      const calendarData = [
        createDayData(0, true),
        createDayData(1, true),
        createDayData(2, false, false), // No freeze
        createDayData(3, true),
      ];

      const streak = calculateStreak(calendarData);
      expect(streak).toBe(2);
    });

    it('should handle gaps in calendar data', () => {
      const calendarData = [
        createDayData(0, true),
        createDayData(1, true),
        // Gap at day 2
        createDayData(3, true),
      ];

      const streak = calculateStreak(calendarData);
      expect(streak).toBe(2); // Only counts consecutive days
    });

    it('should calculate 18-day streak correctly', () => {
      const calendarData = Array.from({ length: 18 }, (_, i) => createDayData(i, true));
      const streak = calculateStreak(calendarData);
      expect(streak).toBe(18);
    });
  });

  describe('calculateLongestStreak', () => {
    it('should return 0 for empty calendar', () => {
      const longest = calculateLongestStreak([]);
      expect(longest).toBe(0);
    });

    it('should find longest streak in history', () => {
      const calendarData = [
        createDayData(0, true),
        createDayData(1, true),
        createDayData(2, true), // Streak of 3
        createDayData(3, false),
        createDayData(4, true),
        createDayData(5, true),
        createDayData(6, true),
        createDayData(7, true),
        createDayData(8, true), // Streak of 5
      ];

      const longest = calculateLongestStreak(calendarData);
      expect(longest).toBe(5);
    });

    it('should include freeze days in longest streak', () => {
      const calendarData = [
        createDayData(0, true),
        createDayData(1, true),
        createDayData(2, false, true), // Freeze
        createDayData(3, true),
        createDayData(4, true), // Streak of 5 with freeze
        createDayData(5, false),
      ];

      const longest = calculateLongestStreak(calendarData);
      expect(longest).toBe(5);
    });

    it('should handle multiple streaks', () => {
      const calendarData = [
        createDayData(0, true),
        createDayData(1, true), // Streak 2
        createDayData(2, false),
        createDayData(3, true),
        createDayData(4, true),
        createDayData(5, true), // Streak 3
        createDayData(6, false),
        createDayData(7, true),
        createDayData(8, true),
        createDayData(9, true),
        createDayData(10, true), // Streak 4
      ];

      const longest = calculateLongestStreak(calendarData);
      expect(longest).toBe(4);
    });
  });

  describe('countActiveDays', () => {
    it('should return 0 for empty calendar', () => {
      const count = countActiveDays([]);
      expect(count).toBe(0);
    });

    it('should count only completed days', () => {
      const calendarData = [
        createDayData(0, true),
        createDayData(1, false),
        createDayData(2, true),
        createDayData(3, false, true), // Freeze doesn't count as completed
        createDayData(4, true),
      ];

      const count = countActiveDays(calendarData);
      expect(count).toBe(3);
    });

    it('should count all days when all completed', () => {
      const calendarData = Array.from({ length: 42 }, (_, i) => createDayData(i, true));
      const count = countActiveDays(calendarData);
      expect(count).toBe(42);
    });
  });

  describe('isDateInStreak', () => {
    it('should return true for date in current streak', () => {
      const calendarData = Array.from({ length: 5 }, (_, i) => createDayData(i, true));

      const today = new Date();
      const inStreak = isDateInStreak(today, calendarData);
      expect(inStreak).toBe(true);
    });

    it('should return false for date outside current streak', () => {
      const calendarData = [
        createDayData(0, true),
        createDayData(1, true),
        createDayData(2, false), // Break
        createDayData(3, true),
      ];

      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 3);
      const inStreak = isDateInStreak(oldDate, calendarData);
      expect(inStreak).toBe(false);
    });

    it('should return false when no streak', () => {
      const calendarData = [createDayData(0, false)];

      const today = new Date();
      const inStreak = isDateInStreak(today, calendarData);
      expect(inStreak).toBe(false);
    });
  });

  describe('getStreakStartDate', () => {
    it('should return null for no streak', () => {
      const calendarData = [createDayData(0, false)];
      const startDate = getStreakStartDate(calendarData);
      expect(startDate).toBeNull();
    });

    it('should return correct start date for streak', () => {
      const calendarData = Array.from({ length: 5 }, (_, i) => createDayData(i, true));
      const startDate = getStreakStartDate(calendarData);

      expect(startDate).not.toBeNull();
      if (startDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysAgo = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        expect(daysAgo).toBe(4); // 5-day streak started 4 days ago
      }
    });

    it('should return null for empty calendar', () => {
      const startDate = getStreakStartDate([]);
      expect(startDate).toBeNull();
    });
  });

  describe('hasUsedFreezeInStreak', () => {
    it('should return false when no freeze used', () => {
      const calendarData = Array.from({ length: 5 }, (_, i) => createDayData(i, true));
      const hasFreezer = hasUsedFreezeInStreak(calendarData);
      expect(hasFreezer).toBe(false);
    });

    it('should return true when freeze used in current streak', () => {
      const calendarData = [
        createDayData(0, true),
        createDayData(1, true),
        createDayData(2, false, true), // Freeze used
        createDayData(3, true),
      ];

      const hasFreeze = hasUsedFreezeInStreak(calendarData);
      expect(hasFreeze).toBe(true);
    });

    it('should return false when freeze used outside current streak', () => {
      const calendarData = [
        createDayData(0, true),
        createDayData(1, true),
        createDayData(2, false), // Break
        createDayData(3, false, true), // Freeze outside current streak
        createDayData(4, true),
      ];

      const hasFreeze = hasUsedFreezeInStreak(calendarData);
      expect(hasFreeze).toBe(false);
    });

    it('should return false for no streak', () => {
      const calendarData = [createDayData(0, false)];
      const hasFreeze = hasUsedFreezeInStreak(calendarData);
      expect(hasFreeze).toBe(false);
    });
  });

  describe('assessStreakRisk', () => {
    it('should return low risk when goal is reached', () => {
      const risk = assessStreakRisk(7500, 7000, 20);
      expect(risk).toBe('low');
    });

    it('should return high risk when late and far behind', () => {
      const risk = assessStreakRisk(2000, 7000, 22); // 10pm, only 2000 steps
      expect(risk).toBe('high');
    });

    it('should return medium risk when moderately behind', () => {
      const risk = assessStreakRisk(4000, 7000, 18); // 6pm, 4000/7000
      expect(risk).toBe('medium');
    });

    it('should adjust test - 2000 steps at 10am is behind', () => {
      const risk = assessStreakRisk(2000, 7000, 10); // 10am, 2000 steps (~29% at 42% of day)
      expect(['medium', 'high']).toContain(risk); // Behind schedule
    });

    it('should return low risk when ahead of schedule', () => {
      const risk = assessStreakRisk(5000, 7000, 12); // Noon, 5000 steps
      expect(risk).toBe('low');
    });

    it('should return high risk when very late with no progress', () => {
      const risk = assessStreakRisk(500, 7000, 23); // 11pm, only 500 steps
      expect(risk).toBe('high');
    });
  });
});
