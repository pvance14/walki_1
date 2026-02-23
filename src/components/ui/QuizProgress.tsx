type QuizProgressProps = {
  current: number;
  total: number;
};

export const QuizProgress = ({ current, total }: QuizProgressProps) => {
  const safeTotal = Math.max(total, 1);
  const progress = Math.min(100, Math.round((current / safeTotal) * 100));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-slate-700">
        <span>Question {current} of {total}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-slate-900 transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export type { QuizProgressProps };
