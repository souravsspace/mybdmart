"use client";

import Modal from "@/components/modals/modal";
import { Button } from "@/components/ui/button";

type AlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
};

export default function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) {
  return (
    <Modal
      title="Are you sure?"
      description="Once you delete this, it's gone forever. This action cannot be undone. Are you sure you want to delete this?"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
}
