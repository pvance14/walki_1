import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { PersonaId } from '@/types';
import { cn } from '@/lib/cn';
import { PERSONA_COLOR_CLASS } from '@/lib/persona';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'persona';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  persona?: PersonaId;
  isLoading?: boolean;
  leftIcon?: ReactNode;
};

const baseButtonClass =
  'inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variantClasses: Record<Exclude<ButtonVariant, 'persona'>, string> = {
  primary: 'bg-slate-900 text-white hover:bg-slate-800',
  secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
  outline: 'border border-slate-300 text-slate-900 hover:bg-slate-100',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      persona,
      isLoading = false,
      leftIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const personaClass = persona ? PERSONA_COLOR_CLASS[persona] : PERSONA_COLOR_CLASS.sunny;

    return (
      <button
        ref={ref}
        className={cn(
          baseButtonClass,
          variant === 'persona' ? personaClass : variantClasses[variant],
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : (
          leftIcon
        )}
        <span>{isLoading ? 'Loading...' : children}</span>
      </button>
    );
  },
);

Button.displayName = 'Button';

export type { ButtonProps };
