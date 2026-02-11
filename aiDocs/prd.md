# Product Requirements Document (PRD)
## Walki - AI-Powered Walking Streak Companion

**Version:** 1.0  
**Date:** February 11, 2026  
**Status:** Draft  
**Author:** Preston Vance

---

## Executive Summary

Walki is a privacy-first mobile walking app that uses AI-powered personas to help users maintain daily walking streaks through personalized motivational notifications. Unlike generic fitness apps, Walki adapts to each user's unique motivation style through an engaging onboarding quiz, then delivers varied emotional messaging from six distinct AI personas to prevent notification fatigue and maximize long-term engagement.

**Target:** Women 25-49 averaging 5,000-7,000 steps/day who want consistency without aggressive fitness culture  
**Differentiator:** AI-powered motivational personas + privacy-first positioning  
**Platform:** Cross-platform mobile (React Native)  
**Business Model:** Freemium with premium subscription ($6.99-9.99/month)

---

## Problem Statement

### The Market Gap

**85% of health app users track steps**, but existing solutions fail to maintain user engagement:
- **Generic apps** (Apple Health, Google Fit) are passive and don't motivate
- **Hardcore apps** (Strava) alienate casual users with competitive culture
- **Gamified apps** (CashWalk) offer financial rewards but lack emotional connection
- **Industry retention is abysmal:** Only 8-12% of users remain active after 30 days

### User Pain Points

1. **Motivation inconsistency:** What motivates users changes day-to-day (encouragement vs. facts vs. accountability)
2. **Notification fatigue:** One-note messaging becomes annoying, leading users to disable notifications
3. **Privacy concerns:** 80% of fitness apps sell user data to third parties
4. **Streak anxiety:** Breaking a streak feels devastating with no path to recovery
5. **Lack of personality:** Existing apps feel robotic and impersonal

### The Opportunity

**Market size:** $13.81B in 2026, growing to $45.45B by 2035 (14.15% CAGR)  
**White space:** No major competitor offers AI-powered motivational personas  
**Proven mechanics:** CashWalk achieves 31% retention with gamification; AI personalization can boost retention by 50%  
**User demand:** Emotional messages are 18% more effective than logical ones for fitness adherence

---

## Solution Overview

### Product Vision

"The only walking app that truly understands what motivates YOU, with AI personas that keep your streak alive without selling your data to advertisers."

### Core Value Propositions

1. **Personalized Motivation:** Six distinct AI personas deliver varied messaging based on user's motivation profile
2. **Streak Psychology:** Smart streak tracking with recovery mechanisms to prevent churn
3. **Privacy-First:** Zero data sharing, local-first architecture, transparent data practices
4. **Adaptive Timing:** Notifications vary within morning/evening windows to feel spontaneous, not robotic
5. **Low Friction:** Works with built-in phone step tracking (no wearables required)

---

## Target Audience

### Primary Persona: "Consistent Sarah"

**Demographics:**
- Female, 28-42 years old
- Works from home or hybrid schedule
- College-educated, middle income
- Urban/suburban location

**Behavioral:**
- Currently walks 5,000-7,000 steps/day (inconsistently)
- Has downloaded 2-3 fitness apps before but abandoned them
- Values health but not obsessed with fitness metrics
- Responds to emotional connection over data/competition
- Privacy-conscious (uses ad blockers, careful with app permissions)

**Motivations:**
- Wants to build a consistent walking habit
- Desires external accountability without judgment
- Appreciates personality and humor in apps
- Willing to pay for quality experiences that respect her privacy

**Goals:**
- Reach 7,000+ steps daily
- Maintain multi-week streaks
- Feel good about physical activity without pressure

### Secondary Persona: "Recovery Rachel"

**Demographics:**
- Female, 32-50 years old
- Sedentary job, previously more active
- May be managing health conditions or recovery

**Behavioral:**
- Currently walks 3,000-5,000 steps/day
- Doctor recommended increasing activity
- Intimidated by fitness culture
- Needs gentle accountability

---

## Competitive Landscape

### Direct Competitors

