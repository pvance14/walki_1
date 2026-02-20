import { describe, it, expect } from 'vitest';
import { selectNotification, getTimeOfDay, getDayOfWeek, createNotificationContext } from './messageSelector';
import { NOTIFICATION_LIBRARY } from '@/data/notificationLibrary';
import type { NotificationContext, PersonaPercentages } from '@/types';

describe('messageSelector', () => {
  const mockContext: NotificationContext = {
    streakLength: 18,
    stepsRemaining: 753,
    stepsTaken: 6247,
    dailyGoal: 7000,
    timeOfDay: 'evening',
    dayOfWeek: 'Monday',
  };

  const mockWeights: PersonaPercentages = {
    sunny: 20,
    'dr-quinn': 15,
    pep: 25,
    rico: 10,
    fern: 15,
    rusty: 15,
  };

  describe('selectNotification', () => {
    it('should return a notification template', () => {
      const notification = selectNotification(NOTIFICATION_LIBRARY, mockContext, mockWeights);

      expect(notification).toBeDefined();
      expect(notification.id).toBeDefined();
      expect(notification.personaId).toBeDefined();
      expect(notification.template).toBeDefined();
    });

    it('should exclude recent messages', () => {
      const recentIds = ['sunny-1', 'sunny-2', 'pep-1'];
      const notification = selectNotification(NOTIFICATION_LIBRARY, mockContext, mockWeights, recentIds);

      expect(recentIds).not.toContain(notification.id);
    });

    it('should filter by context tags', () => {
      const eveningContext: NotificationContext = {
        ...mockContext,
        timeOfDay: 'evening',
        stepsRemaining: 100,
      };

      const notification = selectNotification(NOTIFICATION_LIBRARY, eveningContext, mockWeights);

      // Should have at least one relevant context tag
      const hasRelevantTag = notification.contextTags.some(tag => 
        ['evening', 'close-to-goal', 'streak', 'reminder', 'motivating', 'encouraging'].includes(tag)
      );
      expect(hasRelevantTag).toBe(true);
    });

    it('should respect persona weights', () => {
      // Heavy weight on Pep
      const pepWeights: PersonaPercentages = {
        sunny: 5,
        'dr-quinn': 5,
        pep: 70,
        rico: 5,
        fern: 5,
        rusty: 10,
      };

      // Run multiple times and check distribution
      const results = Array.from({ length: 20 }, () =>
        selectNotification(NOTIFICATION_LIBRARY, mockContext, pepWeights)
      );

      const pepCount = results.filter((n) => n.personaId === 'pep').length;
      // Pep should appear more frequently (not exact due to randomness)
      expect(pepCount).toBeGreaterThan(5);
    });

    it('should handle empty recent messages', () => {
      const notification = selectNotification(NOTIFICATION_LIBRARY, mockContext, mockWeights, []);

      expect(notification).toBeDefined();
    });

    it('should handle all recent messages', () => {
      const allIds = NOTIFICATION_LIBRARY.map((n) => n.id);
      const notification = selectNotification(NOTIFICATION_LIBRARY, mockContext, mockWeights, allIds);

      // Should still return a notification (fallback to context-filtered)
      expect(notification).toBeDefined();
    });
  });

  describe('getTimeOfDay', () => {
    it('should return morning for early hours', () => {
      expect(getTimeOfDay(6)).toBe('morning');
      expect(getTimeOfDay(11)).toBe('morning');
    });

    it('should return afternoon for midday', () => {
      expect(getTimeOfDay(12)).toBe('afternoon');
      expect(getTimeOfDay(16)).toBe('afternoon');
    });

    it('should return evening for late hours', () => {
      expect(getTimeOfDay(17)).toBe('evening');
      expect(getTimeOfDay(23)).toBe('evening');
      expect(getTimeOfDay(2)).toBe('evening');
    });

    it('should use current hour when no parameter provided', () => {
      const result = getTimeOfDay();
      expect(['morning', 'afternoon', 'evening']).toContain(result);
    });
  });

  describe('getDayOfWeek', () => {
    it('should return correct day name', () => {
      // Create dates with explicit time to avoid timezone issues
      const monday = new Date(2026, 1, 23); // Monday, Feb 23, 2026 (month is 0-indexed)
      expect(getDayOfWeek(monday)).toBe('Monday');

      const friday = new Date(2026, 1, 20); // Friday, Feb 20, 2026
      expect(getDayOfWeek(friday)).toBe('Friday');

      const sunday = new Date(2026, 1, 22); // Sunday, Feb 22, 2026
      expect(getDayOfWeek(sunday)).toBe('Sunday');
    });

    it('should use current date when no parameter provided', () => {
      const result = getDayOfWeek();
      const validDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      expect(validDays).toContain(result);
    });
  });

  describe('createNotificationContext', () => {
    it('should create valid context with correct calculations', () => {
      const context = createNotificationContext(18, 6247, 7000);

      expect(context.streakLength).toBe(18);
      expect(context.stepsTaken).toBe(6247);
      expect(context.dailyGoal).toBe(7000);
      expect(context.stepsRemaining).toBe(753);
      expect(['morning', 'afternoon', 'evening']).toContain(context.timeOfDay);
      expect(context.dayOfWeek).toBeDefined();
    });

    it('should handle goal already reached', () => {
      const context = createNotificationContext(18, 8000, 7000);

      expect(context.stepsRemaining).toBe(0);
    });

    it('should handle no steps taken', () => {
      const context = createNotificationContext(5, 0, 7000);

      expect(context.stepsRemaining).toBe(7000);
      expect(context.stepsTaken).toBe(0);
    });
  });
});
