import { useMemo } from 'react';
import { PersonaCard } from '@/components/ui';
import { PERSONAS } from '@/data/personas';
import type { PersonaId, PersonaPercentages } from '@/types';

type PersonasTabProps = {
  personaWeights: PersonaPercentages;
  onSetPersonaWeight: (personaId: PersonaId, value: number) => void;
};

export const PersonasTab = ({ personaWeights, onSetPersonaWeight }: PersonasTabProps) => {
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
        <p className="font-semibold text-slate-900">Your mix</p>
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
