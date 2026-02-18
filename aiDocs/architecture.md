# Architecture Documentation
## Walki Web Demo MVP

**Version:** 1.0  
**Date:** February 17, 2026  
**Purpose:** Technical architecture for the web-based interactive demo

---

## Overview

The Walki MVP is a **client-side web application** designed to validate the AI persona concept. It prioritizes simplicity, privacy, and rapid iteration over scalability.

**Key Architectural Principles:**
- **Local-first:** All data stored in browser (no backend required for MVP)
- **Static deployment:** No server-side rendering or API calls
- **Privacy by design:** No tracking, no external data sharing
- **Mobile-first responsive:** Works on all devices
- **Fast to iterate:** Simple architecture enables rapid changes

---

## System Architecture

### High-Level Diagram

```
┌─────────────────────────────────────────────┐
│           Browser (User's Device)            │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │        React Application (SPA)         │ │
│  │                                        │ │
│  │  ┌──────────┐  ┌──────────────────┐  │ │
│  │  │  Pages   │  │   Components     │  │ │
│  │  │          │  │                  │  │ │
│  │  │ Landing  │  │  QuizQuestion    │  │ │
│  │  │ Quiz     │  │  PersonaCard     │  │ │
│  │  │ Results  │  │  StreakCounter   │  │ │
│  │  │ Demo     │  │  NotificationGen │  │ │
│  │  └──────────┘  └──────────────────┘  │ │
│  │                                        │ │
│  │  ┌────────────────────────────────┐  │ │
│  │  │      State Management          │  │ │
│  │  │  (Zustand or React Context)    │  │ │
│  │  └────────────────────────────────┘  │ │
│  │                                        │ │
│  │  ┌────────────────────────────────┐  │ │
│  │  │     Business Logic Layer       │  │ │
│  │  │                                │  │ │
│  │  │  - Quiz Scoring Algorithm      │  │ │
│  │  │  - Notification Selector       │  │ │
│  │  │  - Context Injector            │  │ │
│  │  │  - Streak Calculator           │  │ │
│  │  └────────────────────────────────┘  │ │
│  │                                        │ │
│  │  ┌────────────────────────────────┐  │ │
│  │  │       Data Layer               │  │ │
│  │  │                                │  │ │
│  │  │  - Static JSON (300+ messages) │  │ │
│  │  │  - Quiz Questions              │  │ │
│  │  │  - Persona Definitions         │  │ │
│  │  │  - Demo Data (fake streak)     │  │ │
│  │  └────────────────────────────────┘  │ │
│  │                                        │ │
│  │  ┌────────────────────────────────┐  │ │
│  │  │    Browser Storage             │  │ │
│  │  │    (LocalStorage)              │  │ │
│  │  │                                │  │ │
│  │  │  - Quiz Results                │  │ │
│  │  │  - Persona Weights             │  │ │
│  │  │  - Demo Session State          │  │ │
│  │  │  - Notification History        │  │ │
│  │  └────────────────────────────────┘  │ │
│  └────────────────────────────────────────┘ │
│                                              │
└─────────────────────────────────────────────┘

External (Optional):
  - Vercel/Netlify (Static Hosting)
  - Plausible Analytics (Privacy-first, no cookies)
  - Email Service (Waitlist: ConvertKit/Google Sheets)
```

---

## Technology Stack

### Frontend Framework
**React 18+ with TypeScript**
- Component-based architecture
- Type safety throughout
- Easy to port logic to React Native later

### Build Tool
**Vite**
- Lightning-fast dev server
- Optimized production builds
- Native ESM support
- Hot Module Replacement (HMR)

### Styling
**TailwindCSS**
- Utility-first CSS framework
- Mobile-first responsive design
- Consistent design system
- Minimal bundle size (purged unused styles)

### UI Components
**Shadcn/ui or Radix UI**
- Accessible by default (WCAG 2.1 AA)
- Unstyled primitives (easy to customize)
- Keyboard navigation
- Screen reader support

