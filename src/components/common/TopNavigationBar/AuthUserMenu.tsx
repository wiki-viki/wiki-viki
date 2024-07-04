import React from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/userAuthStore';
import ToastSelect from '../ToastSelect';
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
      setTimeout(() => {
        ToastSelect({ type: 'error', message: '내 위키를 먼저 생성해주세요!' });
      }, 50);

      handleClose();
    } else {
      handleClose();
    }
  };

  const handleClickLogout = () => {
    logout();
    handleClose();
    router.push('/');
  };

  return (
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
        title="위키 생성하기"
        href="/mypage"
        className="text-grayscale-600"
      />
      <MenuItem
        onClick={handleClose}
        title="내 위키"
        href={profile ? `/wiki/${profile?.code}` : `/mypage`}
        className="text-grayscale-600"
      />
      <MenuItem
        onClick={handleClose}
        title="비밀번호 재설정"
        href="/reset-password"
        className="text-grayscale-600"
      />
      <MenuItem onClick={handleClickLogout} title="로그아웃" className="text-grayscale-400" />
    </MenuContainer>
  );
};

export default AuthUserMenu;
