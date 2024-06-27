import { create } from 'zustand';

type userInfo = {
  id: number;
  name: string;
};

interface userInfoProps {
  user: userInfo | null; // 유저 정보
  saveUser: (user: userInfo) => void; // 유저 정보 저장
  isLogin: boolean; // 로그인 여부
  checkLogin: () => void; // 로그인 여부 확인 함수
  logout: () => void; // 로그아웃
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const useUserStore = create<userInfoProps>((set) => {
  return {
    user: null,
    isLogin: false,
    saveUser: (user) => {
      set({ user, isLogin: true });
    },
    checkLogin: () => {
      const accessToken = getCookie('accessToken');
      if (accessToken) {
        set({ isLogin: true });
      } else {
        set({ user: null, isLogin: false });
      }
    },
    logout: () => {
      deleteCookie('accessToken');
      set({ user: null, isLogin: false });
    },
  };
});