### Animations
**Framer Motion**
- Declarative animations
- Gesture support
- Performance optimized (GPU-accelerated)
- Used for: progress bars, confetti, page transitions

### Data Visualization
**Recharts or Chart.js**
- Quiz results charts (bar/pie)
- Lightweight
- Responsive

### State Management
**Zustand or React Context**
- Simple, minimal boilerplate
- TypeScript support
- Persist state to LocalStorage
- Global state for: quiz results, demo state, notification history

### Routing
**React Router v6**
- Client-side routing
- Smooth transitions between pages
- History management

### Storage
**LocalStorage API**
- Persist quiz results across sessions
- Store demo state
- No database needed
- ~5-10MB available (more than enough)

---

## Data Models

### Quiz Results
```typescript
interface QuizResults {
  timestamp: Date;
  answers: number[];  // Array of selected answer indices
  scores: PersonaScores;
  percentages: PersonaPercentages;
  topPersona: PersonaType;
}

interface PersonaScores {
  sunny: number;      // The Companion
  drQuinn: number;    // The Educator
  pep: number;        // The Cheerleader
  rico: number;       // The Challenger
  fern: number;       // The Sage
  rusty: number;      // The Pessimist
}

interface PersonaPercentages {
  sunny: number;      // 0-100
  drQuinn: number;
  pep: number;
  rico: number;
  fern: number;
  rusty: number;
}

type PersonaType = 'sunny' | 'drQuinn' | 'pep' | 'rico' | 'fern' | 'rusty';
```

### Demo State
```typescript
interface DemoState {
  // Streak data
  currentStreak: number;        // e.g., 18
  longestStreak: number;        // e.g., 18
  totalActiveDays: number;      // e.g., 42
  
  // Today's progress
  todaySteps: number;           // e.g., 6247
  dailyGoal: number;            // e.g., 7000
  stepsRemaining: number;       // Calculated: dailyGoal - todaySteps
  
  // Calendar history (demo data)
  calendarData: DayData[];
  
  // Notification history (session only)
  notificationHistory: Notification[];
  
  // User preferences
  personaWeights: PersonaPercentages;
  settings: Settings;
  
  // Streak mechanics
  freezesAvailable: number;     // e.g., 1 (resets weekly)
}

interface DayData {
  date: string;                 // ISO date string
  steps: number;
  goalMet: boolean;
  isFreeze: boolean;            // Used streak freeze?
  events?: WalkingEvent[];
}

interface WalkingEvent {
  id: string;
  time: string;                 // e.g., "8:30 AM"
  steps: number;
  distance?: number;            // Optional, in miles
  notes?: string;
}

interface Settings {
  morningNotificationWindow: [number, number];  // e.g., [7.5, 10] = 7:30 AM - 10 AM
  eveningNotificationWindow: [number, number];  // e.g., [17, 20] = 5 PM - 8 PM
  notificationsPerDay: number;                  // 1-4
  randomizeWithinWindow: boolean;               // Default: true
}
```

### Notification System
```typescript
interface Notification {
  id: string;                   // UUID
  persona: PersonaType;
  message: string;              // Final message with context injected
  timestamp: Date;
  context: NotificationContext;
}

interface NotificationContext {
  streakLength: number;
  stepsRemaining: number;
  stepsTaken: number;
  goalMet: boolean;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  dayOfWeek: string;            // 'Monday', etc.
}

interface NotificationTemplate {
  id: string;                   // e.g., "sunny_001"
  persona: PersonaType;
  template: string;             // e.g., "Hey! {{streak_length}}-day streak!"
  contextRequired: string[];    // ['streak_length', 'steps_remaining']
  tags: string[];               // ['morning', 'encouraging', 'milestone']
  weight: number;               // Base probability weight (default: 1.0)
}
```

### Persona Definition
```typescript
interface Persona {
  id: PersonaType;
  name: string;                 // e.g., "Sunny"
  title: string;                // e.g., "The Companion"
  description: string;
  voice: string;                // e.g., "Warm, supportive, friendly"
  color: string;                // Hex color
  avatar: string;               // SVG/PNG path
  examples: string[];           // 3-5 example messages
}
```

