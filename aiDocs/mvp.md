# Minimum Viable Product (MVP) Specification
## Walki - Web-Based Interactive Demo

**Version:** 1.0  
**Date:** February 11, 2026  
**Status:** Ready for Development  
**Author:** Preston Vance

---

## Executive Summary

This MVP is a **web-based interactive demo** designed to validate the core value proposition of Walki: AI-powered personas that motivate users to maintain walking streaks. Rather than building a full mobile app, this demo allows stakeholders, potential users, and advisors to experience the personality-driven motivation system in a shareable, rapidly iterable format.

**Goal:** Validate that the AI persona concept resonates with users before investing 3+ months in mobile development.

**Timeline:** 1-2 weeks  
**Platform:** Responsive web app (desktop and mobile browser compatible)  
**Deployment:** Static hosting (Vercel, Netlify, or GitHub Pages)

---

## What We're Validating

### Primary Validation Goals

1. **Persona Appeal:** Do users find the six personas genuinely motivating/entertaining?
2. **Quiz Effectiveness:** Does the motivation quiz accurately capture user preferences?
3. **Concept Clarity:** Do people immediately understand the value proposition?
4. **Emotional Response:** Do the notifications make people smile, laugh, or feel motivated?
5. **Shareability:** Will people share their quiz results or favorite notifications?

### Secondary Validation Goals

6. Streak visualization appeal
7. Notification timing preferences
8. Persona weight customization interest
9. Privacy messaging resonance
10. Overall UX and aesthetic

### What We're NOT Validating

❌ Real step tracking accuracy  
❌ Long-term retention (can't measure in a demo)  
❌ Native mobile UX  
❌ Actual behavior change (whether people walk more)  
❌ Notification delivery in real life  
❌ Backend scalability

---

## User Flow

### Complete Journey

```
Landing Page
    ↓
"Try the Quiz" (CTA)
    ↓
Motivation Quiz (5-7 questions)
    ↓
Quiz Results & Persona Showcase
    ↓
"Demo the App" (CTA)
    ↓
Interactive Demo Experience
    ↓
"Join Waitlist" (CTA)
```

---

## Features & Specifications

### 1. Landing Page

**Purpose:** Explain the concept and entice users to try the quiz

**Content Sections:**

**Hero Section:**
- Headline: "Your Walking Buddy Has Six Personalities (And Actually Gets You)"
- Subheadline: "AI-powered motivation that adapts to what drives YOU. Some days you need a cheerleader. Other days you need hard truth."
- Primary CTA: "Take the Motivation Quiz" (large button)
- Visual: Animated illustration showing 6 persona avatars

**Problem Statement:**
- "Generic fitness apps don't stick because motivation isn't one-size-fits-all"
- Stats: "92% of fitness app users quit within 30 days"
- Pain points with icons: Notification fatigue, boring tracking, privacy concerns

**Solution Overview:**
- "Six AI Personas, One Mission: Keep Your Streak Alive"
- Brief intro to each persona (name + one-liner):
  - The Companion: "Your supportive walking buddy"
  - The Educator: "Science-backed motivation"
  - The Cheerleader: "Pure enthusiasm and energy"
  - The Challenger: "Pushes you past your limits"
  - The Sage: "Mindful wellness wisdom"
  - The Pessimist: "Reverse psychology and dark humor"

**How It Works:**
1. Take a 2-minute quiz
2. Get personalized persona mix
3. Receive daily motivational notifications
4. Build unstoppable walking streaks

**Privacy Promise:**
- Badge/callout: "Your data stays yours. No selling, no sharing, no BS."

**Social Proof (Placeholder for now):**
- "Coming soon to iOS and Android"
- "Built for people who want consistency without fitness culture"

**Secondary CTA:** "Try the Demo" (skip to demo without quiz)

**Footer:**
- About, Privacy, Contact
- Email signup for updates

---

### 2. Motivation Quiz

**Purpose:** Determine user's motivation profile and demonstrate personalization

**Quiz Structure:**

**Introduction Screen:**
- "Let's figure out what actually motivates you"
- "7 quick questions, no wrong answers"
- "Your results will personalize the demo"
- Start Quiz button

**Question Format:**
- Scenario-based (not direct "what motivates you?")
- 4 answer choices per question
- Each choice maps to 1-2 personas
- Progress indicator (Question 2 of 7)
- "Back" button to revise answers

**7 Questions:**

**Q1: Missing Your Goal Scenario**
"It's 9 PM. You're 2,000 steps short of your daily goal. What gets you moving?"
- A) "A friend would be proud of me for finishing strong" → Companion (2pts), Cheerleader (1pt)
- B) "Missing a day means higher risk of heart disease" → Educator (3pts)
- C) "I refuse to break my 12-day streak" → Challenger (2pts), Sage (1pt)
- D) "A walk would actually help me decompress" → Sage (2pts), Companion (1pt)

**Q2: Celebration Preference**
"You just completed 7 straight days of walking! What message would make you happiest?"
- A) "OMG YOU'RE INCREDIBLE! 🎉 I KNEW YOU COULD DO IT!" → Cheerleader (3pts)
- B) "7 days = 51% lower cardiovascular risk. Your body thanks you." → Educator (3pts)
- C) "Week one down. Think you can make it to 14? Prove it." → Challenger (3pts)
- D) "Hey, that's awesome! So proud of you, friend." → Companion (3pts)

