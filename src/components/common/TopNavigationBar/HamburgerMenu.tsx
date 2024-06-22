import React, { MouseEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HamburgerMenuButtons from './HamburgerMenuButtons';

interface HamburgerMenuProps {
  isOpen: boolean;
  isLogin: boolean;
  onClose: () => void;
  className: string;
}

const HamburgerMenu = ({ isOpen, isLogin, onClose, className }: HamburgerMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent<HTMLElement>) => {
    if (menuRef.current) {
      e.target === menuRef.current && onClose();
    }
  };

  if (typeof window === 'undefined') {
    return <></>;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`center fixed inset-0 z-10 bg-grayscale-500/30 ${className}`}
          onClick={handleClickOutside}
          ref={menuRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <HamburgerMenuButtons isLogin={isLogin} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HamburgerMenu;
