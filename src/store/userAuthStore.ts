import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCookie, deleteCookie } from '@/utils/cookieUtil';
import { UserResponse, DetailProfileResponse } from '@/types/apiType';

interface AuthProps {
  user: UserResponse | null; // 유저 정보
  userProfile: DetailProfileResponse | null; // 유저 프로필 정보
  saveUser: (user: UserResponse) => void; // 유저 정보 저장
  saveUserProfile: (userProfile: DetailProfileResponse) => void; // 유저 프로필 정보 저장
  isLogin: boolean; // 로그인 여부
  checkLogin: () => void; // 로그인 여부 확인 함수
  logout: () => void; // 로그아웃
}

export const useAuthStore = create(
  persist<AuthProps>(
    (set) => {
      return {
        user: null,
        userProfile: null,
        isLogin: false,
        saveUser: (user) => {
          set({ user, isLogin: true });
        },
        saveUserProfile: (userProfile) => {
          set({ userProfile, isLogin: true });
        },
        checkLogin: () => {
          const accessToken = getCookie('accessToken');
          const refreshToken = getCookie('refreshToken');
          if (accessToken && refreshToken) {
            set({ isLogin: true });
          } else {
            set({ user: null, userProfile: null, isLogin: false });
          }
        },
        logout: () => {
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
          set({ user: null, userProfile: null, isLogin: false });
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
