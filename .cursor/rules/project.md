# Walki Project Rules

## Project Context
**Always read `aiDocs/context.md` first** - it contains project overview, personas, features, metrics, and current focus.

## Core Guidelines

### Before You Code
- Read `aiDocs/context.md` for project overview
- Check `aiDocs/architecture.md` for technical decisions
- Verify existing code before creating new files

### Decision Making
- **Ask before complex work** - If task takes >30 minutes or involves architecture changes, present options first
- **Keep it simple** - No over-engineering, use straightforward solutions
- **Flag uncertainty** - Say "I'm not sure about X" rather than guessing

### Code Quality
- TypeScript strict mode (no `any` unless necessary)
- Small, focused commits
- Minimal dependencies
- Mobile-first responsive design

### Privacy First
- No tracking beyond Plausible analytics
- All data stays local (LocalStorage)
- No third-party scripts that compromise privacy

## Project Specifics

### File Organization
- `aiDocs/` - Tracked project knowledge (PRD, MVP, architecture)
- `ai/` - Gitignored local notes (guides, roadmaps, personal)

### 6 AI Personas
Each has distinct voice - see context.md:
- Sunny (Companion), Dr. Quinn (Educator), Pep (Cheerleader)
- Rico (Challenger), Fern (Sage), Rusty (Pessimist)

### Tech Stack
React + TypeScript + Vite + TailwindCSS (see architecture.md for full details)

---

**Remember:** This is a 2-week MVP to validate the AI persona concept. Ship fast, learn, iterate.
