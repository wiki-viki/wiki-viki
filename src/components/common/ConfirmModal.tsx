import { MouseEvent, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '../../../public/svg/close.svg';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  cancel?: string;
  confirm?: string;
}

const ConfirmModal = ({
  isOpen,
  onConfirm,
  onCancel,
  title = '제목',
  message = '내용',
  cancel = '아니오',
  confirm = '예',
}: ConfirmModalProps) => {
  const modalRef = useRef(null);

  const handleClickOutside = (e: MouseEvent<HTMLElement>) => {
    e.target === modalRef.current && onCancel();
  };

  useEffect(() => {
    const handleKeyDownEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDownEscape);

    return () => {
      window.removeEventListener('keydown', handleKeyDownEscape);
    };
  }, [onCancel]);

  if (typeof window === 'undefined') {
    return <></>;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="fixed inset-0 z-20 flex items-center justify-center bg-grayscale-500/30"
          ref={modalRef}
          onClick={handleClickOutside}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-2 flex h-auto w-[335px] flex-col rounded-10 bg-grayscale-50 p-[20px] shadow-lg md:w-[395px]">
            <div className="flex justify-end">
              <CloseIcon className="cursor-pointer" onClick={onCancel} />
            </div>
            <h3 className="mb-4 text-xl-semibold">{title}</h3>
            <p className="mb-8">{message}</p>
            <div className="flex justify-end gap-4">
              <motion.button
                className="rounded-md bg-grayscale-200 px-4 py-2 hover:bg-grayscale-400 hover:text-grayscale-50"
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onCancel}
              >
                {cancel}
              </motion.button>
              <motion.button
                className="rounded-md bg-primary-green-200 px-4 py-2 text-grayscale-50 hover:bg-primary-green-300"
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onConfirm}
              >
                {confirm}
              </motion.button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ConfirmModal;
