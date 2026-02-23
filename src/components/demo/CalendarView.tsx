import { useMemo } from 'react';
import type { DayData } from '@/types';
import { cn } from '@/lib/cn';

type CalendarViewProps = {
  calendarData: DayData[];
  onSelectDay: (day: DayData) => void;
};

type FreezeSummary = {
  count: number;
  mostRecentDaysAgo: number | null;
};

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const toIsoDate = (date: Date) => date.toISOString().split('T')[0];

const getDayStatus = (day: DayData): 'freeze' | 'goal-met' | 'missed' => {
  if (day.freezeUsed) {
    return 'freeze';
  }
  if (day.completed) {
    return 'goal-met';
  }
  return 'missed';
};

const getFreezeSummary = (calendarData: DayData[]): FreezeSummary => {
  const freezeDays = calendarData.filter((day) => day.freezeUsed).sort((a, b) => b.date.localeCompare(a.date));

  if (freezeDays.length === 0) {
    return { count: 0, mostRecentDaysAgo: null };
  }

  const today = new Date();
  const latest = new Date(freezeDays[0].date);
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysAgo = Math.max(0, Math.floor((today.getTime() - latest.getTime()) / msPerDay));

  return {
    count: freezeDays.length,
    mostRecentDaysAgo: daysAgo,
  };
};

export const CalendarView = ({ calendarData, onSelectDay }: CalendarViewProps) => {
  const todayIso = toIsoDate(new Date());

  const dayMap = useMemo(() => {
    const map = new Map<string, DayData>();
    calendarData.forEach((day) => map.set(day.date, day));
    return map;
  }, [calendarData]);

  const { monthStart, leadingBlankDays, monthLabel, totalDays } = useMemo(() => {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const leadingBlankDays = monthStart.getDay();

    return {
      monthStart,
      monthEnd,
      leadingBlankDays,
      monthLabel: monthStart.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
      totalDays: monthEnd.getDate(),
    };
  }, []);

  const freezeSummary = useMemo(() => getFreezeSummary(calendarData), [calendarData]);

  const gridCells = useMemo(() => {
    const blanks = Array.from({ length: leadingBlankDays }, (_, index) => ({ type: 'blank' as const, id: `blank-${index}` }));

    const days = Array.from({ length: totalDays }, (_, index) => {
      const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), index + 1);
      const isoDate = toIsoDate(date);
      const dayData = dayMap.get(isoDate);

      return {
        type: 'day' as const,
        id: isoDate,
        date,
        isoDate,
        dayNumber: index + 1,
        data: dayData,
      };
    });

    return [...blanks, ...days];
  }, [dayMap, leadingBlankDays, monthStart, totalDays]);

  return (
    <section className="space-y-4">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Calendar</h2>
          <p className="text-sm text-slate-600">{monthLabel}</p>
        </div>
        <p className="text-xs font-medium text-slate-500">Tap a day for details</p>
      </header>

      <div className="grid grid-cols-7 gap-1" role="grid" aria-label={`Calendar for ${monthLabel}`}>
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="px-1 py-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </div>
        ))}

        {gridCells.map((cell) => {
          if (cell.type === 'blank') {
            return <div key={cell.id} className="min-h-11" aria-hidden="true" />;
          }

          const status = cell.data ? getDayStatus(cell.data) : null;
          const isToday = cell.isoDate === todayIso;

          return (
            <button
              key={cell.id}
              type="button"
              onClick={() => {
                if (cell.data) {
                  onSelectDay(cell.data);
                }
              }}
              disabled={!cell.data}
              className={cn(
                'min-h-11 rounded-md border text-sm font-semibold transition-colors',
                !cell.data && 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300',
                cell.data && status === 'goal-met' && 'border-emerald-200 bg-emerald-100 text-emerald-800',
                cell.data && status === 'freeze' && 'border-sky-200 bg-sky-100 text-sky-800',
                cell.data && status === 'missed' && 'border-slate-200 bg-slate-100 text-slate-500',
                isToday && 'ring-2 ring-slate-900 ring-offset-1',
              )}
              aria-label={
                cell.data
                  ? `${cell.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}: ${status}`
                  : `No data for ${cell.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}`
              }
            >
              {cell.dayNumber}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-emerald-300" aria-hidden="true" /> Goal met
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-sky-300" aria-hidden="true" /> Freeze used
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-slate-300" aria-hidden="true" /> Missed
        </span>
      </div>

      <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Streak freeze</p>
        <p>
          {freezeSummary.count > 0 && freezeSummary.mostRecentDaysAgo !== null
            ? `${freezeSummary.count} freeze ${freezeSummary.count === 1 ? '' : 's'} used, most recent ${freezeSummary.mostRecentDaysAgo} day${freezeSummary.mostRecentDaysAgo === 1 ? '' : 's'} ago.`
            : 'No freezes used in this period.'}
        </p>
        <p className="mt-1 text-xs text-slate-600">A freeze protects your streak for one missed day each week.</p>
      </div>
    </section>
  );
};

export type { CalendarViewProps, FreezeSummary };
