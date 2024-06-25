import { toast } from 'react-toastify';
import Lottie from 'lottie-react';
import { toastOptions } from '@/types/toastOptions';
import InfoIcon from '@/../public/svg/info.svg';
import CheckLottie from '@/../public/lottie/check.json';
import ErrorLottie from '@/../public/lottie/error.json';

interface ToastProps {
  type: string;
}

const ToastSelect = ({ type }: ToastProps) => {
  switch (type) {
    case 'check':
      toast.success('내 위키 링크가 복사되었습니다.', {
        ...toastOptions,
        icon: <Lottie animationData={CheckLottie} />,
      });
      break;
    case 'error':
      toast.error('다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.', {
        ...toastOptions,
        icon: <Lottie animationData={ErrorLottie} />,
      });
      break;
    case 'notification':
      toast.info('앞 사람의 편집이 끝나면 위키 참여가 가능합니다.', {
        ...toastOptions,
        icon: <InfoIcon />,
      });
      break;
  }

  return <></>;
};

export default ToastSelect;
