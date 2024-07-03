import React from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/userAuthStore';
import MenuItem from './MenuItem';
import MenuContainer from './MenuContainer';

interface UserMenuProps {
  isOpen: boolean;
  handleClose: () => void;
  isMobile: boolean;
}

const AuthUserMenu = ({ isOpen, handleClose, isMobile }: UserMenuProps) => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const profile = user?.profile;

  const handleCloseWithToast = () => {
    if (!profile) {
      alert('내 위키를 먼저 생성해주세요!');
      handleClose();
    }
  };

  const handleClickLogout = () => {
    logout();
    handleClose();
    router.push('/');
  };

  return (
    <>
      <MenuContainer isOpen={isOpen}>
        {isMobile && (
          <>
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
            <div className="mb-2 border-b" />
          </>
        )}
        <MenuItem
          onClick={handleClose}
          title="계정 설정"
          href="/mypage"
          className="text-grayscale-600"
        />
        <MenuItem
          onClick={handleCloseWithToast}
          title="내 위키"
          href={profile ? `/wiki/${profile?.code}` : `/mypage`}
          className="text-grayscale-600"
        />
        <MenuItem onClick={handleClickLogout} title="로그아웃" className="text-grayscale-400" />
      </MenuContainer>
    </>
  );
};

export default AuthUserMenu;
