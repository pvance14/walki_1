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
**Shadcn/ui**
- Accessible by default (WCAG 2.1 AA)
- Unstyled primitives (easy to customize)
- Keyboard navigation
- Screen reader support
- Default style with Zinc slate theme
- CSS variables for theming

### Animations
**Framer Motion**
- Declarative animations
- Gesture support
- Performance optimized (GPU-accelerated)
- Used for: progress bars, confetti, page transitions

### Data Visualization
**Recharts**
- Quiz results charts (bar/pie)
- React-first integration
- Responsive container support
- Persona color customization
- Lightweight with tree-shaking

### State Management
**Zustand**
- Simple, minimal boilerplate
- TypeScript support out of the box
- Built-in persist middleware for LocalStorage
- Can be used outside React components (utility functions)
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
- Keys: `walki_quiz_progress`, `walki-demo-storage`

### Testing
**Vitest**
- Fast unit test runner
- Vite-native integration
- Test coverage for algorithms
- Component testing support

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
**Function:** `calculateQuizResults(answers: number[]): QuizResults`

**Logic:**
- Initialize scores for all 6 personas (Sunny, Dr. Quinn, Pep, Rico, Fern, Rusty)
- Map each answer to persona points (e.g., Question 1, Answer A → { sunny: 2, pep: 1 })
- Calculate total points and convert to percentages
- Identify top persona (highest score)
- Return QuizResults object with scores, percentages, and top persona

### 2. Notification Selection Algorithm
**Function:** `selectNotification(personaWeights, context, previousNotifications): NotificationTemplate`

**Logic:**
1. Filter all messages by context (time of day, streak status, etc.)
2. Exclude recently shown messages (no repeats within session)
3. Build weighted pool based on user's persona preferences
4. Calculate weight: (persona percentage / 100) × base weight
5. Randomly select from weighted pool
6. Return selected NotificationTemplate

**Context Matching:**
- Time-based filtering (morning/evening tags)
- Goal-based filtering (close_to_goal, milestone tags)
- Streak-based filtering (milestone detection)

### 3. Context Injection
**Function:** `injectContext(template, context, demoState): string`

**Available Variables:**
- `{{streak_length}}` - Current streak count
- `{{steps_remaining}}` - Steps to reach goal
- `{{steps_taken}}` - Steps completed today
- `{{daily_goal}}` - User's step goal
- `{{day_of_week}}` - Monday, Tuesday, etc.
- `{{minutes_remaining}}` - Calculated (~100 steps/min)
- `{{streak_length_plus_1}}` - Tomorrow's streak
- `{{milestone_next}}` - Next 7-day milestone

**Logic:**
- Replace all `{{variable}}` patterns with actual values
- Calculate derived values (minutes, next milestone)
- Return final message string

### 4. Streak Calculation
**Function:** `calculateStreak(calendarData: DayData[]): number`

**Logic:**
- Sort calendar data by date (most recent first)
- Iterate through days checking consecutive completion
- Count day if goal met OR freeze used
- Break on first gap or missed day
- Return current streak length

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

### Zustand (Selected Approach)

**Why Zustand:**
- Minimal boilerplate
- TypeScript support out of the box
- Easy to persist to LocalStorage
- Can use outside React components (utility functions)

**Store Structure:**
- Demo state (streak, steps, notifications)
- Quiz results (personas, scores)
- User preferences (weights, settings)

**Persistence:**
- Use `persist` middleware for LocalStorage
- Key: `walki-demo-storage`
- Only persist: persona weights, settings
- Session-only: notification history

**Usage Pattern:**
- Import hook in components: `const { currentStreak } = useDemoStore()`
- Access state and actions directly
- Automatic re-renders on state changes

---

## Deployment Architecture

### Static Hosting (Vercel)

**Deployment Flow:**
1. Push to main branch on GitHub
2. Vercel CI/CD automatically triggers
3. Install dependencies (`npm install`)
4. Build production bundle (`npm run build`)
5. Vite outputs to `/dist` directory
6. Deploy to global CDN with automatic HTTPS
7. Custom domain: demo.walki.app

**Vercel Configuration:**
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- Rewrites: Route all paths to `/index.html` (SPA)

**Environment:**
- Node version: 18+
- Deployment time: <3 minutes
- Global edge network for fast loading

---

## Performance Optimization

### Bundle Size Targets
- Initial JS bundle: <200KB gzipped
- CSS: <50KB gzipped
- Images: WebP format, <100KB each
- Total page weight: <500KB

