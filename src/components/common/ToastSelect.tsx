import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { toastOptions } from '@/types/toastOptions';
import NotificationIcon from '@/../public/svg/notification.svg';
import CheckIcon from '@/../public/svg/check.svg';
import ErrorIcon from '@/../public/svg/error.svg';

interface ToastProps {
  type: string;
}

const ToastSelect = ({ type }: ToastProps) => {
  switch (type) {
    case 'check':
      toast.success('내 위키 링크가 복사되었습니다.', {
        ...toastOptions,
        icon: <CheckIcon />,
      });
      break;
    case 'error':
      toast.error('다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.', {
        ...toastOptions,
        icon: (
          <motion.div
            animate={{
              rotate: [-15, 15, -15, 15, -14],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            <ErrorIcon />
          </motion.div>
        ),
      });
      break;
    case 'notification':
      toast.info('앞 사람의 편집이 끝나면 위키 참여가 가능합니다.', {
        ...toastOptions,
        icon: <NotificationIcon />,
      });
      break;
  }

  return <></>;
};

export default ToastSelect;
