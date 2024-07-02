import React from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/userAuthStore';
import { StyledToastContainer } from '@/styles/ToastStyle';
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

  const handleCustomClose = () => {
    if (!profile) {
      ToastSelect({ type: 'error', message: '위키를 먼저 생성해주세요.' });
    }
    handleClose();
  };

  const handleClickLogout = () => {
    logout();
    handleClose();
    router.push('/');
  };

  return (
    <>
      <StyledToastContainer limit={1} />
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
          onClick={handleCustomClose}
          title="내 위키"
          href={profile ? `/wiki/${profile?.code}` : `/`}
          className="text-grayscale-600"
        />
        <MenuItem onClick={handleClickLogout} title="로그아웃" className="text-grayscale-400" />
      </MenuContainer>
    </>
  );
};

export default AuthUserMenu;
