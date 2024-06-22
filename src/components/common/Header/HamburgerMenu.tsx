import React, { MouseEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HamburgerMenuButtons from './HamburgerMenuButtons';

interface HamburgerMenuProps {
  isOpen: boolean;
  isLogin: boolean;
  onClose: () => void;
}

const HamburgerMenu = ({ isOpen, isLogin, onClose }: HamburgerMenuProps) => {
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
          className="fixed inset-0 z-10 flex items-center justify-center bg-grayscale-500/30"
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
