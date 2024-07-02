import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import {
  CopyLinkMessage,
  NotificationMessage,
  ToastProps,
  UneditableMessage,
  toastOptions,
} from '@/types/toast';
import InfoIcon from '@/../public/svg/info.svg';
import CheckLottie from '@/../public/lottie/check.json';
import ErrorLottie from '@/../public/lottie/error.json';

const ToastSelect = ({ type, message, onClose }: ToastProps) => {
  const defaultMessages = {
    check: CopyLinkMessage,
    error: UneditableMessage,
    notification: NotificationMessage,
  };

  const finalMessage = message || defaultMessages[type];

  switch (type) {
    case 'check':
      toast.success(finalMessage, {
        ...toastOptions,
        icon: <Lottie animationData={CheckLottie} />,
        onClose,
      });
      break;
    case 'error':
      toast.error(finalMessage, {
        ...toastOptions,
        icon: <Lottie animationData={ErrorLottie} />,
        onClose,
      });
      break;
    case 'notification':
      toast.info(finalMessage, {
        ...toastOptions,
        icon: <InfoIcon />,
        onClose,
      });
      break;
  }

  return <></>;
};

export default ToastSelect;