**Q3: Motivation Driver**
"Why do you want to walk more consistently?"
- A) "To feel energized and proud of myself" → Cheerleader (2pts), Companion (1pt)
- B) "For specific health benefits my doctor mentioned" → Educator (3pts)
- C) "To prove I can stick with something" → Challenger (2pts), Pessimist (1pt)
- D) "To clear my mind and reduce stress" → Sage (3pts)

**Q4: Communication Style Preference**
"Which message style resonates most with you?"
- A) "Warm and supportive, like a good friend" → Companion (3pts)
- B) "Direct and fact-based, no fluff" → Educator (2pts), Challenger (1pt)
- C) "Playful and high-energy" → Cheerleader (3pts)
- D) "Calm and thoughtful" → Sage (3pts)

**Q5: Handling Setbacks**
"You missed a day and broke your streak. What helps you restart?"
- A) "Encouragement that it's okay and I can start fresh" → Companion (2pts), Cheerleader (1pt)
- B) "Reminder that consistency matters more than perfection" → Sage (2pts), Educator (1pt)
- C) "A challenge to beat my old record" → Challenger (3pts)
- D) "Blunt honesty: 'You said you'd do this. Do it.'" → Pessimist (2pts), Challenger (1pt)

**Q6: Humor Preference**
"How do you feel about dark humor / sarcasm?"
- A) "Love it! Makes things fun" → Pessimist (3pts), Challenger (1pt)
- B) "Occasionally funny, but prefer positivity" → Cheerleader (2pts), Companion (1pt)
- C) "Not really my thing" → Educator (2pts), Sage (1pt)
- D) "Depends on my mood" → All personas (1pt each - balanced)

**Q7: Ideal Walking Partner**
"If you had to walk with someone every day, who would you pick?"
- A) "An enthusiastic friend who celebrates every mile" → Cheerleader (2pts), Companion (1pt)
- B) "A knowledgeable coach who teaches me about fitness" → Educator (3pts)
- C) "A competitive rival who pushes me to go further" → Challenger (3pts)
- D) "A wise mentor who makes walks feel meditative" → Sage (3pts)

**Q8: The "Busy Day" Friction**
"You have a packed schedule and only 15 minutes to spare. How do you justify a short walk?"
- A) "Even a short burst of movement improves cognitive function and blood flow." → Educator (3pts)
- B) "I promised myself I’d do something today, and I don't want to let myself down." → Companion (2pts), Sage (1pt)
- C) "15 minutes is better than 0. Don't let the day win—get out there!" → Challenger (3pts)
- D) "Use this time to breathe and reset your nervous system." → Sage (3pts)

**Q9: The Reward System**
"What kind of 'reward' for hitting a milestone actually feels valuable to you?"
- A) "A digital trophy or a shoutout on a leaderboard." → Challenger (2pts), Cheerleader (1pt)
- B) "A summary report showing exactly how much my fitness has improved." → Educator (3pts)
- C) "A heartfelt 'I'm so impressed by your dedication' message." → Companion (2pts), Cheerleader (1pt)
- D) "The quiet satisfaction of knowing I’m becoming a more disciplined person." → Sage (2pts), Pessimist (1pt)

**Q10: External Resistance**  
"It’s raining outside and you really don’t want to go. What’s the one thing that gets you out the door?"
- A) "The rain won't melt you. Stop making excuses and go." → Pessimist (3pts), Challenger (1pt)
- B) "Think of how cozy and accomplished you'll feel when you get back inside!" → Cheerleader (2pts), Companion (1pt)
- C) "Walking in nature—even in the rain—can be a powerful grounding experience." → Sage (3pts)
- D) "Rain gear exists for a reason; your cardiovascular goals don't care about the weather." → Educator (2pts), Challenger (1pt)

**Scoring System:**
- Each question awards points to personas based on answer
- Total points tallied per persona
- Displayed as percentages: "You're 35% Cheerleader, 25% Companion, 20% Educator, 10% Challenger, 5% Sage, 5% Pessimist"

---

### 3. Quiz Results & Persona Showcase

**Purpose:** Show personalized results and introduce each persona in detail

**Results Screen:**

**Your Motivation Profile:**
- Animated reveal of percentages
- Visual: Horizontal bar chart or pie chart showing persona distribution
- Top headline: "You're driven by [TOP PERSONA] energy"
- Subheadline: Brief interpretation (e.g., "You respond best to supportive encouragement with occasional facts")

**Your Top 3 Personas:**
- Cards showing top 3 personas with:
  - Avatar illustration
  - Name and percentage
  - One-line description
  - Example notification from that persona

**Meet the Full Team:**
- Expandable section showing all 6 personas
- Each persona card includes:
  - Avatar (distinct visual style/color)
  - Name
  - Personality description (2-3 sentences)
  - "Voice & Style" traits
  - 2-3 example notifications showing range

**Persona Cards Detail:**

**The Companion (Color: Warm Orange)**
- **Name:** Sunny
- **Description:** Your supportive walking buddy who's always in your corner. Friendly, warm, and encouraging without being over-the-top. Feels like a text from a good friend.
- **Voice:** Casual, supportive, personal
- **Examples:**
  - "Hey! Just checking in—you've been crushing that streak. Want to keep it going together today? ☀️"
  - "Day 15! I'm so proud of you. Let's make it 16 tomorrow, yeah?"
  - "Rough day? A quick walk might help. I'll be with you the whole way."