### Optimization Strategies

**1. Code Splitting**
- Lazy load pages (Landing, Quiz, Demo)
- Split vendor bundles (React, etc.)
- Dynamic imports for heavy components

**2. Asset Optimization**
- SVG for personas (scalable, small)
- Lazy load images with `loading="lazy"`
- Preload critical assets
- WebP format with fallbacks

**3. TailwindCSS Configuration**
- Purge unused styles in production
- Mobile-first breakpoints: 320px, 375px, 768px, 1024px
- Persona colors as CSS custom properties
- JIT mode for minimal bundle size

**4. React Optimization**
- Memoize expensive calculations (`useMemo`)
- Avoid unnecessary re-renders
- Component lazy loading
- Virtual scrolling for long lists (if needed)

---

## Security Considerations

### Client-Side Security
- **Input Validation:** Sanitize user inputs (step entry, settings)
- **Email Validation:** Validate format for waitlist
- **XSS Prevention:** Prevent injection in notification messages
- **LocalStorage:** No sensitive data stored, validate on read

### Privacy
**No tracking beyond Plausible:**
- No cookies
- No third-party scripts (except Plausible)
- No user identification
- No data sharing

**CSP Headers:**
- Restrict script sources to self and Plausible
- Allow inline styles (required by Tailwind)
- Restrict image sources

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
- `Quiz Started` - User begins quiz
- `Quiz Completed` - Quiz finished (include top persona)
- `Demo Opened` - User enters demo
- `Notification Generated` - "Get Motivation" clicked (include persona)
- `Waitlist Signup` - Email submitted
- `Quiz Shared` - Results shared
- `Persona Weight Adjusted` - User customizes preferences

**Goals:**
- Quiz completion rate (>70%)
- Average time on demo (>3 min)
- Most popular personas
- Waitlist conversion (>20%)

### Error Tracking
**Sentry (Optional for Phase 10):**
- Catch JavaScript errors
- Report to dashboard
- Filter non-critical noise

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

## Implementation Timeline

### 10-Phase Development Breakdown

**Total Timeline:** 2 weeks (10 working days)

#### Phase 0: Foundation (Days 1-2)
- Initialize React + TypeScript + Vite project
- Configure TailwindCSS with mobile-first breakpoints
- Set up Git workflow and Vercel/Netlify deployment
- Install essential dependencies (React Router, Zustand)
- Create base file structure
- Configure TypeScript strict mode
- Implement error boundaries
- **Deliverable:** Working empty app deployed to staging URL

#### Phase 1: Data Foundation (Days 2-3)
- Define TypeScript interfaces per data models
- Implement 7 quiz questions with scoring algorithm
- Define 6 persona configurations with official names and colors
- Generate 300 notification message templates (50 per persona)
- Create demo data (18-day streak, 6,247/7,000 steps, 1 freeze, 1 missed day)
- Implement core algorithms: quiz scoring, notification selection, context injection, streak calculation
- Write unit tests for all algorithms using Vitest
- **Deliverable:** All data and business logic complete and tested

#### Phase 2: Component Library (Days 3-4)
- Set up Shadcn/ui with Tailwind integration
- Implement persona color scheme (6 distinct colors)
- Create base components (Button, Input, Modal, Card)
- Build ProgressBar with animations
- Build StreakCounter with milestone effects
- Build NotificationCard with persona styling
- Build PersonaCard with hover effects
- Build quiz components (QuizQuestion, QuizProgress)
- Implement responsive navigation
- Set up Framer Motion for animations
- **Deliverable:** Complete component library

#### Phase 3: Landing Page (Days 4-5)
- Hero section with headline and CTA
- Problem statement section
- Solution overview with persona previews
- How It Works section
- Privacy promise section
- Footer with links
- Mobile responsive design
- Animations and micro-interactions
- Meta tags for SEO and social sharing
- **Deliverable:** Production-ready landing page

#### Phase 4: Motivation Quiz (Days 5-6)
- Quiz introduction screen
- Question flow with progress indicator (1 of 7)
- Answer selection with hover states
- Back button to revise answers
- Quiz completion and scoring
- Zustand store setup for quiz state
- LocalStorage persistence (resume incomplete quiz)
- Mobile-optimized touch interactions
- Loading states and transitions
- Navigation to results page
- **Deliverable:** Fully functional quiz flow

