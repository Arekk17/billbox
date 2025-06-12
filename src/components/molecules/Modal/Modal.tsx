import { Button } from "@/components/atoms/Buttons/Button";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  primaryButton?: {
    text: string;
    onClick: () => void;
    loading?: boolean;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryButton,
  secondaryButton,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <div className="form-control">
          {children}
          <div className="modal-action">
            {secondaryButton && (
              <Button
                type="button"
                onClick={secondaryButton.onClick}
                className="btn btn-ghost"
              >
                {secondaryButton.text}
              </Button>
            )}
            {primaryButton && (
              <Button
                type="button"
                onClick={primaryButton.onClick}
                className="btn btn-primary"
                loading={primaryButton.loading}
              >
                {primaryButton.text}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  );
};
