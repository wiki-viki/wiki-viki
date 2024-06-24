import React from 'react';
import LinkIcon from '@/../public/svg/link.svg';
import { isValidUrl } from '@/utils/urlValidation';
import ToastSelect from './ToastSelect';

interface LinkButtonProps {
  url: string;
}

const LinkContainer = 'inline-flex items-center gap-2 rounded-10 px-3 py-2 sm:h-6.5';
const LinkText = 'text-md-regular sm:text-xs-regular';

const LinkButton = ({ url }: LinkButtonProps) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    ToastSelect({ type: 'check' });
  };

  if (!isValidUrl(url)) {
    return (
      <div className={`${LinkContainer} bg-secondary-red-100`}>
        <span className={`${LinkText} truncate text-secondary-red-200`}>경로를 확인해주세요.</span>
      </div>
    );
  }

  return (
    <div
      className={`${LinkContainer} cursor-pointer bg-primary-green-100`}
      onClick={handleCopyToClipboard}
    >
      <LinkIcon />
      <div className={`${LinkText} text-primary-green-200 `}>{url}</div>
    </div>
  );
};

export default LinkButton;
