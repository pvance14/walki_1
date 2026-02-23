import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { Reveal } from './Reveal';

const steps = [
  {
    title: 'Take Quiz',
    description: 'Answer 10 fast questions so Walki can identify your motivation style.',
  },
  {
    title: 'Get Your Persona',
    description: 'See which of the six AI personas best matches how you stay consistent.',
  },
  {
    title: 'Receive Motivation',
    description: 'Get private, timely nudges designed to keep your streak moving forward.',
  },
];

export const HowItWorksSection = () => {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
      <Reveal>
        <h2 id="how-it-works-heading" className="text-3xl font-bold text-slate-900 sm:text-4xl">
          How it works
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={0.06 * index}>
            <article className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
              {index < steps.length - 1 && (
                <span
                  className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl text-slate-300 md:block"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-8">
          <Button
            type="button"
            className="w-full transition-all duration-200 active:scale-[0.99] sm:w-auto"
            onClick={() => navigate('/quiz')}
          >
            Start Quiz
          </Button>
        </div>
      </Reveal>
    </section>
  );
};

