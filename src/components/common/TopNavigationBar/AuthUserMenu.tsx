import React from 'react';
import MenuItem from './MenuItem';
import MenuContainer from './MenuContainer';

interface UserMenuProps {
  isOpen: boolean;
}

const AuthUserMenu = ({ isOpen }: UserMenuProps) => {
  const handleClickLogout = () => {
    // [TODO]
    // 로그아웃 기능 구현
  };

  return (
    <MenuContainer isOpen={isOpen}>
      <MenuItem title="위키목록" href="/wikilist" className="text-grayscale-600 md:hidden" />
      <MenuItem title="자유게시판" href="/boards" className="text-grayscale-600 md:hidden" />
      <div className="mb-2 border-b md:hidden" />
      <MenuItem title="계정 설정" href="/mypage" className="text-grayscale-600" />
      <MenuItem title="내 위키" href="/wiki/test" className="text-grayscale-600" />
      <MenuItem onClick={handleClickLogout} title="로그아웃" className="text-grayscale-400" />
    </MenuContainer>
  );
};

export default AuthUserMenu;