**The Educator (Color: Deep Blue)**
- **Name:** Dr. Quinn
- **Description:** Science-backed motivation for the data-driven. Shares health facts, research, and tangible benefits of walking. No fluff, just evidence.
- **Voice:** Informative, authoritative, fact-based
- **Examples:**
  - "Walking 7,000 steps daily reduces all-cause mortality by 50-70%. You're literally extending your life."
  - "Your 10-day streak has already improved your cardiovascular health, reduced inflammation, and boosted cognitive function."
  - "Studies show morning walks increase productivity by 23%. Time to invest in your day."

**The Cheerleader (Color: Bright Pink)**
- **Name:** Pep
- **Description:** Pure enthusiasm and high-energy hype. Celebrates every win with genuine excitement. Impossible not to smile at her messages.
- **Voice:** Enthusiastic, energetic, uses emojis liberally
- **Examples:**
  - "YESSS! Day 7!! You're UNSTOPPABLE! Let's GOOOO! 🎉🔥💪"
  - "OMG you hit 10,000 steps?! I'M SO PROUD OF YOU! You're amazing!!!"
  - "Good morning, superstar! ☀️ Today is YOUR day! Let's make it incredible! 🚀"

**The Challenger (Color: Bold Red)**
- **Name:** Rico
- **Description:** Pushes you past your comfort zone with competitive fire. Direct, provocative, and unapologetically demanding. Thrives on daring you to do better.
- **Voice:** Direct, competitive, challenging
- **Examples:**
  - "5,842 steps yesterday? That's cute. Bet you can't hit 8,000 today."
  - "You're really gonna let a 3-day streak be your peak? I expected more."
  - "Your neighbor walked 12K yesterday. You gonna take that? Didn't think so."

**The Sage (Color: Calming Green)**
- **Name:** Fern
- **Description:** Mindful wisdom for holistic wellness. Frames walking as meditation, self-care, and inner peace. Calm, grounding, and philosophical.
- **Voice:** Calm, wise, reflective
- **Examples:**
  - "Each step is a meditation. Your 8-day streak is a practice in presence and commitment."
  - "Walking isn't just movement—it's a gift you give your future self. Thank you for showing up today."
  - "The path of 1,000 miles begins with a single step. You're already 7 days into your journey."

**The Pessimist (Color: Dark Gray)**
- **Name:** Rusty
- **Description:** Reverse psychology master with dark humor. Expects you to fail, but secretly hopes you'll prove them wrong. Oddly motivating through sarcasm.
- **Voice:** Sarcastic, darkly humorous, pessimistic
- **Examples:**
  - "Day 3 of your streak. Statistically you'll quit by Friday. But sure, surprise me."
  - "Oh look, it's raining. Perfect excuse to break your streak. I'm sure you'll find another one tomorrow."
  - "You actually walked today? Huh. Color me surprised. Don't get cocky though."

**Share Your Results:**
- "Share Your Motivation Type" button
- Generates shareable image with results (can download or copy link)
- Social sharing buttons (Twitter, Facebook, LinkedIn)

**CTA:**
- "See It In Action" button → Launches into demo
- "Retake Quiz" link (smaller, secondary)

---

### 4. Interactive Demo Experience

**Purpose:** Let users experience the core app functionality with sample data

**Demo Opens To: Home Screen**

#### 4.1 Home Screen (Main Dashboard)

**Header:**
- App logo/name
- Settings icon (top right)
- Menu icon (hamburger, top left)

**Hero Section: Streak Counter**
- Large, prominent display: "18 Day Streak 🔥"
- Visual: Animated flame or streak icon
- Subtext: "Your longest streak yet!"

**Today's Progress:**
- Progress bar: 6,247 / 7,000 steps (89% complete)
- Large circular progress indicator or animated bar
- Text: "753 steps to go!"
- Last updated: "2 minutes ago"

**Quick Actions:**
- Primary button: "Log Today's Steps" (opens step entry modal)
- Secondary button: "Get Motivation" (triggers random persona notification)

**Recent Activity Feed:**
- Shows last 3-5 notifications received (demo data)
- Each notification card shows:
  - Persona avatar (small icon)
  - Persona name
  - Message preview
  - Timestamp (e.g., "2 hours ago")
  - Tap to expand full message

**Example Feed Items:**
```
[Cheerleader avatar] The Cheerleader
"You're SO CLOSE to your goal! 753 steps = 8 minutes!"
2 hours ago

[Educator avatar] The Educator
"Your 18-day streak has reduced your cardiovascular risk by..."
This morning, 9:23 AM

[Companion avatar] The Companion
"Hey friend! How are you feeling today? Ready to keep..."
Yesterday, 7:45 PM
```

**Bottom Navigation:**
- Home (active)
- Calendar
- Personas
- Settings

#### 4.2 Step Entry Modal

**Trigger:** Clicking "Log Today's Steps"

**Modal Content:**
- "Add Today's Steps"
- Input field (number, placeholder: "Enter steps")
- Optional: "Add Walking Event" toggle
  - If toggled: Additional fields for time, distance, notes
- "Save" button
- "Cancel" link

**Behavior:**
- On save: Updates home screen progress bar
- Shows success message: "6,247 steps logged! 753 to go!"
- If goal reached: Celebration animation + "Goal Complete! 🎉" message
- Updates calendar with completed day

**Pre-populated Events (Demo Data):**
- User can see existing logged events in calendar or activity history
- Example: "Morning walk - 2,450 steps - 8:30 AM"

#### 4.3 "Get Motivation" Feature

**Trigger:** Clicking "Get Motivation" button

