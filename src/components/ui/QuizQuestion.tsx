import type { QuizOption, QuizQuestion as QuizQuestionType } from '@/types';
import { cn } from '@/lib/cn';

type QuizQuestionProps = {
  question: QuizQuestionType;
  selectedOptionId?: string;
  onSelectOption: (option: QuizOption) => void;
};

export const QuizQuestion = ({ question, selectedOptionId, onSelectOption }: QuizQuestionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">{question.question}</h2>
      <div className="grid gap-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              className={cn(
                'min-h-11 touch-manipulation rounded-lg border px-4 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
                isSelected
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-300 bg-white text-slate-800 hover:border-slate-500',
              )}
              onClick={() => onSelectOption(option)}
            >
              {option.text}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export type { QuizQuestionProps };