---

## Core Algorithms

### 1. Quiz Scoring Algorithm

```typescript
function calculateQuizResults(answers: number[]): QuizResults {
  // Initialize scores
  const scores: PersonaScores = {
    sunny: 0,
    drQuinn: 0,
    pep: 0,
    rico: 0,
    fern: 0,
    rusty: 0
  };
  
  // Each answer maps to persona points
  // Example: Question 1, Answer A → { sunny: 2, pep: 1 }
  answers.forEach((answerIndex, questionIndex) => {
    const pointMap = QUIZ_SCORING_MAP[questionIndex][answerIndex];
    Object.entries(pointMap).forEach(([persona, points]) => {
      scores[persona as PersonaType] += points;
    });
  });
  
  // Calculate total and percentages
  const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const percentages: PersonaPercentages = {
    sunny: Math.round((scores.sunny / total) * 100),
    drQuinn: Math.round((scores.drQuinn / total) * 100),
    pep: Math.round((scores.pep / total) * 100),
    rico: Math.round((scores.rico / total) * 100),
    fern: Math.round((scores.fern / total) * 100),
    rusty: Math.round((scores.rusty / total) * 100)
  };
  
  // Find top persona
  const topPersona = Object.entries(scores)
    .reduce((max, [persona, score]) => 
      score > max.score ? { persona, score } : max,
      { persona: 'sunny', score: 0 }
    ).persona as PersonaType;
  
  return {
    timestamp: new Date(),
    answers,
    scores,
    percentages,
    topPersona
  };
}
```

### 2. Notification Selection Algorithm

```typescript
function selectNotification(
  personaWeights: PersonaPercentages,
  context: NotificationContext,
  previousNotifications: Notification[]
): NotificationTemplate {
  
  // 1. Get all available messages
  const allMessages = NOTIFICATION_LIBRARY;
  
  // 2. Filter by context (time of day, streak status, etc.)
  const contextFiltered = allMessages.filter(msg => 
    matchesContext(msg, context)
  );
  
  // 3. Exclude recently shown messages (no repeats within session)
  const previousIds = new Set(previousNotifications.map(n => n.id));
  const availableMessages = contextFiltered.filter(msg => 
    !previousIds.has(msg.id)
  );
  
  // 4. Build weighted pool based on user's persona preferences
  const weightedPool: NotificationTemplate[] = [];
  availableMessages.forEach(msg => {
    const personaWeight = personaWeights[msg.persona] / 100;
    const baseWeight = msg.weight || 1.0;
    const finalWeight = personaWeight * baseWeight;
    
    // Add message to pool N times based on weight
    const count = Math.round(finalWeight * 10);
    for (let i = 0; i < count; i++) {
      weightedPool.push(msg);
    }
  });
  
  // 5. Randomly select from weighted pool
  const randomIndex = Math.floor(Math.random() * weightedPool.length);
  return weightedPool[randomIndex];
}

function matchesContext(
  template: NotificationTemplate,
  context: NotificationContext
): boolean {
  // Check if template tags match context
  const { tags } = template;
  const { timeOfDay, goalMet, streakLength } = context;
  
  // Time-based filtering
  if (tags.includes('morning') && timeOfDay !== 'morning') return false;
  if (tags.includes('evening') && timeOfDay !== 'evening') return false;
  
  // Context-based filtering
  if (tags.includes('close_to_goal') && context.stepsRemaining > 1000) return false;
  if (tags.includes('milestone') && streakLength % 7 !== 0) return false;
  
  return true;
}
```

### 3. Context Injection

