import { MouseEvent, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const modalRef = useRef(null);

  const handleClickOutside = (e: MouseEvent<HTMLElement>) => {
    e.target === modalRef.current && onClose();
  };

  return (
    <>
      {createPortal(
        <>
          {isOpen && (
            <div
              ref={modalRef}
              onClick={handleClickOutside}
              className="fixed inset-0 flex items-center justify-center bg-[#474D664D]/30"
            >
              <div className="flex h-auto w-[335px] flex-col rounded-[10px] bg-white p-[20px] shadow-lg">
                <div className="flex cursor-pointer justify-end" onClick={onClose}>
                  X
                </div>
                {children}
              </div>
            </div>
          )}
        </>,
        document.body,
      )}
    </>
  );
};

export default Modal;
