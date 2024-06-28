import React from 'react';
import MenuItem from './MenuItem';
import MenuContainer from './MenuContainer';

interface UserMenuProps {
  isOpen: boolean;
  handleClose: () => void;
}

const UserMenu = ({ isOpen, handleClose }: UserMenuProps) => {
  return (
    <MenuContainer isOpen={isOpen}>
      <MenuItem
        onClick={handleClose}
        title="위키목록"
        href="/wikilist"
        className="text-grayscale-600"
      />
      <MenuItem
        onClick={handleClose}
        title="자유게시판"
        href="/boards"
        className="text-grayscale-600"
      />
      <MenuItem onClick={handleClose} title="로그인" href="/login" className="text-grayscale-600" />
    </MenuContainer>
  );
};

export default UserMenu;
