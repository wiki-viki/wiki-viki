import { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#474D664D]/30">
      <div className="flex h-auto w-[335px] flex-col rounded-[10px] bg-white p-[20px] shadow-lg">
        <div className="flex cursor-pointer justify-end">X</div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