**Behavior:**
- Button shows loading animation (1 second)
- Generates notification based on quiz results (weighted persona selection)
- Displays notification card with:
  - Persona avatar (large)
  - Persona name
  - Full message (context-aware based on current demo state)
  - Timestamp: "Just now"
- Adds to activity feed

**Message Selection Logic:**
- Pulls from pre-written library (50+ messages per persona)
- Weighted by quiz results (if user is 40% Cheerleader, 40% chance of Cheerleader message)
- Injects context variables:
  - Current streak length (18 days in demo)
  - Steps remaining (753)
  - Time of day
  - Day of week
- No repeats within session (tracks shown messages)

**Example Generated Notifications:**

*If Cheerleader selected:*
"OMG you're SO CLOSE! 753 steps?! That's like 8 minutes! You've got this! Let's finish STRONG! 💪🔥"

*If Pessimist selected:*
"753 steps left. With your track record, you'll probably get those done on the walk to the fridge. Prove me wrong."

*If Educator selected:*
"You're 753 steps from completing day 18. Consistency at this level improves insulin sensitivity by 23%."

#### 4.4 Calendar View (Streak History)

**Navigation:** Bottom nav → Calendar tab

**Layout:**
- Month calendar view (current month displayed)
- Each day shows:
  - ✅ Green checkmark if goal met
  - ⚠️ Yellow warning if partial (>50% of goal)
  - ❌ Red X if missed
  - 🧊 Blue "freeze" icon if streak freeze used
  - Gray if future date

**Demo Data:**
- Shows current 18-day streak
- One "freeze" used 5 days ago (blue icon)
- One missed day 20 days ago (before streak started)

**Interaction:**
- Tap any completed day → Shows summary:
  - Steps taken: "8,456 steps"
  - Goal: "7,000 steps"
  - Walking events: "Morning walk (2,450), Evening stroll (3,200)"
  - Notifications received: List of 2-3 messages from that day

**Streak Stats Card (above calendar):**
- Current Streak: 18 days 🔥
- Longest Streak: 18 days
- Total Active Days: 42
- Streak Freezes Available: 1 (refreshes weekly)

**"Use Streak Freeze" Demo:**
- Info button explaining streak freeze feature
- Modal: "Streak Freeze: Save Your Streak"
  - Explanation: "Life happens! Use a freeze to protect your streak for one day."
  - "You get 1 freeze per week"
  - "Currently available: 1"
- Demo shows it in action on a missed day in calendar

#### 4.5 Personas Screen

**Navigation:** Bottom nav → Personas tab

**Purpose:** Showcase all personas, adjust weights, see message history

**Your Motivation Mix (Top Section):**
- Shows quiz results visualization (bar chart or pie chart)
- "Based on your quiz, here's your persona mix"
- Display percentages for all 6

**Adjust Your Mix (Interactive Sliders):**
- "Want to tweak your notifications? Adjust below."
- 6 sliders (one per persona)
- Each slider: 0-100%
- Real-time percentage display
- "Save Changes" button
- Note: "Changes affect future notifications"

**Persona Directory:**
- Cards for all 6 personas (same style as showcase)
- Each card:
  - Avatar
  - Name and personality description
  - "See More Messages" button → Opens modal with 5-6 example messages
  - "Mute [Persona]" toggle (dims persona, sets to 0%)

**Message History:**
- "Recent Messages by Persona" section
- Tabs for each persona
- Shows all messages received from that persona in demo session
- Allows users to "favorite" messages (heart icon)

#### 4.6 Settings Screen

**Navigation:** Bottom nav → Settings tab OR header settings icon

**Sections:**

**Account (Grayed Out in Demo):**
- "Demo Mode Active"
- "Sign up to save your progress and use the real app"

**Notification Preferences:**
- Morning notification time: Dropdown (7:30 AM - 10:00 AM window)
- Evening notification time: Dropdown (5:00 PM - 8:00 PM window)
- Frequency: Dropdown (1/day, 2/day, 3/day)
- Toggle: "Randomize timing within window" (ON by default)

**Goals:**
- Daily step goal: Input (default 7,000)
- Slider: 3,000 - 20,000

**Streak Settings:**
- Toggle: "Show streak on home screen" (ON)
- Info: "Streak freezes explained" (opens modal)

**Privacy:**
- "Your privacy matters" section
- Links:
  - View Privacy Policy
  - Data & Permissions
  - Delete Account (grayed in demo)

**About:**
- App version
- "This is a demo. Coming soon to iOS & Android."
- "Join Waitlist" button
- Links: Contact, Feedback, Terms

**Retake Quiz:**
- "Retake Motivation Quiz" button
- Warning: "This will reset your persona mix"

#### 4.7 Additional Demo Features

**Milestone Celebration (Triggered Demo):**
- When user clicks "Get Motivation" for 5th time in session:
  - Special modal: "Milestone Unlocked! 🎉"
  - "You just completed your 18th day!"
  - Confetti animation
  - Special message from top persona
  - "Share Your Achievement" button

**Streak Recovery Demo:**
- In calendar, show info icon on "freeze" day
- Clicking it explains: "You used a streak freeze here to save your 13-day streak when life got busy"
- Demo the consequence: "Without freeze, streak would have reset to 0"

**Context-Aware Messages:**
- Messages adapt to:
  - Time of day (morning vs. evening)
  - Progress (close to goal vs. far from goal)
  - Streak length (milestone vs. regular day)
  - Day of week (weekday vs. weekend)

