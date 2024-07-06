import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'zustand';
import { useAuthStore } from '@/store/userAuthStore';
import useBoolean from '@/hooks/useBoolean';
import ToastSelect from '../ToastSelect';
import ConfirmModal from '../ConfirmModal';
import MenuItem from './MenuItem';
import MenuContainer from './MenuContainer';

interface UserMenuProps {
  isOpen: boolean;
  handleClose: () => void;
  isMobile: boolean;
}

const AuthUserMenu = ({ isOpen, handleClose, isMobile }: UserMenuProps) => {
  const router = useRouter();
  const user = useStore(useAuthStore, (state) => {
    return state.user;
  });
  const userProfile = useStore(useAuthStore, (state) => {
    return state.userProfile;
  });
  const { value, handleOn, handleOff } = useBoolean();

  const profileCode = userProfile?.code || user?.profile?.code;

  const handleCreateWiki = () => {
    handleClose();
  };

  const handleClickMyWiki = () => {
    if (!profileCode) {
      setTimeout(() => {
        ToastSelect({ type: 'error', message: '내 위키를 먼저 생성해주세요!' });
      }, 50);
      handleClose();
    } else {
      handleClose();
    }
  };

  const handleClickLogout = () => {
    handleOff();
    useAuthStore.getState().logout();
    handleClose();
    router.push('/');
  };

  return (
    <>
      {' '}
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
          onClick={handleCreateWiki}
          title="위키 생성하기"
          href="/mypage"
          className="text-grayscale-600"
        />
        <MenuItem
          onClick={handleClickMyWiki}
          title="내 위키"
          href={profileCode ? `/wiki/${profileCode}` : '/mypage'}
          className="text-grayscale-600"
          disableActive={!profileCode}
        />
        <MenuItem
          onClick={handleClose}
          title="비밀번호 재설정"
          href="/reset-password"
          className="text-grayscale-600"
        />
        <MenuItem onClick={handleOn} title="로그아웃" className="text-grayscale-400" />
      </MenuContainer>
      <ConfirmModal
        title="로그아웃"
        message="정말 로그아웃 하시겠습니까?"
        isOpen={value}
        onCancel={handleOff}
        onConfirm={handleClickLogout}
      />
    </>
  );
};

export default AuthUserMenu;
