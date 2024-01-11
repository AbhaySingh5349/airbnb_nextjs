'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { IoMdClose } from 'react-icons/io';
import Button from '../shared/Button';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/60 outline-none focus:outline-none">
        <div className="relative mx-auto my-8 h-full w-full md:h-auto md:w-2/3 lg:h-auto lg:w-1/2 xl:w-2/5">
          {/* CONTENT */}
          <div
            className={`h-full duration-300 ${
              showModal ? 'translate-y-0' : 'translate-y-full'
            } ${showModal ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
              {/* HEADER */}
              <div className="relative flex items-center justify-center rounded-t border-b-[1px] p-2">
                <button
                  className="absolute left-9 border-0 p-1 transition hover:opacity-70"
                  onClick={handleClose}
                >
                  <IoMdClose className=" h-5 w-5" />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative flex-auto px-4 py-1">{body}</div>
              {/* footer */}
              <div className="mt-4 flex flex-col gap-2 px-4">
                <div className="flex w-full flex-row items-center gap-4">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}

                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
