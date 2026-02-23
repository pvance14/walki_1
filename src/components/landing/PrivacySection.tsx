import { Reveal } from './Reveal';

const privacyPoints = [
  'No data selling. Ever.',
  'Local-first product direction to minimize unnecessary cloud storage.',
  'Persona matching built for motivation quality, not ad targeting.',
];

export const PrivacySection = () => {
  return (
    <section id="privacy" aria-labelledby="privacy-heading" className="border-y border-emerald-200 bg-emerald-50/70">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
        <Reveal>
          <h2 id="privacy-heading" className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Privacy is the product, not a footnote
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-700">
            Walki is built for people who want personalized motivation without surveillance-style tracking or data brokerage.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="mt-6 space-y-3 text-sm text-slate-700 sm:text-base">
            {privacyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-white/90 p-4">
                <span className="mt-0.5 text-emerald-600" aria-hidden="true">
                  ✓
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

