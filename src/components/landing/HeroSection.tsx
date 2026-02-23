import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { Reveal } from './Reveal';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-cyan-50 via-white to-white"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-14 text-center sm:pb-20 sm:pt-20">
        <Reveal className="w-full">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Motivation That Matches You
          </p>
          <h1 id="hero-heading" className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Walk more consistently with an AI persona that gets your style.
          </h1>
        </Reveal>

        <Reveal delay={0.08} className="w-full">
          <p className="mx-auto mb-8 mt-5 max-w-2xl text-lg text-slate-600 sm:text-xl">
            Walki pairs you with one of six motivation personas and keeps your streak alive with private, personalized nudges.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="w-full">
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              type="button"
              className="w-full max-w-sm transition-all duration-200 active:scale-[0.99] sm:w-auto"
              onClick={() => navigate('/quiz')}
            >
              Find Your Persona
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full max-w-sm transition-all duration-200 active:scale-[0.99] sm:w-auto"
              onClick={() => navigate('/quiz')}
            >
              Start the 10-Question Quiz
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

