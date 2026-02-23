import { cn } from '@/lib/cn';
import type { DemoTab } from '@/types';

const tabs: { id: DemoTab; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'personas', label: 'Personas' },
  { id: 'settings', label: 'Settings' },
];

type BottomNavProps = {
  activeTab: DemoTab;
  onChangeTab: (tab: DemoTab) => void;
};

export const BottomNav = ({ activeTab, onChangeTab }: BottomNavProps) => {
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
              onClick={() => onChangeTab(tab.id)}
              className={cn(
                'min-h-11 w-full rounded-md px-2 text-xs font-semibold transition-colors',
                activeTab === tab.id ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-500',
              )}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              aria-label={activeTab === tab.id ? `${tab.label} tab, active` : `${tab.label} tab`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export type { BottomNavProps };
