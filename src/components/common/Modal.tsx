import { MouseEvent, ReactNode, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '../../../public/close.svg';

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

  useEffect(() => {
    const handleKeyDownEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDownEscape);

    return () => {
      return window.removeEventListener('keydown', handleKeyDownEscape);
    };
  }, [onClose]);

  if (typeof window === 'undefined') {
    return <></>;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="fixed inset-0 flex items-center justify-center bg-grayscale-500/30"
          ref={modalRef}
          onClick={handleClickOutside}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-2 flex h-auto w-[335px] flex-col rounded-[10px] bg-white p-[20px] shadow-lg md:w-[395px]">
            <div className="flex justify-end">
              <CloseIcon className="cursor-pointer" onClick={onClose} />
            </div>
            {children}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
