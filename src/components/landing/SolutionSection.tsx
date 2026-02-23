import { useNavigate } from 'react-router-dom';
import { PERSONAS } from '@/data/personas';
import { PersonaCard, Button } from '@/components/ui';
import { Reveal } from './Reveal';

export const SolutionSection = () => {
  const navigate = useNavigate();

  return (
    <section id="solution" aria-labelledby="solution-heading" className="border-y border-slate-200 bg-slate-50/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
        <Reveal>
          <h2 id="solution-heading" className="text-3xl font-bold text-slate-900 sm:text-4xl">
            How Walki is different
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
            Walki matches your motivation profile, then rotates AI personas so your prompts stay fresh, emotionally relevant, and personal.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {PERSONAS.map((persona, index) => (
            <Reveal key={persona.id} delay={0.03 * index}>
              <PersonaCard persona={persona} onClick={() => navigate('/quiz')} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-8">
            <Button
              type="button"
              className="w-full transition-all duration-200 active:scale-[0.99] sm:w-auto"
              onClick={() => navigate('/quiz')}
            >
              Take the Quiz to Find Your Match
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