**Easter Eggs:**
- If user clicks "Get Motivation" 10+ times: Pessimist appears regardless of settings:
  - "Okay seriously, stop clicking that button and go for an actual walk."

---

### 5. Waitlist / Call-to-Action

**Appears:** 
- After demo session (5+ interactions)
- At end of page scroll
- In footer

**Waitlist Form:**
- Headline: "Want Walki on Your Phone?"
- Subheadline: "Join 1,000+ people waiting for launch"
- Form fields:
  - Email (required)
  - First name (optional)
  - Phone type: iOS / Android (optional)
- Checkbox: "Send me updates and launch notification"
- Privacy note: "We'll never share your email. Unsubscribe anytime."
- Submit button: "Join Waitlist"

**Thank You State:**
- "You're on the list! 🎉"
- "We'll email you when we launch (Spring 2026)"
- "In the meantime:"
  - Share buttons (refer a friend)
  - "Retake the quiz with different answers"
  - "Explore the demo more"

---

## Technical Specifications

### Tech Stack

**Frontend Framework:**
- **React** (with TypeScript) - Component reusability, easy to port to React Native later
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Rapid styling with mobile-first approach

**UI Components:**
- **Shadcn/ui** or **Radix UI** - Accessible, customizable components
- **Framer Motion** - Smooth animations (confetti, progress bars, transitions)
- **Recharts** or **Chart.js** - Quiz results visualization

**State Management:**
- **Zustand** or **React Context** - Simple state for quiz results, demo data
- **LocalStorage** - Persist quiz results and demo session data

**Hosting & Deployment:**
- **Vercel** or **Netlify** - Static hosting with CI/CD from GitHub
- Custom domain: `demo.walki.app` or `walki.app/demo`

**Analytics (Privacy-Conscious):**
- **Plausible** or **Fathom Analytics** - No cookies, GDPR compliant
- Track:
  - Quiz completion rate
  - Time spent in demo
  - "Get Motivation" clicks
  - Waitlist signups
  - Persona adjustment interactions

**Email Capture:**
- **ConvertKit**, **Mailchimp**, or **simple Google Sheets integration**

### File Structure

```
/
├── public/
│   ├── personas/           # Persona avatars (SVG or PNG)
│   ├── favicon.ico
│   └── og-image.png        # Social sharing image
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
│   ├── data/
│   │   ├── quizQuestions.ts      # Quiz question data
│   │   ├── personas.ts           # Persona descriptions
│   │   ├── notificationLibrary.ts # 300+ pre-written messages
│   │   └── demoData.ts           # Sample streak/step data
│   ├── hooks/
│   │   ├── useQuizScoring.ts
│   │   ├── useNotificationGenerator.ts
│   │   └── useLocalStorage.ts
│   ├── utils/
│   │   ├── personaScoring.ts     # Quiz scoring algorithm
│   │   ├── messageSelector.ts    # Weighted message selection
│   │   └── contextInjection.ts   # Replace {{variables}} in messages
│   ├── store/
│   │   └── demoStore.ts          # Zustand store for demo state
│   ├── styles/
│   │   └── globals.css
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Quiz.tsx
│   │   ├── Results.tsx
│   │   └── Demo.tsx
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

### Data Structure

**Quiz Results State:**
```typescript
interface QuizResults {
  scores: {
    companion: number;
    educator: number;
    cheerleader: number;
    challenger: number;
    sage: number;
    pessimist: number;
  };
  percentages: {
    companion: number;
    educator: number;
    cheerleader: number;
    challenger: number;
    sage: number;
    pessimist: number;
  };
  topPersona: string;
  timestamp: Date;
}
```

**Demo State:**
```typescript
interface DemoState {
  currentStreak: number;
  longestStreak: number;
  dailyGoal: number;
  todaySteps: number;
  notificationHistory: Notification[];
  calendarData: DayData[];
  personaWeights: PersonaWeights;
  freezesAvailable: number;
  settings: Settings;
}

