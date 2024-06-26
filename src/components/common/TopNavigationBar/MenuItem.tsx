import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MenuItemProps {
  href?: string;
  title: string;
  className?: string;
  onClick?: () => void;
}

const menuClassName = 'mb-2 rounded text-md-regular hover:bg-grayscale-100 cursor-pointer';
const activeLinkClassNames = 'font-bold text-primary-green-300';

const MenuItem = ({ href, title, className = '', onClick }: MenuItemProps) => {
  const { asPath } = useRouter();

  if (href) {
    return (
      <Link href={href} rel="preload">
        <li className={`${className} ${menuClassName} ${asPath === href && activeLinkClassNames}`}>
          {title}
        </li>
      </Link>
    );
  }
  return (
    <li onClick={onClick} className={`${className} ${menuClassName}`}>
      {title}
    </li>
  );
};

export default MenuItem;
