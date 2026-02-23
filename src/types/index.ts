export type PersonaId = 'sunny' | 'dr-quinn' | 'pep' | 'rico' | 'fern' | 'rusty';

export interface Persona {
  id: PersonaId;
  name: string;
  title: string;
  description: string;
  color: string;
  voice: string;
  exampleMessages: string[];
}

export interface PersonaScores {
  sunny: number;
  'dr-quinn': number;
  pep: number;
  rico: number;
  fern: number;
  rusty: number;
}

export interface PersonaPercentages {
  sunny: number;
  'dr-quinn': number;
  pep: number;
  rico: number;
  fern: number;
  rusty: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  text: string;
  scores: Partial<PersonaScores>;
}

export interface QuizResults {
  scores: PersonaScores;
  percentages: PersonaPercentages;
  topPersona: PersonaId;
  timestamp: Date;
}

export interface DayData {
  date: string;
  steps: number;
  goal: number;
  completed: boolean;
  freezeUsed: boolean;
  walkingEvents: WalkingEvent[];
}

export interface WalkingEvent {
  id: string;
  time: string;
  steps: number;
  distance?: number;
  notes?: string;
}

export interface Settings {
  dailyGoal: number;
  morningNotificationTime: string;
  eveningNotificationTime: string;
  notificationFrequency: number;
  randomizeTiming: boolean;
  showStreakOnHome: boolean;
  enableMorningNotifications: boolean;
  enableAfternoonNotifications: boolean;
  enableEveningNotifications: boolean;
}

export type DemoTab = 'home' | 'calendar' | 'personas' | 'settings';

export interface DemoState {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  dailyGoal: number;
  todaySteps: number;
  notificationHistory: Notification[];
  calendarData: DayData[];
  personaWeights: PersonaPercentages;
  freezesAvailable: number;
  settings: Settings;
}

export interface Notification {
  id: string;
  personaId: PersonaId;
  message: string;
  timestamp: Date;
  context: NotificationContext;
}

export interface NotificationContext {
  streakLength: number;
  stepsRemaining: number;
  stepsTaken: number;
  dailyGoal: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  dayOfWeek: string;
}

export interface NotificationTemplate {
  id: string;
  personaId: PersonaId;
  template: string;
  contextTags: string[];
  weight: number;
}
