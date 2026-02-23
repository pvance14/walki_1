import { cn } from '@/lib/cn';

const tabs = [
  { id: 'home', label: 'Home', active: true },
  { id: 'calendar', label: 'Calendar', active: false },
  { id: 'personas', label: 'Personas', active: false },
  { id: 'settings', label: 'Settings', active: false },
];

export const BottomNav = () => {
  return (
    <nav
      aria-label="Demo navigation"
      className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.25rem)] pt-2 backdrop-blur"
    >
      <ul className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              type="button"
              className={cn(
                'min-h-11 w-full rounded-md px-2 text-xs font-semibold transition-colors',
                tab.active ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-500',
              )}
              disabled={!tab.active}
              aria-current={tab.active ? 'page' : undefined}
              aria-label={tab.active ? `${tab.label} tab, active` : `${tab.label} tab, coming soon`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
