import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCookie, deleteCookie } from '@/utils/cookieUtil';
import { UserResponse } from '@/types/apiType';

interface AuthProps {
  user: UserResponse | null; // 유저 정보
  saveUser: (user: UserResponse) => void; // 유저 정보 저장
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
          deleteCookie('userId');
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