| App | Strengths | Weaknesses | Our Advantage |
|-----|-----------|------------|---------------|
| **Pacer** | Clean UI, social features | Generic notifications, passive | AI personas, emotional messaging |
| **CashWalk** | 31% retention, rewards | Privacy concerns, transactional | Privacy-first, intrinsic motivation |
| **Strava** | Strong community, tracking | Too hardcore for casuals | Approachable, variety of motivation |
| **Google Fit / Apple Health** | Built-in, free | Completely passive | Active motivation, personality |
| **Sweatcoin** | Gamification, rewards | Data sharing, gimmicky | Genuine emotional connection |

### Competitive Advantages

1. **AI Persona Differentiation:** No competitor offers multiple AI personalities adapting to user motivation
2. **Privacy Positioning:** 80% of competitors share data; we don't
3. **Emotional Messaging:** Research shows 18% more effective than logical/data-driven approaches
4. **Varied Timing:** Prevents the "robotic notification" feel
5. **Shareability:** Persona quiz and funny notifications create word-of-mouth growth

---

## Product Features

### Phase 1: MVP (Months 1-3)

#### 1.1 Core Features (Must-Have)

**Onboarding & Motivation Quiz**
- 5-7 question interactive quiz to determine motivation profile
- Scenario-based questions (not direct "what motivates you?")
- Results show persona weightings (e.g., 40% Cheerleader, 30% Educator, 20% Companion, 10% Challenger)
- Shareable results screen (social growth mechanism)
- Can retake quiz anytime

**Step Tracking**
- Integrates with Apple HealthKit (iOS) and Google Fit (Android)
- Manual step entry as fallback
- Daily goal setting (default: 7,000 steps, customizable 3,000-20,000)
- Real-time step count display
- Historical data view (last 7/30/90 days)

**Streak System**
- Calendar view showing active streak
- Streak counter prominently displayed on home screen
- "Close call" indicator when day is almost over
- Streak milestone celebrations (7, 14, 30, 60, 100 days)
- **Streak recovery mechanism:** 1 "freeze" per week (can miss a day without breaking streak)

**AI Persona Notifications**
- **6 Personas:**
  - **The Companion:** Friendly, supportive, like a walking buddy
  - **The Educator:** Health facts, benefits, science-backed motivation
  - **The Cheerleader:** Enthusiastic, peppy, high-energy encouragement
  - **The Challenger:** Competitive, provocative, pushes boundaries
  - **The Sage:** Wise, mindful, focuses on holistic wellness
  - **The Pessimist:** Doom-and-gloom, reverse psychology, darkly humorous

- **Notification Timing:**
  - Morning notifications: Random time between 7:30 AM - 10:00 AM
  - Evening notifications: Random time between 5:00 PM - 8:00 PM
  - User can customize notification windows
  - Smart throttling: Max 2 notifications per day
  - Respects system Do Not Disturb

- **Message Selection Logic:**
  - Weighted by quiz results (e.g., if user is 40% Cheerleader, 40% of notifications come from that persona)
  - Context-aware: Injects current streak length, step count, weather, day of week
  - Rotation prevents seeing same message twice within 30 days
  - Pre-generated library of 50+ messages per persona (300+ total)

**Privacy Controls**
- All data stored locally on device
- Optional cloud backup (encrypted, user-controlled)
- No third-party analytics or tracking
- No data sharing or selling
- Transparent privacy policy (plain English)
- Easy data export and deletion

#### 1.2 Core User Flows

**First-Time User Flow:**
1. Download app → Welcome screen
2. Permission requests (step tracking, notifications) with clear explanations
3. Motivation quiz (5-7 questions, ~2 minutes)
4. Results screen showing persona weightings (shareable)
5. Set daily step goal
6. Tutorial: "Here's how streaks work" (skippable)
7. Home screen ready to track

**Daily User Flow:**
1. User opens app OR receives notification
2. See current step count and streak status
3. Visual progress bar toward daily goal
4. Calendar view shows streak history
5. Tap to see today's route/activity (if available)

**Notification Interaction Flow:**
1. Receive notification from persona (e.g., "The Challenger: You really gonna let yesterday's 8,000 steps be your peak?")
2. Tap notification → Opens app to home screen
3. See current progress
4. (Optional) User goes for walk
5. App automatically updates when goal reached

**Streak Break Recovery Flow:**
1. User misses a day
2. App detects streak would break
3. Shows option: "Use your weekly freeze?" (if available)
4. If used: Streak continues, freeze count decrements
5. If not: Streak resets, encouraging message from Companion persona
6. New streak starts immediately (no punishment mechanic)

