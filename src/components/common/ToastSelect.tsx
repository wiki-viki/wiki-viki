import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import { ToastProps, toastOptions } from '@/types/toast';
import InfoIcon from '@/../public/svg/info.svg';
import CheckLottie from '@/../public/lottie/check.json';
import ErrorLottie from '@/../public/lottie/error.json';

const ToastSelect = ({ type, message }: ToastProps) => {
  switch (type) {
    case 'check':
      toast.success(message, {
        ...toastOptions,
        icon: <Lottie animationData={CheckLottie} />,
      });
      break;
    case 'error':
      toast.error(message, {
        ...toastOptions,
        icon: <Lottie animationData={ErrorLottie} />,
      });
      break;
    case 'notification':
      toast.info(message, {
        ...toastOptions,
        icon: <InfoIcon />,
      });
      break;
  }

  return <></>;
};

export default ToastSelect;