```typescript
function injectContext(
  template: string,
  context: NotificationContext,
  demoState: DemoState
): string {
  let message = template;
  
  // Define available variables
  const variables: Record<string, string | number> = {
    streak_length: context.streakLength,
    steps_remaining: context.stepsRemaining,
    steps_taken: context.stepsTaken,
    daily_goal: demoState.dailyGoal,
    day_of_week: context.dayOfWeek,
    minutes_remaining: Math.ceil(context.stepsRemaining / 100), // ~100 steps/min
    // Calculated values
    streak_length_plus_1: context.streakLength + 1,
    milestone_next: Math.ceil((context.streakLength + 1) / 7) * 7,
  };
  
  // Replace all {{variable}} patterns
  Object.entries(variables).forEach(([key, value]) => {
    const pattern = new RegExp(`{{${key}}}`, 'g');
    message = message.replace(pattern, String(value));
  });
  
  return message;
}
```

### 4. Streak Calculation

```typescript
function calculateStreak(calendarData: DayData[]): number {
  // Sort by date descending (most recent first)
  const sorted = [...calendarData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let streak = 0;
  let currentDate = new Date();
  
  for (const day of sorted) {
    const dayDate = new Date(day.date);
    
    // Check if this day is consecutive
    const daysDiff = Math.floor(
      (currentDate.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysDiff === streak) {
      if (day.goalMet || day.isFreeze) {
        streak++;
        continue;
      } else {
        break; // Streak broken
      }
    } else if (daysDiff > streak) {
      break; // Gap in streak
    }
  }
  
  return streak;
}
```

---

## File Structure

```
/
├── public/
│   ├── personas/
│   │   ├── sunny.svg          # Persona avatars
│   │   ├── dr-quinn.svg
│   │   ├── pep.svg
│   │   ├── rico.svg
│   │   ├── fern.svg
│   │   └── rusty.svg
│   ├── favicon.ico
│   └── og-image.png
│
├── src/
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── ProblemStatement.tsx
│   │   │   ├── SolutionOverview.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── PrivacyPromise.tsx
│   │   ├── quiz/
│   │   │   ├── QuizIntro.tsx
│   │   │   ├── QuizQuestion.tsx
│   │   │   ├── QuizProgress.tsx
│   │   │   └── QuizResults.tsx
│   │   ├── personas/
│   │   │   ├── PersonaCard.tsx
│   │   │   ├── PersonaShowcase.tsx
│   │   │   └── PersonaDirectory.tsx
│   │   ├── demo/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── CalendarView.tsx
│   │   │   ├── PersonasTab.tsx
│   │   │   ├── SettingsTab.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── StreakCounter.tsx
│   │   │   ├── NotificationCard.tsx
│   │   │   ├── StepEntryModal.tsx
│   │   │   └── MilestoneModal.tsx
│   │   ├── shared/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Navigation.tsx
│   │   └── waitlist/
│   │       └── WaitlistForm.tsx
│   │
│   ├── data/
│   │   ├── quizQuestions.ts      # 7 questions with scoring
│   │   ├── personas.ts           # 6 persona definitions
│   │   ├── notificationLibrary.ts # 300+ message templates
│   │   └── demoData.ts           # Sample streak/calendar data
│   │
│   ├── hooks/
│   │   ├── useQuizScoring.ts     # Quiz logic
│   │   ├── useNotificationGenerator.ts
│   │   ├── useLocalStorage.ts    # Persist to LocalStorage
│   │   └── useDemoState.ts       # Demo state management
│   │
│   ├── utils/
│   │   ├── personaScoring.ts     # Quiz scoring algorithm
│   │   ├── messageSelector.ts    # Notification selection logic
│   │   ├── contextInjection.ts   # Replace {{variables}}
│   │   ├── streakCalculator.ts   # Streak calculation
│   │   └── analytics.ts          # Plausible event tracking
│   │
│   ├── store/
│   │   └── demoStore.ts          # Zustand store (or use Context)
│   │
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   │
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Quiz.tsx
│   │   ├── Results.tsx
│   │   └── Demo.tsx
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── .cursorrules
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## Data Flow

### User Journey: Quiz → Demo

```
1. User lands on Landing Page
   └─> Clicks "Take the Quiz"

