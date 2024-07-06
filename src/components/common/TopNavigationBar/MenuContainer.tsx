import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuContainerProps {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}

const MenuContainer = ({ children, isOpen, className = '' }: MenuContainerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`${className} fixed right-3 top-12 z-10 w-[130px] flex-col rounded-10 border border-grayscale-200 bg-white shadow-md lg:right-7 lg:top-[58px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <nav className="mx-[13px] my-[20px]">
            <ul className="flex-col items-center text-center">{children}</ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuContainer;
