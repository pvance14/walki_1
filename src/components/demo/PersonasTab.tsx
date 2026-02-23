import { useMemo } from 'react';
import { PersonaCard } from '@/components/ui';
import { PERSONAS } from '@/data/personas';
import type { PersonaId, PersonaPercentages } from '@/types';

type PersonasTabProps = {
  personaWeights: PersonaPercentages;
  onSetPersonaWeight: (personaId: PersonaId, value: number) => void;
  onResetToQuiz: () => void;
  canResetToQuiz: boolean;
};

export const PersonasTab = ({ personaWeights, onSetPersonaWeight, onResetToQuiz, canResetToQuiz }: PersonasTabProps) => {
  const topMix = useMemo(() => {
    return [...PERSONAS]
      .sort((a, b) => personaWeights[b.id] - personaWeights[a.id])
      .slice(0, 3)
      .map((persona) => `${persona.name} ${personaWeights[persona.id]}%`)
      .join(' • ');
  }, [personaWeights]);

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-900">Personas</h2>
        <p className="text-sm text-slate-600">Adjust your motivation mix. Sliders always normalize to 100% total.</p>
      </header>

      <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-slate-900">Your mix</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetToQuiz}
              disabled={!canResetToQuiz}
              className="min-h-11 rounded-md border border-slate-300 px-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset
            </button>
            <div className="group relative">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs font-bold text-slate-600"
                aria-label="What reset does"
                tabIndex={0}
              >
                ?
              </span>
              <div className="pointer-events-none absolute right-0 top-7 z-10 w-56 rounded-md border border-slate-200 bg-white p-2 text-xs text-slate-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                Resets all persona sliders back to your original quiz result percentages.
              </div>
            </div>
          </div>
        </div>
        <p className="text-slate-600">{topMix}</p>
      </div>

      <div className="space-y-4">
        {PERSONAS.map((persona) => {
          const value = personaWeights[persona.id];

          return (
            <div key={persona.id} className="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
              <PersonaCard persona={persona} />
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor={`persona-weight-${persona.id}`} className="font-medium text-slate-800">
                    {persona.name} weight
                  </label>
                  <span className="font-semibold text-slate-900">{value}%</span>
                </div>
                <input
                  id={`persona-weight-${persona.id}`}
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={value}
                  onChange={(event) => onSetPersonaWeight(persona.id, Number(event.target.value))}
                  className="h-11 w-full cursor-pointer touch-manipulation"
                  aria-label={`${persona.name} persona weight`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export type { PersonasTabProps };
