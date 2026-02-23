import { useEffect, useMemo, useState } from 'react';
import { Button, Input } from '@/components/ui';
import type { Settings } from '@/types';

type SettingsTabProps = {
  settings: Settings;
  onSetDailyGoal: (dailyGoal: number) => void;
  onUpdateSettings: (updates: Partial<Settings>) => void;
  onResetDemo: () => void;
  freezeCount: number;
  freezeMostRecentDaysAgo: number | null;
};

export const SettingsTab = ({
  settings,
  onSetDailyGoal,
  onUpdateSettings,
  onResetDemo,
  freezeCount,
  freezeMostRecentDaysAgo,
}: SettingsTabProps) => {
  const [goalInput, setGoalInput] = useState(settings.dailyGoal.toString());

  useEffect(() => {
    setGoalInput(settings.dailyGoal.toString());
  }, [settings.dailyGoal]);

  const goalError = useMemo(() => {
    const value = Number(goalInput);
    if (!Number.isFinite(value)) {
      return 'Enter a valid number.';
    }
    if (value < 3000 || value > 20000) {
      return 'Use a goal between 3,000 and 20,000.';
    }
    return '';
  }, [goalInput]);

  const freezeSummary =
    freezeCount > 0 && freezeMostRecentDaysAgo !== null
      ? `${freezeCount} freeze ${freezeCount === 1 ? '' : 's'} used, latest ${freezeMostRecentDaysAgo} day${freezeMostRecentDaysAgo === 1 ? '' : 's'} ago.`
      : 'No freezes used in this sample period.';

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-900">Settings</h2>
        <p className="text-sm text-slate-600">Update goal and notification behavior for this demo session.</p>
      </header>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-900">Notification timing</p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Button
            type="button"
            variant={settings.enableMorningNotifications ? 'primary' : 'outline'}
            onClick={() => onUpdateSettings({ enableMorningNotifications: !settings.enableMorningNotifications })}
            className="min-h-11"
          >
            Morning
          </Button>
          <Button
            type="button"
            variant={settings.enableAfternoonNotifications ? 'primary' : 'outline'}
            onClick={() => onUpdateSettings({ enableAfternoonNotifications: !settings.enableAfternoonNotifications })}
            className="min-h-11"
          >
            Afternoon
          </Button>
          <Button
            type="button"
            variant={settings.enableEveningNotifications ? 'primary' : 'outline'}
            onClick={() => onUpdateSettings({ enableEveningNotifications: !settings.enableEveningNotifications })}
            className="min-h-11"
          >
            Evening
          </Button>
        </div>

        <label className="flex min-h-11 items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2">
          <span className="text-sm font-medium text-slate-800">Randomize timing</span>
          <input
            type="checkbox"
            checked={settings.randomizeTiming}
            onChange={(event) => onUpdateSettings({ randomizeTiming: event.target.checked })}
            className="h-5 w-5"
          />
        </label>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-900">Daily step goal</p>
        <form
          className="space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (!goalError) {
              onSetDailyGoal(Number(goalInput));
            }
          }}
        >
          <Input
            label="Goal (steps)"
            type="number"
            min={3000}
            max={20000}
            value={goalInput}
            onChange={(event) => setGoalInput(event.target.value)}
            error={goalError || undefined}
          />
          <Button type="submit" disabled={Boolean(goalError)}>
            Save Goal
          </Button>
        </form>
      </div>

      <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Streak freeze</p>
        <p>{freezeSummary}</p>
        <p className="mt-1 text-xs text-slate-600">A freeze saves your streak for one missed day each week.</p>
      </div>

      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
        <p className="text-sm font-semibold text-slate-900">Reset demo</p>
        <p className="mb-3 text-sm text-slate-700">Restore initial steps, streak, calendar, notifications, and settings.</p>
        <Button
          type="button"
          variant="outline"
          className="border-rose-300 text-rose-700 hover:bg-rose-100"
          onClick={() => {
            const shouldReset = window.confirm('Reset demo state to defaults? This only clears demo data.');
            if (shouldReset) {
              onResetDemo();
            }
          }}
        >
          Reset Demo State
        </Button>
      </div>
    </section>
  );
};

export type { SettingsTabProps };
