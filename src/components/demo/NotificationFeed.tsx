import { NotificationCard } from '@/components/ui';
import type { Notification } from '@/types';

type NotificationFeedProps = {
  notifications: Notification[];
};

export const NotificationFeed = ({ notifications }: NotificationFeedProps) => {
  if (notifications.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
        No motivation messages yet. Tap <span className="font-semibold text-slate-900">Get Motivation</span> to generate one.
      </div>
    );
  }

  return (
    <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export type { NotificationFeedProps };
