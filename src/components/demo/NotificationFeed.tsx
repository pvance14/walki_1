import { motion } from 'framer-motion';
import { NotificationCard } from '@/components/ui';
import type { Notification } from '@/types';

type NotificationFeedProps = {
  notifications: Notification[];
  highlightedNotificationId?: string | null;
};

export const NotificationFeed = ({ notifications, highlightedNotificationId }: NotificationFeedProps) => {
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
        <motion.div
          key={notification.id}
          initial={
            highlightedNotificationId === notification.id
              ? { opacity: 0, y: 28 }
              : false
          }
          animate={{ opacity: 1, y: 0 }}
          transition={
            highlightedNotificationId === notification.id
              ? {
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                }
              : { duration: 0 }
          }
        >
          <NotificationCard notification={notification} />
        </motion.div>
      ))}
    </div>
  );
};

export type { NotificationFeedProps };
