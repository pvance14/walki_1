# Walki

A privacy-first walking app with AI-powered motivational personas that adapt to each user's motivation style.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS v4** - Styling
- **React Router v6** - Routing
- **Zustand** - State management

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── common/     # Common components (ErrorBoundary, etc.)
│   ├── quiz/       # Quiz-related components
│   ├── demo/       # Demo-related components
│   └── landing/    # Landing page components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── store/          # Zustand stores
├── types/          # TypeScript type definitions
├── data/           # Static data and constants
└── styles/         # Global styles
```

## 🎭 AI Personas

1. **Sunny** (The Companion) - Supportive walking buddy
2. **Dr. Quinn** (The Educator) - Science-backed motivation
3. **Pep** (The Cheerleader) - High-energy enthusiasm
4. **Rico** (The Challenger) - Competitive push
5. **Fern** (The Sage) - Mindful wellness wisdom
6. **Rusty** (The Pessimist) - Dark humor & reverse psychology

## 🎯 MVP Features

- Landing page with value proposition
- 10-question motivation quiz
- Persona showcase with examples
- Interactive demo (streak tracker, step entry, notification generator)
- Waitlist signup

## 🔒 Privacy First

- No data selling
- Local-first storage
- Minimal data collection

## 📄 License

MIT