2. Quiz Page loads
   └─> QuizQuestion component shows Q1
   └─> User selects answer
   └─> State updated: answers[0] = 2
   └─> Repeat for 7 questions
   └─> useQuizScoring hook calculates results
       └─> personaScoring.ts: calculateQuizResults()
       └─> Results saved to LocalStorage
   └─> Navigate to Results Page

3. Results Page
   └─> Display PersonaPercentages chart
   └─> Show PersonaShowcase with examples
   └─> User clicks "Demo the App"

4. Demo Page loads
   └─> Initialize demoStore with:
       - Quiz results (from LocalStorage)
       - Demo data (18-day streak, 6247 steps)
   └─> Render HomeScreen
       └─> StreakCounter: shows 18 days
       └─> ProgressBar: 6247 / 7000 steps
       └─> "Get Motivation" button

5. User clicks "Get Motivation"
   └─> useNotificationGenerator hook triggered
   └─> messageSelector.ts: selectNotification()
       └─> Filters by context (evening, steps remaining)
       └─> Weighted selection based on quiz results
       └─> Randomly picks from pool
   └─> contextInjection.ts: injectContext()
       └─> Replaces {{streak_length}} with 18
       └─> Replaces {{steps_remaining}} with 753
   └─> NotificationCard renders with final message
   └─> Notification added to history
   └─> History saved to LocalStorage (session only)
```

---

## State Management Strategy

### Option 1: Zustand (Recommended)

**Pros:**
- Minimal boilerplate
- TypeScript support out of the box
- Easy to persist to LocalStorage
- Can use outside React components (utility functions)

**Example Store:**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DemoStore extends DemoState {
  // Actions
  addNotification: (notification: Notification) => void;
  updateSteps: (steps: number) => void;
  updatePersonaWeights: (weights: PersonaPercentages) => void;
  resetDemo: () => void;
}

export const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      // Initial state
      currentStreak: 18,
      todaySteps: 6247,
      dailyGoal: 7000,
      notificationHistory: [],
      // ... other state
      
      // Actions
      addNotification: (notification) =>
        set((state) => ({
          notificationHistory: [notification, ...state.notificationHistory]
        })),
      
      updateSteps: (steps) =>
        set({ todaySteps: steps }),
      
      updatePersonaWeights: (weights) =>
        set({ personaWeights: weights }),
      
      resetDemo: () => set(INITIAL_DEMO_STATE),
    }),
    {
      name: 'walki-demo-storage', // LocalStorage key
      partialize: (state) => ({
        // Only persist these fields
        personaWeights: state.personaWeights,
        settings: state.settings,
      }),
    }
  )
);
```

**Usage in Components:**
```typescript
function HomeScreen() {
  const { currentStreak, todaySteps, addNotification } = useDemoStore();
  // ... component logic
}
```

### Option 2: React Context (Alternative)

Simpler but more boilerplate. Use if team prefers standard React patterns.

---

## Deployment Architecture

### Static Hosting (Vercel)

