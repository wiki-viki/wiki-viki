import { ToastOptions } from 'react-toastify';

export const toastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  closeButton: false,
};

export interface ToastProps {
  type: ToastType;
  message?: string | null;
  onClose?: () => void;
}

export type ToastType = 'check' | 'error' | 'notification';
