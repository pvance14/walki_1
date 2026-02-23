import { Reveal } from './Reveal';

const painPoints = [
  {
    icon: '😵',
    title: 'Generic reminders get ignored',
    copy: 'Most apps send the same push notification to everyone, so motivation fades after a few days.',
  },
  {
    icon: '⏳',
    title: 'Consistency is harder than intensity',
    copy: 'Missing one day can break momentum and make it feel like you are starting over.',
  },
  {
    icon: '🧩',
    title: 'One style does not fit everyone',
    copy: 'What motivates your friend might annoy you. You need the right tone at the right time.',
  },
];

export const ProblemSection = () => {
  return (
    <section id="problem" aria-labelledby="problem-heading" className="mx-auto w-full max-w-6xl px-4 py-14 sm:py-20">
      <Reveal>
        <h2 id="problem-heading" className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Why walking habits break down
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {painPoints.map((point, index) => (
          <Reveal key={point.title} delay={0.04 * index}>
            <article className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="mb-3 text-2xl" aria-hidden="true">
                {point.icon}
              </p>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{point.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{point.copy}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

