import axios, { AxiosResponse } from 'axios';
import { UserResponse, PasswordFormData } from '@/types/apiType';
import axiosWithIntercepter from '../axiosWithIntercepter';

export const getMyInfo = async () => {
  try {
    const res: AxiosResponse<UserResponse> = await axiosWithIntercepter.get(`user/me`);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error('예상치 못한 오류가 발생하였습니다. 관리자에게 문의하세요!');
    }
  }
};

export const changePassword = async (formData: PasswordFormData) => {
  try {
    const res: AxiosResponse<UserResponse> = await axiosWithIntercepter.patch(
      `user/me/password`,
      formData,
    );
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error('예상치 못한 오류가 발생하였습니다. 관리자에게 문의하세요!');
    }
  }
};
