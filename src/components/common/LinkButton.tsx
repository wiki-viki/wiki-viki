import React from 'react';
import Link from 'next/link';
import LinkIcon from '@/../public/svg/link.svg';
import { urlRegex } from '@/utils/urlRegex';

interface LinkButtonProps {
  url: string;
}

const LinkContainer = 'inline-flex items-center gap-2 rounded-10 px-3 py-2 sm:h-6.5';
const LinkText = 'text-md-regular sm:text-xs-regular';

const LinkButton = ({ url }: LinkButtonProps) => {
  if (!urlRegex(url)) {
    return (
      <div className={`${LinkContainer} bg-secondary-red-100`}>
        <span className={`${LinkText} truncate text-secondary-red-200`}>경로를 확인해주세요.</span>
      </div>
    );
  }

  return (
    <div className={`${LinkContainer} bg-primary-green-100`}>
      <LinkIcon />
      <Link
        className={`${LinkText} text-primary-green-200 `}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </Link>
    </div>
  );
};

export default LinkButton;
