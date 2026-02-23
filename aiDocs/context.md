# Project Context

## Project Overview

**Walki** - A privacy-first walking app with AI-powered motivational personas that adapt to each user's motivation style.

## Key Documents

- **PRD:** `aiDocs/prd.md` - Full product requirements and feature specifications
- **MVP:** `aiDocs/mvp.md` - Web-based interactive demo specification (2-week timeline)
- **Architecture:** `aiDocs/architecture.md` - Technical architecture and implementation details
- **Changelog:** `ai/changelog.md` - changelog with brief notes about each change to the codebase

## Behavior

- Whenever creating plan does and roadmap docs, always save them in ai/roadmaps. Prefix the name with the current date. Add a note that we need to avoid over-engineering, cruft, and legacy-compatibility features in this clean code project.
- Whenever finishing with implementing a plan / roadmap doc pair, make sure the roadmap is up to date (tasks checked off, etc). Then move the docs to ai/roadmaps/complete. Then update ai/changelog.md accordingly.

## Core Features

### 6 AI Personas

1. **Sunny** (The Companion) - Supportive walking buddy
2. **Dr. Quinn** (The Educator) - Science-backed motivation
3. **Pep** (The Cheerleader) - High-energy enthusiasm
4. **Rico** (The Challenger) - Competitive push
5. **Fern** (The Sage) - Mindful wellness wisdom
6. **Rusty** (The Pessimist) - Dark humor & reverse psychology

### MVP Features

- Landing page with value proposition
- 10-question motivation quiz
- Persona showcase with examples
- Interactive demo (streak tracker, step entry, notification generator)
- Waitlist signup

## Target Audience

- Primary: Women 25-49 years old
- Current activity: 5,000-7,000 steps/day (inconsistent)
- Values: Privacy, personality, consistency without fitness culture pressure

## Key Differentiators

- AI personas that rotate based on user preferences (no notification fatigue)
- Privacy-first (no data selling, local-first storage)
- Streak recovery mechanics (weekly "freeze" to save streaks)
- Emotional messaging (18% more effective than logical)

## Success Metrics (MVP)

- Quiz completion: >70%
- Demo engagement: >3 minutes average
- Waitlist conversion: >20% of quiz completers
- Social sharing: >5% share quiz results

## Current Focus

- Set up React + Vite project
- Generate 300+ persona message library
- Build landing page
- Implement motivation quiz
- Create interactive demo experience