interface Notification {
  id: string;
  persona: string;
  message: string;
  timestamp: Date;
  context: {
    streakLength: number;
    stepsRemaining: number;
    timeOfDay: string;
  };
}
```

**Notification Template:**
```typescript
interface NotificationTemplate {
  id: string;
  persona: string;
  template: string;  // e.g., "Hey! You're on a {{streak_length}}-day streak!"
  contextRequired: string[];  // ["streak_length", "steps_remaining"]
  tags: string[];  // ["morning", "milestone", "encouraging"]
  weight: number;  // Base probability weight
}
```

---

## Notification Message Library

### Message Generation Strategy

**Pre-generate 300+ messages** (50 per persona) covering:

**Contexts:**
- Morning motivation (hasn't walked yet)
- Evening reminder (below goal)
- Close to goal (within 1,000 steps)
- Goal reached (celebration)
- Streak milestones (7, 14, 30 days)
- Weekday vs. weekend
- Weather-based (rainy, sunny - optional)

**Example Messages Per Persona:**

**The Companion (50 messages):**
1. "Good morning, friend! Ready to add another day to that {{streak_length}}-day streak? ☀️"
2. "Hey! You're {{steps_remaining}} steps away from your goal. That's only {{minutes_remaining}} minutes!"
3. "I'm so proud of you for keeping this up. Day {{streak_length}} is no joke! 💙"
4. "Tough day? A walk might help clear your head. I'll be with you."
5. "You've got this! {{steps_remaining}} steps, then you can relax knowing you crushed it."

**The Educator (50 messages):**
1. "Walking {{daily_goal}} steps reduces type 2 diabetes risk by 39%. You're investing in your health."
2. "Your {{streak_length}}-day consistency has improved cardiovascular function and reduced inflammation."
3. "Morning walks boost productivity by 23% and improve mood for 12+ hours. Time to capitalize."
4. "You're {{steps_remaining}} steps from hitting your goal. That's {{calories_burned}} calories burned."
5. "Consistency matters more than intensity. Your {{streak_length}}-day streak proves you understand this."

**The Cheerleader (50 messages):**
1. "GOOD MORNING SUPERSTAR! ☀️ Let's make today AMAZING! Day {{streak_length + 1}} incoming! 🎉"
2. "OMG YOU'RE SO CLOSE! {{steps_remaining}} steps?! YOU'VE GOT THIS! 💪🔥"
3. "Day {{streak_length}}!!! I'M SO PROUD OF YOU! You're absolutely CRUSHING it! 🌟"
4. "YES YES YES! You hit your goal! I KNEW YOU COULD DO IT! 🎊"
5. "Happy {{day_of_week}}! Let's make it LEGENDARY! 🚀"

**The Challenger (50 messages):**
1. "{{steps_yesterday}} steps yesterday. Think you can beat it? Doubt it, but go ahead and try."
2. "Day {{streak_length}}. Not bad. But can you make it to {{milestone_next}}?"
3. "{{steps_remaining}} steps left. Most people would quit here. You gonna be most people?"
4. "Your neighbor walked {{neighbor_steps}} steps. You really gonna let that slide?"
5. "Oh, you hit your goal? Cute. Tomorrow, try {{daily_goal * 1.5}}. Unless you can't handle it."

**The Sage (50 messages):**
1. "Each step is a meditation. Your {{streak_length}}-day journey reflects your commitment to presence."
2. "Walking is a gift to your future self. Thank you for showing up today."
3. "The path of wellness is walked one day at a time. You are {{streak_length}} days into your journey."
4. "Movement is medicine for the body and soul. {{steps_remaining}} steps remain in today's practice."
5. "In walking, we find clarity. In streaks, we find discipline. In both, we find peace."

**The Pessimist (50 messages):**
1. "Day {{streak_length}}. Statistically, you'll quit by day {{streak_length + 3}}. Prove me wrong."
2. "Oh look, it's {{weather}}. Perfect excuse to break your streak. I'm sure you'll take it."
3. "{{steps_remaining}} steps left. You'll probably blow it like last time. But sure, give it a shot."
4. "You actually did it? Huh. Color me surprised. Don't get cocky."
5. "Day {{streak_length}} of pretending you're a fitness person. How long can you keep this charade up?"

---

## Design Specifications

### Visual Design Principles

1. **Personality-Forward:** Each persona has distinct visual identity (color, avatar style)
2. **Warm & Approachable:** Avoid aggressive fitness aesthetics
3. **Clean & Minimal:** Focus on streak and progress, not overwhelming data
4. **Mobile-First:** Optimize for mobile browser first, then desktop
5. **Accessible:** WCAG 2.1 AA compliant

### Color Palette

**Brand Colors:**
- Primary: `#6366F1` (Indigo) - Main CTAs, active states
- Secondary: `#8B5CF6` (Purple) - Accents, secondary CTAs
- Neutral Dark: `#1F2937` (Gray 800) - Text
- Neutral Light: `#F3F4F6` (Gray 100) - Backgrounds

**Persona Colors:**
- Companion: `#F97316` (Warm Orange)
- Educator: `#3B82F6` (Deep Blue)
- Cheerleader: `#EC4899` (Bright Pink)
- Challenger: `#EF4444` (Bold Red)
- Sage: `#10B981` (Calming Green)
- Pessimist: `#6B7280` (Dark Gray)

**Status Colors:**
- Success: `#10B981` (Green) - Goal completed
- Warning: `#F59E0B` (Yellow) - Partial progress
- Error: `#EF4444` (Red) - Missed day
- Info: `#3B82F6` (Blue) - Streak freeze

### Typography

**Font Stack:**
- Headings: `Inter` or `Poppins` (bold, clean)
- Body: `Inter` or `System UI` (readable, modern)

**Sizes:**
- H1: 3rem (48px) - Hero headline
- H2: 2rem (32px) - Section titles
- H3: 1.5rem (24px) - Card titles
- Body: 1rem (16px)
- Small: 0.875rem (14px)

### Persona Avatars

**Style:** 
- Illustrated icons (not photos)
- Consistent art style across all 6
- Circular frames
- Distinct color backgrounds matching persona color

**Suggested Tools:**
- Design in Figma or use Midjourney/DALL-E for initial concepts
- Export as SVG for scalability

### Animations

**Key Animations:**
- Streak counter incrementing (count-up animation)
- Progress bar filling (smooth transition)
- Confetti on milestone celebrations (canvas or library like react-confetti)
- Notification card slide-in from top
- Quiz progress bar advancement
- Persona card flip/hover effects

**Performance:**
- Use CSS transforms (not width/height) for smooth 60fps
- Leverage Framer Motion for React animations
- Preload critical assets

---

## Success Metrics for MVP

### Primary Metrics (Must Measure)

1. **Quiz Completion Rate**
   - Target: >70%
   - Measures: How engaging/clear the quiz is

2. **Demo Engagement**
   - Time in demo: Target >3 minutes
   - "Get Motivation" clicks: Target >3 per session
   - Persona weight adjustments: Track % of users who customize

