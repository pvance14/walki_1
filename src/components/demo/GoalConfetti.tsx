import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

const CONFETTI_COLORS = ['#F97316', '#3B82F6', '#EC4899', '#EF4444', '#10B981', '#F59E0B'];
const PIECE_COUNT = 28;

type GoalConfettiProps = {
  isActive: boolean;
};

export const GoalConfetti = ({ isActive }: GoalConfettiProps) => {
  const reduceMotion = useReducedMotion();

  const pieces = useMemo(
    () =>
      Array.from({ length: PIECE_COUNT }, (_, index) => ({
        id: index,
        left: `${(index / PIECE_COUNT) * 100}%`,
        delay: (index % 8) * 0.04,
        duration: 0.9 + (index % 6) * 0.08,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        rotate: (index % 2 === 0 ? 1 : -1) * (120 + (index % 5) * 40),
      })),
    [],
  );

  if (!isActive || reduceMotion) {
    return null;
  }

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          className="absolute top-[-10%] inline-block h-3 w-2 rounded-sm"
          style={{ left: piece.left, backgroundColor: piece.color }}
          initial={{ y: '-10%', opacity: 0, rotate: 0 }}
          animate={{ y: '120vh', opacity: [0, 1, 1, 0], rotate: piece.rotate }}
          transition={{ duration: piece.duration, delay: piece.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

export type { GoalConfettiProps };
