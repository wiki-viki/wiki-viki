import React from 'react';
import { motion } from 'framer-motion';
import NotificationIcon from '@/public/svg/notification.svg';
import CheckIcon from '@/public/svg/check.svg';
import ErrorIcon from '@/public/svg/error.svg';

interface SnackBarProps {
  type: 'notification' | 'check' | 'error';
}

const SnackBar = ({ type }: SnackBarProps) => {
  let icon, text, bgColor, textColor;

  switch (type) {
    case 'notification':
      icon = <NotificationIcon />;
      text = '앞 사람의 편집이 끝나면 위키 참여가 가능합니다.';
      bgColor = 'bg-grayscale-100';
      textColor = 'text-primary-blue-200';
      break;
    case 'check':
      icon = <CheckIcon />;
      text = '내 위키 링크가 복사되었습니다.';
      bgColor = 'bg-primary-green-100';
      textColor = 'text-primary-green-200';
      break;
    case 'error':
      icon = (
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
      );
      text = '다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.';
      bgColor = 'bg-secondary-red-100';
      textColor = 'text-secondary-red-200';
      break;
  }

  return (
    <div className={`inline-flex items-center gap-2 rounded-10 ${bgColor} px-3 py-2 sm:h-6.5`}>
      <div className=" min-h-[20px] min-w-[20px]">{icon}</div>
      <div className={`text-md-regular ${textColor} truncate sm:text-xs-regular`}>{text}</div>
    </div>
  );
};

export default SnackBar;
