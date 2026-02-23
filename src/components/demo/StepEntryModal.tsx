import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Button, Input, Modal } from '@/components/ui';

type StepEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (steps: number) => void;
};

const QUICK_ADD_VALUES = [500, 1000, 2000];

export const StepEntryModal = ({ isOpen, onClose, onSubmit }: StepEntryModalProps) => {
  const [stepsValue, setStepsValue] = useState('');

  const error = useMemo(() => {
    if (stepsValue.trim().length === 0) {
      return '';
    }

    const numericValue = Number(stepsValue);
    if (!Number.isFinite(numericValue) || numericValue <= 0) {
      return 'Enter a valid positive number.';
    }
    if (numericValue > 50000) {
      return 'Use 50,000 steps or fewer.';
    }
    return '';
  }, [stepsValue]);

  const resetAndClose = () => {
    setStepsValue('');
    onClose();
  };

  const submitSteps = (steps: number) => {
    if (!Number.isFinite(steps) || steps <= 0) {
      return;
    }
    onSubmit(Math.floor(steps));
    resetAndClose();
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) {
      return;
    }

    const steps = Number(stepsValue);
    submitSteps(steps);
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Log Today's Steps">
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <Input
          label="Steps walked"
          type="number"
          min={1}
          max={50000}
          value={stepsValue}
          onChange={(event) => setStepsValue(event.target.value)}
          placeholder="e.g. 1200"
          error={error || undefined}
        />

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick add</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_ADD_VALUES.map((value) => (
              <Button key={value} type="button" variant="secondary" onClick={() => submitSteps(value)}>
                +{value.toLocaleString()}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={Boolean(error) || stepsValue.trim().length === 0}>
            Add Steps
          </Button>
          <Button type="button" variant="outline" onClick={resetAndClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export type { StepEntryModalProps };
