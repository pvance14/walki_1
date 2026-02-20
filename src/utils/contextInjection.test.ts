import { describe, it, expect } from 'vitest';
import { injectContext, validateTemplate, extractVariables } from './contextInjection';
import type { NotificationContext } from '@/types';

describe('contextInjection', () => {
  const mockContext: NotificationContext = {
    streakLength: 18,
    stepsRemaining: 753,
    stepsTaken: 6247,
    dailyGoal: 7000,
    timeOfDay: 'evening',
    dayOfWeek: 'Monday',
  };

  describe('injectContext', () => {
    it('should replace streak_length variable', () => {
      const template = 'You are on day {{streak_length}} of your streak!';
      const result = injectContext(template, mockContext);

      expect(result).toBe('You are on day 18 of your streak!');
    });

    it('should replace steps_remaining variable', () => {
      const template = 'Only {{steps_remaining}} steps left!';
      const result = injectContext(template, mockContext);

      expect(result).toBe('Only 753 steps left!');
    });

    it('should replace steps_taken variable', () => {
      const template = 'You have walked {{steps_taken}} steps today.';
      const result = injectContext(template, mockContext);

      expect(result).toBe('You have walked 6247 steps today.');
    });

    it('should replace daily_goal variable', () => {
      const template = 'Your goal is {{daily_goal}} steps.';
      const result = injectContext(template, mockContext);

      expect(result).toBe('Your goal is 7000 steps.');
    });

    it('should replace day_of_week variable', () => {
      const template = 'Happy {{day_of_week}}!';
      const result = injectContext(template, mockContext);

      expect(result).toBe('Happy Monday!');
    });

    it('should calculate and replace minutes_remaining', () => {
      const template = 'Only {{minutes_remaining}} minutes to go!';
      const result = injectContext(template, mockContext);

      // 753 steps / 100 = ~8 minutes
      expect(result).toBe('Only 8 minutes to go!');
    });

    it('should calculate and replace calories_burned', () => {
      const template = 'You burned {{calories_burned}} calories.';
      const result = injectContext(template, mockContext);

      // 6247 * 0.04 = ~250 calories
      expect(result).toContain('calories');
      expect(result).toMatch(/\d+/);
    });

    it('should calculate and replace milestone_next', () => {
      const template = 'Next milestone: {{milestone_next}} days!';
      const result = injectContext(template, mockContext);

      // 18 days, next milestone is 21
      expect(result).toBe('Next milestone: 21 days!');
    });

    it('should replace multiple variables in one template', () => {
      const template =
        'Day {{streak_length}}: {{steps_taken}}/{{daily_goal}} steps. {{steps_remaining}} to go!';
      const result = injectContext(template, mockContext);

      expect(result).toBe('Day 18: 6247/7000 steps. 753 to go!');
    });

    it('should handle templates with no variables', () => {
      const template = 'Great job today!';
      const result = injectContext(template, mockContext);

      expect(result).toBe('Great job today!');
    });

    it('should replace placeholder variables', () => {
      const template = 'Yesterday: {{steps_yesterday}} steps. Neighbor: {{neighbor_steps}} steps.';
      const result = injectContext(template, mockContext);

      expect(result).toContain('7500');
      expect(result).toContain('9200');
    });

    it('should handle streak_length_plus_3 derived variable', () => {
      const template = 'You will quit by day {{streak_length_plus_3}}.';
      const result = injectContext(template, mockContext);

      expect(result).toBe('You will quit by day 21.');
    });

    it('should handle daily_goal_increased variable', () => {
      const template = 'Try {{daily_goal_increased}} steps tomorrow!';
      const result = injectContext(template, mockContext);

      // 7000 * 1.5 = 10500
      expect(result).toBe('Try 10500 steps tomorrow!');
    });
  });

  describe('validateTemplate', () => {
    it('should return empty array for valid template', () => {
      const template = 'Day {{streak_length}}: {{steps_remaining}} steps remaining.';
      const missing = validateTemplate(template);

      expect(missing).toEqual([]);
    });

    it('should return missing variables for invalid template', () => {
      const template = 'Day {{invalid_var}}: {{another_invalid}} steps.';
      const missing = validateTemplate(template);

      expect(missing).toContain('invalid_var');
      expect(missing).toContain('another_invalid');
    });

    it('should return empty array for template with no variables', () => {
      const template = 'Great job today!';
      const missing = validateTemplate(template);

      expect(missing).toEqual([]);
    });

    it('should validate all standard variables', () => {
      const template =
        '{{streak_length}} {{steps_remaining}} {{steps_taken}} {{daily_goal}} {{day_of_week}}';
      const missing = validateTemplate(template);

      expect(missing).toEqual([]);
    });
  });

  describe('extractVariables', () => {
    it('should extract all variables from template', () => {
      const template = 'Day {{streak_length}}: {{steps_taken}}/{{daily_goal}} steps.';
      const variables = extractVariables(template);

      expect(variables).toEqual(['streak_length', 'steps_taken', 'daily_goal']);
    });

    it('should return empty array for template with no variables', () => {
      const template = 'Great job today!';
      const variables = extractVariables(template);

      expect(variables).toEqual([]);
    });

    it('should not include duplicate variables', () => {
      const template = '{{streak_length}} days, on day {{streak_length}}.';
      const variables = extractVariables(template);

      expect(variables).toEqual(['streak_length']);
    });

    it('should extract multiple occurrences of same variable once', () => {
      const template = '{{steps_taken}} {{steps_taken}} {{daily_goal}} {{steps_taken}}';
      const variables = extractVariables(template);

      expect(variables).toHaveLength(2);
      expect(variables).toContain('steps_taken');
      expect(variables).toContain('daily_goal');
    });
  });
});
