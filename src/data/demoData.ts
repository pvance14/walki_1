import type { DemoState, DayData, Settings } from '@/types';

// Helper function to generate dates
const getDaysAgo = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Calendar data for the last 30 days
export const DEMO_CALENDAR_DATA: DayData[] = [
  // Missed day (20 days ago)
  {
    date: getDaysAgo(20),
    steps: 3200,
    goal: 7000,
    completed: false,
    freezeUsed: false,
    walkingEvents: [
      {
        id: 'event-20-1',
        time: '10:30 AM',
        steps: 1800,
        distance: 0.9,
        notes: 'Quick morning walk',
      },
      {
        id: 'event-20-2',
        time: '3:15 PM',
        steps: 1400,
      },
    ],
  },
  
  // Start of current 18-day streak (19 days ago)
  {
    date: getDaysAgo(19),
    steps: 7543,
    goal: 7000,
    completed: true,
    freezeUsed: false,
    walkingEvents: [
      {
        id: 'event-19-1',
        time: '7:45 AM',
        steps: 3200,
        distance: 1.6,
        notes: 'Morning walk around neighborhood',
      },
      {
        id: 'event-19-2',
        time: '12:30 PM',
        steps: 2100,
        notes: 'Lunch walk',
      },
      {
        id: 'event-19-3',
        time: '7:00 PM',
        steps: 2243,
        distance: 1.1,
      },
    ],
  },

  // Days 18-6 of streak
  ...Array.from({ length: 13 }, (_, i) => {
    const daysAgo = 18 - i;
    const isFreeze = daysAgo === 5; // Freeze used 5 days ago
    
    return {
      date: getDaysAgo(daysAgo),
      steps: isFreeze ? 4200 : Math.floor(Math.random() * 3000) + 7000,
      goal: 7000,
      completed: true,
      freezeUsed: isFreeze,
      walkingEvents: isFreeze
        ? [
            {
              id: `event-${daysAgo}-1`,
              time: '2:00 PM',
              steps: 4200,
              notes: 'Busy day - used freeze',
            },
          ]
        : [
            {
              id: `event-${daysAgo}-1`,
              time: '8:00 AM',
              steps: Math.floor(Math.random() * 1500) + 2000,
              distance: Math.round((Math.random() * 0.5 + 1) * 10) / 10,
            },
            {
              id: `event-${daysAgo}-2`,
              time: '6:30 PM',
              steps: Math.floor(Math.random() * 2000) + 3000,
              distance: Math.round((Math.random() * 1 + 1.5) * 10) / 10,
            },
          ],
    };
  }),

  // Last 5 days of streak (excluding today)
  {
    date: getDaysAgo(4),
    steps: 8234,
    goal: 7000,
    completed: true,
    freezeUsed: false,
    walkingEvents: [
      {
        id: 'event-4-1',
        time: '7:15 AM',
        steps: 3500,
        distance: 1.8,
        notes: 'Morning jog',
      },
      {
        id: 'event-4-2',
        time: '12:00 PM',
        steps: 1834,
      },
      {
        id: 'event-4-3',
        time: '6:45 PM',
        steps: 2900,
        distance: 1.5,
      },
    ],
  },
  {
    date: getDaysAgo(3),
    steps: 7456,
    goal: 7000,
    completed: true,
    freezeUsed: false,
    walkingEvents: [
      {
        id: 'event-3-1',
        time: '8:30 AM',
        steps: 2700,
        distance: 1.4,
      },
      {
        id: 'event-3-2',
        time: '5:00 PM',
        steps: 4756,
        distance: 2.4,
        notes: 'Long evening walk',
      },
    ],
  },
  {
    date: getDaysAgo(2),
    steps: 9123,
    goal: 7000,
    completed: true,
    freezeUsed: false,
    walkingEvents: [
      {
        id: 'event-2-1',
        time: '7:00 AM',
        steps: 3200,
        distance: 1.6,
      },
      {
        id: 'event-2-2',
        time: '1:00 PM',
        steps: 2423,
        notes: 'Afternoon stroll',
      },
      {
        id: 'event-2-3',
        time: '7:30 PM',
        steps: 3500,
        distance: 1.8,
      },
    ],
  },
  {
    date: getDaysAgo(1),
    steps: 7892,
    goal: 7000,
    completed: true,
    freezeUsed: false,
    walkingEvents: [
      {
        id: 'event-1-1',
        time: '8:00 AM',
        steps: 2450,
        distance: 1.2,
        notes: 'Morning walk',
      },
      {
        id: 'event-1-2',
        time: '3:15 PM',
        steps: 3200,
        distance: 1.6,
      },
      {
        id: 'event-1-3',
        time: '8:00 PM',
        steps: 2242,
        distance: 1.1,
        notes: 'Evening stroll',
      },
    ],
  },

  // Today (incomplete)
  {
    date: getDaysAgo(0),
    steps: 6247,
    goal: 7000,
    completed: false,
    freezeUsed: false,
    walkingEvents: [
      {
        id: 'event-today-1',
        time: '7:30 AM',
        steps: 2450,
        distance: 1.2,
        notes: 'Morning walk',
      },
      {
        id: 'event-today-2',
        time: '12:45 PM',
        steps: 1897,
        notes: 'Lunch break walk',
      },
      {
        id: 'event-today-3',
        time: '4:30 PM',
        steps: 1900,
        distance: 1.0,
      },
    ],
  },
];

export const DEMO_SETTINGS: Settings = {
  dailyGoal: 7000,
  morningNotificationTime: '8:00 AM',
  eveningNotificationTime: '6:30 PM',
  notificationFrequency: 2,
  randomizeTiming: true,
  showStreakOnHome: true,
  enableMorningNotifications: true,
  enableAfternoonNotifications: false,
  enableEveningNotifications: true,
};

export const INITIAL_DEMO_STATE: DemoState = {
  currentStreak: 18,
  longestStreak: 18,
  totalActiveDays: 42,
  dailyGoal: 7000,
  todaySteps: 6247,
  notificationHistory: [],
  calendarData: DEMO_CALENDAR_DATA,
  personaWeights: {
    sunny: 20,
    'dr-quinn': 15,
    pep: 25,
    rico: 10,
    fern: 15,
    rusty: 15,
  },
  freezesAvailable: 1,
  settings: DEMO_SETTINGS,
};