3. **Waitlist Conversion**
   - Target: >20% of quiz completers join waitlist
   - Email capture rate from total visitors: >10%

4. **Shareability**
   - Quiz result shares: Target >5%
   - Social shares of demo or notifications

5. **Qualitative Feedback**
   - User testing comments: "Which persona did you like most?"
   - Net Promoter Score (NPS): "Would you use this app?" (1-10 scale)

### Secondary Metrics

6. Landing page bounce rate (target <60%)
7. Average session duration
8. Mobile vs. desktop usage split
9. Settings engagement (how many users explore settings?)
10. Retake quiz rate

### Feedback Collection

**Built-In Feedback Mechanisms:**
- End-of-demo survey (optional): 3 questions
  - "Which persona resonated most with you?"
  - "Would you download this app?" (Yes/No/Maybe)
  - "Any feedback or suggestions?"

**User Testing (5-10 people):**
- Watch them use the demo (no guidance)
- Ask:
  - "What did you think of the personas?"
  - "Which messages made you laugh or feel motivated?"
  - "Would this keep you walking consistently?"
  - "Any confusion or frustration?"

---

## Development Timeline

### Week 1: Foundation & Landing

**Days 1-2: Project Setup**
- Initialize Vite + React + TypeScript project
- Set up TailwindCSS and component library
- Create file structure and routing
- Set up GitHub repo and Vercel deployment

**Days 3-5: Landing Page**
- Build all landing page sections
- Implement responsive design
- Add smooth scrolling and animations
- Create persona intro cards
- Polish copy and CTAs

**Days 6-7: Quiz Development**
- Build quiz question components
- Implement quiz logic and scoring
- Create progress indicator
- Test all question flows

### Week 2: Results, Demo & Polish

**Days 8-9: Quiz Results & Persona Showcase**
- Results visualization (chart/percentages)
- Persona showcase with expandable cards
- Share functionality (image generation or link)
- Transition to demo

**Days 10-12: Demo Experience**
- Build home screen with streak counter
- Implement step entry modal
- Create "Get Motivation" notification generator
- Build calendar view with demo data
- Personas tab with sliders
- Settings tab

**Days 13-14: Polish & Testing**
- Add all animations (confetti, transitions)
- Implement analytics tracking
- Waitlist form integration
- Cross-browser testing (Chrome, Safari, Firefox, mobile)
- Accessibility audit (keyboard navigation, screen reader)
- Performance optimization (Lighthouse score >90)
- Bug fixes

**Day 15: Deploy & Launch**
- Production deploy to Vercel/Netlify
- Custom domain setup
- Social sharing meta tags
- Submit to Product Hunt (optional)
- Share with beta testers

---

## Post-MVP Next Steps

### Validation Outcomes

**If validation is POSITIVE (>20% waitlist conversion, strong feedback):**
1. Begin mobile app development (React Native)
2. Generate full 300+ message library with AI assistance
3. Build backend infrastructure (user accounts, cloud sync)
4. Design production-ready UI/UX
5. Plan beta launch timeline

**If validation is MIXED (10-20% conversion, some concerns):**
1. Conduct deeper user interviews
2. Iterate on personas (remove/add/refine)
3. Test different messaging styles
4. A/B test quiz questions
5. Revisit value proposition

**If validation is NEGATIVE (<10% conversion, poor feedback):**
1. Pivot: Consider different differentiator (not personas)
2. Research: What DID resonate?
3. Simplify: Maybe just 2-3 personas instead of 6?
4. Alternative: Partner with existing app instead of building new one

### Key Questions to Answer

After 100+ demo users:
- [ ] Which personas are most popular? (Should we drop any?)
- [ ] Do users actually adjust persona weights, or stick with quiz results?
- [ ] Which messages get the best reactions? (Funny, motivational, factual?)
- [ ] Is the streak freeze concept clear and appealing?
- [ ] Do people understand the privacy angle? Does it matter to them?
- [ ] What concerns or objections do people have?
- [ ] Would people actually pay $6.99-9.99/month for this?

---

## Technical Considerations

### Performance Targets