#### 1.3 Technical Architecture

**Frontend: React Native**
- Expo for faster development and easier deployment
- React Navigation for routing
- Async Storage for local data persistence
- React Native Push Notifications for messaging
- React Native Health (iOS) / Google Fit API (Android) for step tracking

**Backend: Minimal (Phase 1)**
- Firebase for optional cloud backup
- No real-time AI calls (pre-generated messages)
- Simple authentication (email/password, Apple Sign-In, Google Sign-In)

**Data Storage:**
- Local-first architecture
- SQLite for structured data (steps, streaks, settings)
- JSON files for notification library
- Optional Firebase sync for cloud backup

**Notification System:**
- Local scheduled notifications (not server-triggered)
- Smart scheduling algorithm runs daily at midnight
- Picks 2 notifications for next day based on:
  - User's persona weights
  - Time since last use
  - Streak status (at risk vs. healthy)
  - Message history (no repeats)

**Message Template System:**
```json
{
  "persona": "the_cheerleader",
  "variants": [
    {
      "id": "cheerleader_001",
      "template": "Hey superstar! You're on a {{streak_length}}-day streak! Let's make it {{streak_length + 1}} today! 🎉",
      "context_required": ["streak_length"],
      "tags": ["streak_milestone", "morning", "positive"]
    }
  ]
}
```

#### 1.4 UI/UX Requirements

**Design Principles:**
- **Personality-forward:** Each persona has visual representation (avatar, color scheme)
- **Streak-centric:** Streak counter is hero element on home screen
- **Minimalist:** No overwhelming data/charts; focus on daily goal
- **Delightful:** Micro-animations for milestone celebrations
- **Accessible:** WCAG 2.1 AA compliant, VoiceOver/TalkBack support

**Key Screens:**
1. **Home Screen:** Large streak counter, daily progress bar, current steps, quick-access settings
2. **Calendar View:** Visual streak history (colored dots for completed days)
3. **Personas Screen:** Meet your coaches, see message examples, adjust weights
4. **Settings:** Notification timing, step goal, privacy controls, quiz retake
5. **Milestones:** Achievement history, streak records, total steps walked

**Visual Identity:**
- Modern, warm color palette (avoid aggressive fitness aesthetics)
- Playful but professional
- Each persona has signature color and illustration style
- Custom iconography

---

### Phase 2: Enhanced Features (Months 4-6)

#### 2.1 Feature Additions

**Smart Notification Optimization**
- A/B test notification timing and persona mix
- Machine learning for optimal send times (based on when user actually walks)
- Response tracking: Which personas drive most engagement?

**Enhanced Streak Mechanics**
- Streak leaderboard (opt-in, anonymous)
- Streak recovery "challenges" (e.g., "Double steps tomorrow to save your streak")
- Streak stats: longest streak, current streak, total days walked

**Social Features (Minimal)**
- Invite friends for parallel streaks (not competitive)
- Send persona messages to friends
- Shared milestones (e.g., "You and Sarah both hit 30 days!")

**Premium Features**
- Unlimited streak freezes (free users: 1/week)
- Exclusive personas (The Comedian, The Philosopher)
- Advanced analytics (weekly reports, trends)
- Custom notification frequency
- Priority support

**Widgets**
- iOS/Android home screen widgets showing streak and daily progress
- Lock screen widgets for quick check-ins

#### 2.2 Monetization Strategy

**Free Tier:**
- All 6 base personas
- Unlimited step tracking
- Streak tracking with 1 freeze per week
- 2 notifications per day
- Basic privacy protections

**Premium Tier ($6.99-9.99/month or $59.99-79.99/year):**
- 2 additional exclusive personas
- Unlimited streak freezes
- Advanced analytics and insights
- Customizable notification frequency (1-4 per day)
- Ad-free experience
- Export data in multiple formats
- Early access to new features

**Revenue Projections (Based on Market Research):**
- Target: 10,000 active users by Month 6
- 15% retention at Day 30 = 1,500 retained users
- 5% conversion to premium = 75 paying users
- Monthly revenue: $524-749 (at $6.99-9.99/month)
- Annual projection (scaling to 50K users): $262K-375K

---

## Success Metrics

