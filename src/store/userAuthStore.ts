import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCookie, deleteCookie } from '@/utils/cookieUtil';

export type userInfo = {
  id: number;
  name: string;
};

interface AuthProps {
  user: userInfo | null; // 유저 정보
  saveUser: (user: userInfo) => void; // 유저 정보 저장
  isLogin: boolean; // 로그인 여부
  checkLogin: () => void; // 로그인 여부 확인 함수
  logout: () => void; // 로그아웃
}

export const useAuthStore = create(
  persist<AuthProps>(
    (set) => {
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
    },
    {
      name: 'authStore',
      getStorage: () => {
        return localStorage;
      },
    },
  ),
);
