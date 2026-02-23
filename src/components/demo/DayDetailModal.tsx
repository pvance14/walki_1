import { Modal } from '@/components/ui';
import type { DayData } from '@/types';

type DayDetailModalProps = {
  day: DayData | null;
  isOpen: boolean;
  onClose: () => void;
};

const getStatus = (day: DayData) => {
  if (day.freezeUsed) {
    return 'Freeze used';
  }
  if (day.completed) {
    return 'Goal met';
  }
  return 'Missed goal';
};

export const DayDetailModal = ({ day, isOpen, onClose }: DayDetailModalProps) => {
  if (!day) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Day details">
      <div className="space-y-4">
        <div>
          <p className="text-base font-semibold text-slate-900">{new Date(day.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p className="text-sm text-slate-600">Status: {getStatus(day)}</p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <dt className="text-slate-500">Steps</dt>
            <dd className="text-base font-semibold text-slate-900">{day.steps.toLocaleString()}</dd>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <dt className="text-slate-500">Goal</dt>
            <dd className="text-base font-semibold text-slate-900">{day.goal.toLocaleString()}</dd>
          </div>
        </dl>

        {day.walkingEvents.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900">Walk events</p>
            <ul className="space-y-2">
              {day.walkingEvents.map((event) => (
                <li key={event.id} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
                  <p className="font-medium text-slate-800">{event.time}</p>
                  <p className="text-slate-600">{event.steps.toLocaleString()} steps{typeof event.distance === 'number' ? ` • ${event.distance} mi` : ''}</p>
                  {event.notes ? <p className="text-slate-500">{event.notes}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-slate-600">No walk events logged for this day.</p>
        )}
      </div>
    </Modal>
  );
};

export type { DayDetailModalProps };
