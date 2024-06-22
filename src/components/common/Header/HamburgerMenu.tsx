import React from 'react';

interface HamburgerMenuProps {
  isOpen: boolean;
  handleClose: () => void;
}

const HamburgerMenu = ({ isOpen, handleClose }: HamburgerMenuProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-grayscale-500/30">
          <button onClick={handleClose}>닫기</button>
          햄버거 메뉴
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
