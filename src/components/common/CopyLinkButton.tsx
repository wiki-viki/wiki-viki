import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import LinkIcon from '@/../public/svg/link.svg';
import { urlRegex } from '@/utils/urlRegex';
import ErrorLottie from '@/../public/lottie/error.json';
import { CopyLinkMessage } from '@/types/toast';
import ToastSelect from './ToastSelect';

interface CopyLinkButtonProps {
  url: string;
}

const LinkContainer = 'inline-flex items-center gap-2 rounded-10 px-3 py-2 sm:h-6.5 cursor-pointer';
const LinkText = 'text-md-regular sm:text-xs-regular text-primary-green-200';

const CopyLinkButton = ({ url }: CopyLinkButtonProps) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    ToastSelect({ type: 'check', message: CopyLinkMessage });
  };

  if (!urlRegex(url)) {
    return (
      <button
        className={`${LinkContainer} cursor-not-allowed bg-secondary-red-100`}
        disabled={true}
      >
        <Lottie animationData={ErrorLottie} style={{ width: '12px', height: '12px' }} />
        <span className={`${LinkText} truncate text-secondary-red-200`}>경로를 확인해주세요.</span>
      </button>
    );
  }

  return (
    <motion.button
      className={`${LinkContainer} bg-primary-green-100`}
      onClick={handleCopyToClipboard}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <div className="inline-flex items-center gap-2">
        <div>
          <LinkIcon />
        </div>
        <span className={`${LinkText} hover:underline `}>{url}</span>
      </div>
    </motion.button>
  );
};

export default CopyLinkButton;