### Primary KPIs (Must Track)

**Acquisition:**
- Daily/weekly/monthly app downloads
- Source tracking (organic, referral, paid)
- Cost per install (target: $10-20)

**Activation:**
- Quiz completion rate (target: >80%)
- Notification permission grant rate (target: >60%)
- Step tracking setup success (target: >90%)

**Engagement:**
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- DAU/MAU ratio (target: >30%)
- Average session length
- Sessions per user per week

**Retention (MOST CRITICAL):**
- Day 1 retention (target: >40%)
- Day 7 retention (target: >25%)
- **Day 30 retention (target: >20%)**
- Day 90 retention (target: >15%)
- Cohort analysis by acquisition channel

**Streak Metrics:**
- Average streak length
- Percentage of users with 7+ day streak
- Percentage of users with 30+ day streak
- Streak freeze usage rate
- Streak break recovery rate

**Notification Performance:**
- Notification open rate (target: >25%)
- Notification dismissal rate
- Time-to-action after notification
- Persona preference distribution
- Most engaging persona (by open rate)

**Monetization:**
- Free-to-paid conversion rate (target: 5-7%)
- Monthly Recurring Revenue (MRR)
- Lifetime Value (LTV) per user
- LTV:CAC ratio (target: >3:1)
- Churn rate for premium users

### Secondary KPIs

- Quiz share rate (indicates viral potential)
- Average steps per day per user
- Goal achievement rate
- Settings engagement (persona weight adjustments)
- Support ticket volume
- App store rating and reviews

---

## Technical Requirements

### Performance Requirements

- App launch time: <2 seconds
- Step count sync latency: <5 seconds
- Notification delivery: Within 5 minutes of scheduled time
- UI responsiveness: 60 FPS on mid-range devices
- Offline functionality: All core features work without internet

### Platform Requirements

**iOS:**
- Minimum: iOS 14+
- Target devices: iPhone 8 and newer
- HealthKit integration required
- Apple Sign-In required

**Android:**
- Minimum: Android 8.0 (API 26)
- Target devices: Mid-range and flagship
- Google Fit API integration
- Play Services required

### Security & Privacy Requirements

- All personal data encrypted at rest
- Secure cloud backup (optional, AES-256)
- No third-party SDKs with tracking
- GDPR compliant
- CCPA compliant
- Clear consent mechanisms
- Easy data deletion (within 24 hours)

### Accessibility Requirements

- VoiceOver/TalkBack full support
- Dynamic text sizing
- High contrast mode
- Color-blind friendly palette
- Keyboard navigation (Android)

---

## Go-To-Market Strategy

### Phase 1: Beta Launch (Months 3-4)

**Target:** 500-1,000 beta users via:
- Friends and family (initial 50)
- Product Hunt "Ship" page
- Reddit communities (r/walking, r/fitness, r/getdisciplined)
- Beta testing platforms (TestFlight, Google Play Beta)

**Goals:**
- Validate retention targets (>20% Day 30)
- Identify bugs and UX friction
- Gather qualitative feedback on personas
- Test notification timing and frequency

### Phase 2: Public Launch (Month 5)

**Channels:**
- Product Hunt launch (aim for top 5 of day)
- App Store and Google Play featuring (submit for consideration)
- Press outreach (TechCrunch, The Verge, health/wellness blogs)
- Social media (Twitter, Instagram, TikTok with persona examples)
- Content marketing (blog posts on walking benefits, motivation psychology)

**Launch Hook:** "The Walking App With 6 AI Personalities (And Actually Respects Your Privacy)"

**Budget:** $5,000-10,000 for initial paid acquisition testing

### Phase 3: Growth (Months 6-12)

**Organic Channels:**
- App Store Optimization (ASO)
- Content SEO (walking tips, health benefits)
- User-generated content (encourage quiz result sharing)
- PR and media coverage
- Partnerships with health/wellness influencers

**Paid Channels:**
- Facebook/Instagram ads (target: women 25-45, health interests)
- Google App Campaigns
- TikTok ads (persona video content)

**Viral Mechanics:**
- Shareable quiz results
- Funny notification screenshots
- Friend invites with benefits

---

## Development Roadmap

