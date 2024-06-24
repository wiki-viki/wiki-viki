import React, { useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className: string;
}

const UserMenu = ({ isOpen, onClose, className }: UserMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent<HTMLElement>) => {
    if (menuRef.current) {
      e.target === menuRef.current && onClose();
    }
  };

  if (typeof window === 'undefined') {
    return <></>;
  }

  const menuClassName = 'mb-2 rounded text-md-regular hover:bg-grayscale-100';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-10 ${className}`}
          onClick={handleClickOutside}
          ref={menuRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed right-4 top-12 z-10 h-[131px] w-[110px] flex-col rounded-10 border border-grayscale-200 bg-white shadow-md lg:right-8 lg:top-16">
            <nav className="mx-[13px] my-[20px]">
              <ul className="flex-col items-center text-center">
                <Link href="/mypage">
                  <li className={`${menuClassName} text-grayscale-600`}>계정 설정</li>
                </Link>
                <Link href="/wiki/code">
                  <li className={`${menuClassName} text-grayscale-600`}>내 위키</li>
                </Link>
                <li className={`${menuClassName} cursor-pointer text-grayscale-400`}>로그아웃</li>
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserMenu;
