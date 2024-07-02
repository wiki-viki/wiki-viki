import { ToastOptions } from 'react-toastify';

export const toastOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 2000,
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

export const CopyLinkMessage = '내 위키 링크가 복사되었습니다.';
export const UneditableMessage = '다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.';
export const NotificationMessage = '앞 사람의 편집이 끝나면 위키 참여가 가능합니다.';
