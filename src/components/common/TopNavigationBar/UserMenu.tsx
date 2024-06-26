import React from 'react';
import MenuItem from './MenuItem';
import MenuContainer from './MenuContainer';

interface UserMenuProps {
  isOpen: boolean;
}

const UserMenu = ({ isOpen }: UserMenuProps) => {
  return (
    <MenuContainer isOpen={isOpen} className="md:hidden">
      <MenuItem title="위키목록" href="/wikilist" className="text-grayscale-600 md:hidden" />
      <MenuItem title="자유게시판" href="/boards" className="text-grayscale-600 md:hidden" />
      <MenuItem title="로그인" href="/login" className="text-grayscale-600" />
    </MenuContainer>
  );
};

export default UserMenu;