### Month 1: Foundation
**Weeks 1-2:**
- Project setup (React Native, Expo, repo structure)
- Basic navigation and screen scaffolding
- Step tracking integration (HealthKit/Google Fit)
- Local storage setup (SQLite)

**Weeks 3-4:**
- Streak calculation logic
- Calendar UI component
- Home screen UI with progress tracking
- Basic notification scheduling system

### Month 2: Core Features
**Weeks 5-6:**
- Motivation quiz development (questions, logic, results)
- Persona system architecture
- Notification message library (generate 300+ messages)
- Message selection algorithm

**Weeks 7-8:**
- Notification delivery and timing logic
- Settings screen and controls
- Privacy policy and data management
- Onboarding flow

### Month 3: Polish & Beta
**Weeks 9-10:**
- UI/UX refinement and animations
- Accessibility improvements
- Testing (unit, integration, E2E)
- Bug fixes

**Weeks 11-12:**
- Beta build deployment (TestFlight, Play Beta)
- Beta user onboarding
- Analytics integration (privacy-compliant)
- Feedback collection mechanisms

### Month 4: Beta Period & Iteration
- Monitor beta metrics daily
- Weekly user interviews
- Rapid iteration on identified issues
- A/B test notification timing and personas

### Month 5: Public Launch Prep
- Final polish based on beta feedback
- App store listing optimization
- Marketing materials creation
- Press kit development
- Launch day coordination

### Month 6: Launch & Initial Growth
- Public launch (Product Hunt, press, social)
- Monitor crash reports and user feedback
- Daily metrics review
- Rapid bug fixes
- Community management

---

## Risk Assessment & Mitigation

### Critical Risks

**Risk 1: Retention Falls Below 15% at Day 30**
- **Impact:** High (breaks unit economics)
- **Likelihood:** Medium
- **Mitigation:** 
  - Build retention mechanics from Day 1 (not bolted on later)
  - Weekly user interviews during beta
  - A/B test notification frequency and timing
  - Implement streak recovery mechanisms early

**Risk 2: Notification Permissions <50%**
- **Impact:** High (entire value prop depends on notifications)
- **Likelihood:** Medium
- **Mitigation:**
  - Explain notification value clearly during onboarding
  - Show example notifications before asking permission
  - Implement in-app notifications as fallback
  - Educate users on managing notification preferences

**Risk 3: Personas Feel Gimmicky or Annoying**
- **Impact:** High (core differentiator fails)
- **Likelihood:** Medium
- **Mitigation:**
  - Extensive message testing with target users
  - Quality over quantity (fewer, better messages)
  - Easy persona weight adjustment
  - "Mute persona" option per persona
  - Monitor which personas drive engagement vs. dismissals

**Risk 4: Step Tracking Accuracy Issues**
- **Impact:** Medium (user trust eroded)
- **Likelihood:** Medium
- **Mitigation:**
  - Rely on native APIs (HealthKit/Google Fit)
  - Allow manual correction
  - Set expectations clearly (phone tracking has limitations)
  - Don't over-promise accuracy

**Risk 5: Slow User Growth**
- **Impact:** Medium (delays path to profitability)
- **Likelihood:** High (common for new apps)
- **Mitigation:**
  - Build viral mechanics (shareable quiz)
  - Focus on retention over acquisition initially
  - Create word-of-mouth through delightful experience
  - Prepare paid acquisition budget based on proven LTV

### Technical Risks

**Risk 6: React Native Performance Issues**
- **Impact:** Medium (affects UX)
- **Likelihood:** Low-Medium
- **Mitigation:**
  - Profile and optimize early
  - Use native modules for critical paths
  - Test on low-end devices
  - Consider selective native implementations

**Risk 7: Notification Delivery Inconsistency**
- **Impact:** High (breaks core experience)
- **Likelihood:** Medium (OS restrictions vary)
- **Mitigation:**
  - Test across devices and OS versions
  - Implement fallback mechanisms
  - Educate users on battery optimization settings
  - Monitor delivery rates via analytics

---

## Open Questions & Decisions Needed

### Product Decisions
- [ ] Should we allow users to fully disable certain personas, or always maintain variety?
- [ ] What happens after 100-day streak? New milestone system?
- [ ] Should we show ads in free tier, or purely rely on premium conversion?
- [ ] Friend/social features in Phase 1 or Phase 2?