#### Phase 5: Quiz Results & Persona Showcase (Days 6-7)
- Results screen with persona percentages
- Recharts bar/pie chart visualization
- Top persona callout
- Detailed persona showcase
- Example messages for each persona
- Shareable results feature (Web Share API)
- Quiz retake option
- CTA to enter demo
- Animations for result reveal
- Mobile-responsive charts
- **Deliverable:** Complete results and showcase experience

#### Phase 6: Interactive Demo - Core (Days 7-8)
- Demo home screen layout
- Streak counter display (18 days)
- Progress bar (6,247/7,000 steps)
- Step entry modal
- "Get Motivation" notification generator
- Notification history feed
- Bottom navigation (Home, Calendar, Personas, Settings)
- Zustand store for demo session
- LocalStorage for session persistence
- Real-time updates when steps added
- Milestone celebration modal
- **Deliverable:** Core demo experience functional

#### Phase 7: Interactive Demo - Extended (Days 8-9)
- Calendar view with streak visualization
- Day detail modal (click calendar day)
- Personas tab with weight sliders
- Settings tab (notification timing, goals)
- Persona weight adjustment
- Demo data updates based on settings
- Context-aware notification generation
- Streak freeze explanation
- All tab navigation working
- Mobile-optimized interactions
- **Deliverable:** Full demo experience

#### Phase 8: Waitlist & Integration (Day 9)
- Waitlist form design with email validation
- Integration with Google Sheets for MVP
- Thank you state after signup
- Social sharing from waitlist
- Terms of Service page (simplified for demo)
- Privacy Policy page (plain English)
- Plausible analytics integration
- Configure analytics event tracking for MVP metrics
- Event tracking implementation
- Privacy-compliant analytics (no cookies)
- Error handling for form submission
- **Deliverable:** Complete user acquisition funnel with analytics

#### Phase 9: Polish & Optimization (Day 10)
- Cross-browser testing (Chrome, Safari, Firefox)
- Mobile device testing (iOS Safari, Chrome Android)
- Accessibility audit (keyboard navigation, screen reader)
- Performance optimization (Lighthouse score >90)
- Image optimization (WebP, lazy loading)
- Bundle size optimization (code splitting)
- Error state handling throughout app
- Loading state polish
- Animation timing refinement
- Copy editing and proofreading
- Meta tags and Open Graph images
- 404 page
- Validate MVP success metrics targets
- **Deliverable:** Production-ready application

#### Phase 10: Launch Prep (Day 10+)
- Final production deployment
- Custom domain setup (demo.walki.app)
- Smoke testing in production
- Analytics verification
- Social sharing verification
- Product Hunt submission prep
- Beta tester outreach
- Launch checklist completion
- Error monitoring setup (optional Sentry)
- Prepare launch content
- **Deliverable:** Live, launched demo

### Critical Path Items
**Must not slip:**
1. Quiz scoring algorithm (validates core concept)
2. Notification generation (shows persona variety)
3. Mobile responsiveness (test at each phase)
4. Performance (<3s load time)
5. Persona names and colors match spec
6. Demo data accuracy

**Can simplify if needed:**
1. Chart visualizations (simple bars vs fancy charts)
2. Animations (reduce complexity)
3. Calendar detail view (less info per day)
4. Settings granularity (fewer options)

---

## Technical Decisions (Confirmed)

### Technology Stack Decisions
- **Frontend Framework:** React 18+ with TypeScript ✅
- **Build Tool:** Vite ✅
- **Styling:** TailwindCSS with mobile-first breakpoints ✅
- **UI Components:** Shadcn/ui (not Radix UI directly) ✅
- **Charts:** Recharts (not Chart.js) ✅
- **State Management:** Zustand (not React Context) ✅
- **Testing:** Vitest ✅
- **Animations:** Framer Motion ✅
- **Routing:** React Router v6 ✅
- **Hosting:** Vercel ✅
- **Analytics:** Plausible (privacy-first) ✅
- **Waitlist:** Google Sheets for MVP, migrate to ConvertKit later ✅

### Key Configuration Decisions
- **TypeScript:** Strict mode enabled
- **Node Version:** 18+
- **Build Output:** `/dist` directory
- **Path Aliases:** `@/` for `./src`
- **Persona Colors:** CSS variables in Tailwind config
- **LocalStorage Keys:** `walki_quiz_progress`, `walki-demo-storage`
- **Custom Domain:** demo.walki.app
- **Reduced Motion:** All animations respect `prefers-reduced-motion`

---

## Success Metrics Configuration

### 5 MVP Metrics (Tracking Implementation)

