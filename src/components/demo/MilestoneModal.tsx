import { Button, Modal } from '@/components/ui';
import type { MilestoneEvent } from '@/store/demoStore';

type MilestoneModalProps = {
  milestone: MilestoneEvent | null;
  onDismiss: () => void;
};

export const MilestoneModal = ({ milestone, onDismiss }: MilestoneModalProps) => {
  return (
    <Modal isOpen={Boolean(milestone)} onClose={onDismiss} title={milestone?.title ?? 'Milestone'}>
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-slate-700">{milestone?.message}</p>
        <Button type="button" onClick={onDismiss}>
          Nice
        </Button>
      </div>
    </Modal>
  );
};

export type { MilestoneModalProps };
