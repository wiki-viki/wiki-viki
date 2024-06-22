import React, { MouseEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CommonButton from '../CommonButton';

interface HamburgerMenuProps {
  isOpen: boolean;
  isLogin: boolean;
  onClose: () => void;
}

const HamburgerMenu = ({ isOpen, isLogin, onClose }: HamburgerMenuProps) => {
  const menuRef = useRef(null);

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
        <motion.aside
          className="fixed inset-0 z-10 flex items-center justify-center bg-grayscale-500/30"
          onClick={handleClickOutside}
          ref={menuRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-[180px] flex-col">
            {isLogin ? (
              <>
                <CommonButton
                  variant="secondary"
                  className="w-full bg-white shadow-lg hover:bg-grayscale-100"
                >
                  계정설정
                </CommonButton>
                <CommonButton variant="primary" className="mt-5 w-full shadow-lg">
                  내 위키
                </CommonButton>
                <CommonButton
                  variant="secondary"
                  className="mt-5 w-full  bg-white shadow-lg hover:bg-grayscale-100"
                >
                  로그아웃
                </CommonButton>
                <CommonButton variant="primary" className="mt-5 w-full shadow-lg">
                  위키목록
                </CommonButton>
                <CommonButton variant="primary" className="mt-5 w-full shadow-lg">
                  자유게시판
                </CommonButton>
              </>
            ) : (
              <>
                <CommonButton
                  variant="secondary"
                  className="w-full bg-white shadow-lg hover:bg-grayscale-100"
                >
                  로그인
                </CommonButton>
                <CommonButton variant="primary" className="mt-5 w-full shadow-lg">
                  위키목록
                </CommonButton>
                <CommonButton variant="primary" className="mt-5 w-full shadow-lg">
                  자유게시판
                </CommonButton>
              </>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default HamburgerMenu;