#### 1. Quiz Completion Rate (Target: >70%)
**Track:** Quiz Started events vs Quiz Completed events  
**Implementation:** Fire analytics events at quiz entry and completion

#### 2. Demo Engagement Time (Target: >3 minutes)
**Track:** Time spent on /demo page  
**Implementation:** Track start time on mount, calculate duration on unmount

#### 3. "Get Motivation" Click Rate (Target: >3 per session)
**Track:** Count of Notification Generated events per unique session  
**Implementation:** Fire event each time button clicked with persona data

#### 4. Waitlist Conversion (Target: >20%)
**Track:** Waitlist Signups vs Demo Visitors  
**Implementation:** Fire event on successful form submission

#### 5. Social Share Rate (Target: >5%)
**Track:** Share events vs total visitors  
**Implementation:** Fire event when Web Share API or copy link used

### Analytics Dashboard Configuration
- Quiz completion funnel visualization
- Average time on /demo page
- Get Motivation clicks per session distribution
- Waitlist conversion rate by traffic source
- Share event tracking

### Performance Metrics (Lighthouse)
**Targets:**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90
- Initial Load: <3 seconds
- Bundle Size: <200KB gzipped (initial JS)

---

## Development Workflow

### Phase-by-Phase Approach
Each phase builds on the previous with clear deliverables:
1. Complete all tasks for current phase
2. Test deliverables meet success criteria
3. Commit to Git with descriptive message
4. Deploy to staging for verification
5. Mobile-first testing checkpoint
6. Proceed to next phase only when complete

### Testing Strategy Per Phase
**Phase 0-1:** Foundation testing
- Dev server performance (<5s startup)
- TypeScript compilation (no errors)
- Unit tests for algorithms (Vitest)

**Phase 2:** Component testing
- Component showcase page for isolation testing
- Responsive breakpoint testing (320px, 375px, 768px, 1024px)
- Accessibility basics (keyboard nav, focus states)

**Phase 3-7:** Integration testing
- User flow testing (Landing → Quiz → Results → Demo)
- LocalStorage persistence verification
- State management correctness

**Phase 8:** Analytics testing
- Event tracking verification
- Form submission testing
- Error handling scenarios

**Phase 9:** Quality assurance
- Cross-browser testing (Chrome, Safari, Firefox)
- Mobile device testing (iOS Safari, Chrome Android)
- Accessibility audit (VoiceOver/NVDA)
- Performance audit (Lighthouse)

**Phase 10:** Production validation
- Smoke testing in production environment
- Analytics data verification
- Social sharing preview testing

### Mobile-First Testing Checkpoints
**Every phase must verify:**
- ✅ Touch targets minimum 44px
- ✅ No horizontal scroll at 320px width
- ✅ Content readable without zoom
- ✅ Forms work on mobile keyboards
- ✅ Animations perform smoothly on devices

**Key mobile breakpoints:**
- 320px (iPhone SE)
- 375px (iPhone 12/13)
- 390px (iPhone 14)
- 768px (iPad portrait)
- 1024px (iPad landscape)

### Deployment Verification at Each Phase
**Staging deployment checklist:**
1. Run `npm run build` locally (verify no errors)
2. Push to main branch
3. Vercel auto-deploy triggers
4. Wait for deployment complete (<3 min)
5. Visit staging URL
6. Test key functionality for current phase
7. Check browser console (no errors)
8. Verify mobile responsive on real device

**Rollback procedure:**
- Revert to previous deployment in Vercel dashboard
- Or revert Git commit and push

---

## Open Questions & Decisions

### Resolved Decisions
- ✅ State Management: **Zustand** (simpler, better TypeScript support)
- ✅ UI Component Library: **Shadcn/ui** (pre-styled, faster to build with)
- ✅ Charting Library: **Recharts** (React-first, easier integration)
- ✅ Email Waitlist: **Google Sheets for MVP** (free, simple), migrate to ConvertKit later
- ✅ Testing Framework: **Vitest** (Vite-native, fast)

### Still Open
- A/B testing framework (skip for MVP, add in iteration phase)
- Figma mockups (optional - proceed with Tailwind prototyping)
- Error monitoring: Sentry (optional for Phase 10)

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
| 1.1 | Feb 18, 2026 | Preston Vance | Updated with detailed implementation decisions from 10-phase roadmap: confirmed tech stack (Shadcn/ui, Recharts, Zustand, Vitest), added implementation timeline, success metrics configuration, development workflow, testing strategy, mobile-first checkpoints, and deployment verification procedures |
