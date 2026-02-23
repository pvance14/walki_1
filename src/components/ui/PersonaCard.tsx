import type { Persona } from '@/types';
import { cn } from '@/lib/cn';
import { PERSONA_HEX, PERSONA_ICON, PERSONA_INITIALS, PERSONA_PHOTO, PERSONA_TINT_HEX } from '@/lib/persona';

type PersonaCardProps = {
  persona: Persona;
  onClick?: (personaId: Persona['id']) => void;
};

export const PersonaCard = ({ persona, onClick }: PersonaCardProps) => {
  const accentColor = PERSONA_HEX[persona.id];
  const tintColor = PERSONA_TINT_HEX[persona.id];
  const personaPhoto = PERSONA_PHOTO[persona.id];

  return (
    <button
      type="button"
      onClick={() => onClick?.(persona.id)}
      className={cn(
        'w-full rounded-xl border p-4 text-left transition duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
      )}
      style={{ borderColor: accentColor, backgroundColor: tintColor }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border text-lg"
          style={{ borderColor: accentColor, backgroundColor: 'white' }}
          aria-hidden="true"
          title={persona.name}
        >
          {personaPhoto ? (
            <img src={personaPhoto} alt="" className="h-full w-full rounded-full object-cover" />
          ) : (
            <span>{PERSONA_ICON[persona.id] ?? PERSONA_INITIALS[persona.id]}</span>
          )}
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">{persona.name}</h3>
          <p className="text-sm text-slate-600">{persona.title}</p>
        </div>
      </div>
      <p className="text-sm text-slate-700">{persona.description}</p>
    </button>
  );
};

export type { PersonaCardProps };
