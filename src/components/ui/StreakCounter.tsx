import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

type StreakCounterProps = {
  streak: number;
  glowColor?: string | null;
};

const milestoneMap: Record<number, string> = {
  7: 'Week one unlocked',
  14: 'Two-week momentum',
  21: 'Habit cemented',
};

export const StreakCounter = ({ streak, glowColor }: StreakCounterProps) => {
  const [animate, setAnimate] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setAnimate(true);
    const timeout = window.setTimeout(() => setAnimate(false), 450);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [streak]);

  return (
    <motion.div
      className={cn('inline-flex flex-col rounded-xl border border-amber-300 bg-amber-50 p-4')}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: [1, 1.025, 1],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: 'easeInOut',
            }
      }
      style={
        glowColor
          ? {
              boxShadow: `0 0 0 1px ${glowColor}22, 0 8px 30px ${glowColor}33`,
            }
          : undefined
      }
    >
      <span className="text-sm font-medium text-amber-800">Current streak</span>
      <motion.span
        className={cn(
          'text-4xl font-bold text-amber-900 transition-transform duration-300 motion-reduce:transition-none',
          animate && 'scale-110',
        )}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.05, 1],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: 'easeInOut',
              }
        }
      >
        🔥 {streak}
      </motion.span>
      {milestoneMap[streak] ? (
        <span className="mt-1 text-sm font-semibold text-amber-700">{milestoneMap[streak]}</span>
      ) : null}
    </motion.div>
  );
};

export type { StreakCounterProps };