- **Lighthouse Score:** >90 (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Page weight:** <2MB total

### Browser Compatibility

- Chrome/Edge: Latest 2 versions
- Safari: Latest 2 versions (iOS and macOS)
- Firefox: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Android 90+

### Accessibility Requirements

- Keyboard navigation fully functional
- Screen reader compatible (test with VoiceOver/NVDA)
- Color contrast ratios meet WCAG AA
- Alt text for all images
- ARIA labels where appropriate
- Focus indicators visible

### SEO Considerations

- Semantic HTML structure
- Meta tags (title, description, Open Graph, Twitter Card)
- Structured data for rich results
- Sitemap.xml
- Robots.txt

### Analytics Privacy

- Use privacy-focused analytics (Plausible/Fathom)
- No cookies required
- No personal data collection
- Clear opt-out mechanism
- GDPR compliant

---

## Resources Needed

### Design Assets

- [ ] 6 persona avatars (illustrated icons)
- [ ] App logo and favicon
- [ ] Social sharing image (Open Graph)
- [ ] Icons for UI (steps, streaks, settings, etc.)
- [ ] Illustrations for landing page (optional)

**Tools:**
- Figma (design mockups)
- Midjourney or DALL-E (avatar generation starting point)
- Heroicons or Lucide (icon library)

### Copy & Content

- [ ] Landing page copy (headlines, descriptions)
- [ ] Privacy policy (simple, plain English)
- [ ] Terms of service (optional for demo)
- [ ] Error messages and empty states
- [ ] Loading states text

**Generation:**
- Use Claude or ChatGPT to help draft persona messages
- Get feedback on tone and voice
- A/B test different message styles

### Development Tools

- VS Code or Cursor
- GitHub for version control
- Vercel or Netlify for hosting
- ConvertKit/Mailchimp for email list
- Plausible for analytics

---

## Risk Mitigation

### Risk 1: Quiz feels too long or boring
**Mitigation:**
- Keep to 7 questions max
- Make questions scenario-based (engaging, not clinical)
- Add progress indicator
- Allow "Back" button to revise answers

### Risk 2: Personas feel gimmicky
**Mitigation:**
- High-quality message writing (not generic)
- Test messages with 10+ people before launch
- Show variety in showcase (each persona has range)
- Make examples funny/memorable

### Risk 3: Demo doesn't communicate real app value
**Mitigation:**
- Add "This is just a taste" messaging
- Include animations and celebrations (make it feel alive)
- Context-aware messages (show personalization working)
- Clear "Coming to mobile soon" CTAs

### Risk 4: Low waitlist conversion
**Mitigation:**
- A/B test CTA placement and copy
- Offer incentive: "Early access for first 1,000 signups"
- Make sharing easy and rewarding
- Follow up: "Thanks for signing up—here's what's next"

### Risk 5: Technical issues (bugs, slow load)
**Mitigation:**
- Test thoroughly on multiple devices/browsers
- Use error boundaries in React
- Implement loading states for all async actions
- Monitor with Sentry for error tracking

---

## Open Questions

- [ ] Should we include a "dark mode" toggle? (Nice-to-have)
- [ ] Should demo data be randomized per user, or consistent? (Leaning consistent for easier demo)
- [ ] Should we show ads in the demo (freemium model preview)? (No - keep it clean)
- [ ] Should we include a "refer a friend" mechanism? (Yes - drives growth)
- [ ] How much should we spend on paid ads to drive traffic to demo? (Start with $0, test organic first)

---

## Appendix: Example User Journey

### Sarah's Experience (Target User)

**1. Discovery (2 minutes on landing page)**
- Sarah sees a Twitter post: "This walking app has 6 AI personalities and it's hilarious"
- Clicks link, lands on demo site
- Reads headline: "Your Walking Buddy Has Six Personalities"
- Intrigued: "Okay this sounds different"
- Scrolls, sees persona names: "Wait, there's a Pessimist? I need to see this"
- Clicks "Take the Motivation Quiz"

**2. Quiz (2-3 minutes)**
- Intro: "Let's figure out what actually motivates you"
- Answers 7 questions, relating to scenarios
- Likes the humor in options
- Clicks submit

**3. Results (1-2 minutes)**
- Sees results: "You're 40% Companion, 25% Cheerleader, 20% Educator, 10% Sage, 5% Pessimist, 0% Challenger"
- Reads: "You're driven by Companion energy—supportive encouragement works best for you"
- Thinks: "Huh, that's accurate"
- Scrolls to see example messages from Companion
- Laughs at Pessimist example even though it's not her top persona
- Screenshots results to send to friend
- Clicks "See It In Action"

**4. Demo (5+ minutes)**
- Lands on demo home screen
- Sees "18 Day Streak 🔥" - thinks "That's cool, I want that"
- Sees progress bar: 6,247 / 7,000 steps (89%)
- Clicks "Get Motivation" button
- Gets Companion message: "Hey friend! You're SO close! 753 steps = 8 minutes. You've got this! 💙"
- Smiles: "Okay that's cute"
- Clicks again: Gets Cheerleader message: "OMG 753 STEPS LEFT! YOU'RE CRUSHING IT!"
- Laughs out loud
- Clicks again: Gets Pessimist: "753 steps. You'll probably blow it by staying on this demo instead of actually walking."
- "OKAY I love this"
- Explores calendar view, sees streak history
- Goes to Personas tab, adjusts sliders (increases Pessimist to 20%)
- Clicks "Get Motivation" hoping for more Pessimist
- Gets one, screenshots it
- Opens Settings, sets daily goal to 8,000

**5. Conversion (30 seconds)**
- Sees "Join Waitlist" CTA
- Thinks: "I would actually use this"
- Enters email
- Shares on Twitter: "Just tried this walking app demo with AI personas and I'm obsessed. The Pessimist one is chef's kiss 👌"

**Total time:** 10-12 minutes  
**Outcome:** Waitlist signup + social share = SUCCESS

---

## Summary

This MVP is designed to validate the core hypothesis: **AI personas make walking motivation more engaging and effective than generic fitness apps.** By building a web-based demo instead of a full mobile app, we can:

1. ✅ Test the concept in 2 weeks instead of 3 months
2. ✅ Get feedback from 100+ users before investing in mobile development
3. ✅ Iterate rapidly based on what resonates
4. ✅ Build a waitlist for launch
5. ✅ Create shareable content for organic growth

**If the demo validates the concept (>20% waitlist conversion), we proceed to full mobile app development. If not, we pivot or refine based on feedback.**

---

## Document Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 11, 2026 | Preston Vance | Initial MVP specification |

---

**Next Actions:**
1. [ ] Review and approve MVP scope
2. [ ] Set up development environment
3. [ ] Create Figma mockups (optional but recommended)
4. [ ] Begin Week 1 development
5. [ ] Schedule user testing sessions for Week 2