### Technical Decisions
- [ ] Firebase vs. custom backend for cloud sync?
- [ ] Analytics platform (amplitude, Mixpanel, PostHog)?
- [ ] Error tracking (Sentry, Bugsnag)?
- [ ] A/B testing framework?

### Business Decisions
- [ ] Entity formation (LLC, C-corp)?
- [ ] Pricing: $6.99 or $9.99? Annual discount percentage?
- [ ] Premium trial period: 7 days or 14 days?
- [ ] Launch market: US-only or global?

---

## Appendix

### A. Persona Descriptions & Examples

**The Companion**
- **Voice:** Friendly, supportive, warm
- **Motivation Style:** Emotional support, companionship
- **Example:** "Hey friend! Just checking in—you've been crushing it with that 12-day streak. Want to keep it going together today?"

**The Educator**
- **Voice:** Informative, fact-based, authoritative
- **Motivation Style:** Knowledge and health benefits
- **Example:** "Did you know? Just 7,000 steps daily reduces cardiovascular disease risk by 51%. You're literally adding healthy years to your life."

**The Cheerleader**
- **Voice:** Enthusiastic, energetic, positive
- **Motivation Style:** Pure encouragement
- **Example:** "YES YES YES! You're absolutely CRUSHING it! That 5-day streak is just the beginning—let's goooo! 🎉"

**The Challenger**
- **Voice:** Provocative, competitive, direct
- **Motivation Style:** Competition and pushing limits
- **Example:** "5,842 steps yesterday? That's cute. I bet you can't hit 8,000 today. Prove me wrong."

**The Sage**
- **Voice:** Calm, wise, philosophical
- **Motivation Style:** Mindfulness and holistic wellness
- **Example:** "Walking is meditation in motion. Each step grounds you in the present moment. Your 8-day streak is a testament to your commitment to inner peace."

**The Pessimist**
- **Voice:** Dark humor, reverse psychology, doom-and-gloom
- **Motivation Style:** Fear of loss, humor
- **Example:** "Well, well. Day 3 of your streak. Statistically, you'll probably quit by tomorrow like everyone else. But hey, maybe you'll surprise us both."

### B. Quiz Question Examples

**Question 1: Scenario-Based**
"It's 8 PM. You're 2,000 steps short of your goal. What gets you off the couch?"
- A) A friend texting "Let's walk together!"
- B) Remembering your doctor said you need more cardio
- C) Seeing you'd break a 10-day streak
- D) Thinking "I'm better than this laziness"

**Question 2: Response Style**
"You just completed a tough week of daily walks. What message would make you smile?"
- A) "You're amazing! I'm so proud of you!"
- B) "7 days of walking = 14% lower risk of depression"
- C) "Bet you can't make it to 14 days though..."
- D) "Your body and mind thank you for this consistency"

**Question 3: Motivation Driver**
"Why do you want to walk more?"
- A) To feel good and have energy
- B) For specific health benefits
- C) To prove to myself I can stick with something
- D) To clear my mind and reduce stress

### C. Privacy Policy Key Points

- **What We Collect:** Step count, streak data, notification preferences, quiz results
- **What We Don't Collect:** Location data (beyond what HealthKit/Google Fit provide), contacts, browsing history
- **How We Use It:** Solely for app functionality and notification personalization
- **Who We Share With:** Nobody. Ever.
- **Your Rights:** Export all data, delete account and all data within 24 hours
- **Compliance:** GDPR, CCPA compliant

### D. Technical Stack Summary

**Frontend:**
- React Native (Expo)
- TypeScript
- React Navigation
- Async Storage / SQLite
- React Native Health
- React Native Push Notifications

**Backend (Minimal):**
- Firebase Authentication
- Firebase Cloud Storage (optional backup)
- Firebase Cloud Functions (minimal logic)

**Development Tools:**
- Git + GitHub
- VS Code
- Xcode (iOS builds)
- Android Studio (Android builds)
- Figma (design)

**Analytics & Monitoring:**
- TBD (privacy-compliant option needed)
- Sentry (error tracking)
- App Store Connect / Google Play Console

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 11, 2026 | Preston Vance | Initial PRD creation |

---

**Next Steps:**
1. Review and approve PRD
2. Finalize open questions
3. Begin development environment setup
4. Start message library generation
5. Create design mockups