```
GitHub Repository
    ↓ (push to main)
Vercel CI/CD Pipeline
    ↓
1. Install dependencies (npm install)
2. Build (npm run build)
    └─> Vite builds static files to /dist
    └─> Optimizes images, minifies JS/CSS
3. Deploy to CDN
    └─> Global edge network
    └─> Automatic HTTPS
    └─> Custom domain: demo.walki.app
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Performance Optimization

### Bundle Size Targets
- Initial JS bundle: <200KB gzipped
- CSS: <50KB gzipped
- Images: WebP format, <100KB each
- Total page weight: <500KB

### Optimization Strategies

**1. Code Splitting**
```typescript
// Lazy load pages
const Landing = lazy(() => import('./pages/Landing'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Demo = lazy(() => import('./pages/Demo'));
```

**2. Asset Optimization**
- Use SVG for personas (scalable, small)
- Lazy load images with `loading="lazy"`
- Preload critical assets

**3. TailwindCSS Purging**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Purges unused styles in production
};
```

**4. Memoization**
```typescript
// Expensive calculations
const personaPercentages = useMemo(
  () => calculatePercentages(scores),
  [scores]
);
```

---

## Security Considerations

### Client-Side Security

**1. Input Validation**
- Sanitize all user inputs (step entry, settings)
- Validate email format for waitlist
- Prevent XSS in notification messages

**2. LocalStorage Security**
- No sensitive data stored
- Clear on logout (if auth added later)
- Validate data on read (could be tampered)

**3. CSP Headers**
```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' plausible.io; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' data:;
```

### Privacy

**No tracking beyond Plausible:**
- No cookies
- No third-party scripts (except Plausible)
- No user identification
- No data sharing

---

## Testing Strategy

### Unit Tests
- Quiz scoring algorithm
- Notification selection logic
- Context injection
- Streak calculation

### Component Tests
- Quiz flow (answer selection, progression)
- Notification card rendering
- Settings updates

### E2E Tests (Optional for MVP)
- Full user journey: Landing → Quiz → Results → Demo
- Waitlist signup
- LocalStorage persistence

### Manual Testing Checklist
- [ ] Mobile responsive (iPhone, Android)
- [ ] Tablet layout
- [ ] Desktop layout
- [ ] Keyboard navigation
- [ ] Screen reader (VoiceOver/NVDA)
- [ ] Performance (Lighthouse score >90)
- [ ] Cross-browser (Chrome, Safari, Firefox)

---

## Monitoring & Analytics

### Plausible Analytics

**Events to Track:**
```typescript
// Page views (automatic)
// + Custom events:

plausible('Quiz Started');
plausible('Quiz Completed', { props: { topPersona: 'sunny' } });
plausible('Demo Opened');
plausible('Notification Generated', { props: { persona: 'pep' } });
plausible('Waitlist Signup');
plausible('Quiz Shared');
plausible('Persona Weight Adjusted');
```

**Goals:**
- Quiz completion rate
- Time to completion
- Most popular personas
- Waitlist conversion

### Error Tracking

**Sentry (Optional):**
- Catch JavaScript errors
- Report to dashboard
- Filter noise (ignore non-critical)

---

## Future Architecture (Mobile App)

### When Migrating to React Native

**Reusable Code:**
- Business logic (quiz scoring, notification selection) → 100% portable
- Data models (TypeScript interfaces) → 100% portable
- Notification templates (JSON) → 100% portable

**New Requirements:**
- Native step tracking (HealthKit/Google Fit)
- Push notification system (FCM/APNs)
- Backend for cloud sync (Firebase)
- Offline-first database (SQLite)

**Architecture Evolution:**
```
Web Demo (Current)
    ↓
React Native App
    ↓
Backend API (user accounts, sync)
    ↓
Scale (thousands of users)
```

---

## Open Questions & Decisions

### State Management
- **Decision needed:** Zustand vs. React Context?
  - **Recommendation:** Zustand (simpler, better TypeScript support)

### UI Component Library
- **Decision needed:** Shadcn/ui vs. Radix UI directly?
  - **Recommendation:** Shadcn/ui (pre-styled, faster to build with)

### Charting Library
- **Decision needed:** Recharts vs. Chart.js?
  - **Recommendation:** Recharts (React-first, easier integration)

### Email Waitlist
- **Decision needed:** ConvertKit vs. Google Sheets vs. Mailchimp?
  - **Recommendation:** Google Sheets for MVP (free, simple), migrate later

---

## Migration Path

### Phase 1: MVP (Current) → 2 weeks
Static web demo, no backend

### Phase 2: Beta Launch → 1 month
- Add backend (Firebase)
- User accounts
- Email notifications (replace demo notifications)
- Analytics dashboard

### Phase 3: Mobile App → 3 months
- Port to React Native
- Real step tracking
- Push notifications
- App store submission

### Phase 4: Scale → Ongoing
- Optimize backend
- Add social features
- Improve persona algorithm (ML?)
- Revenue: Premium tier

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 17, 2026 | Preston Vance | Initial architecture documentation |
