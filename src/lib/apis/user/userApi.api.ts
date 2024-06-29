import axios, { AxiosResponse } from 'axios';
import { UserResponse, PasswordFormData } from '@/types/apiType';
import { OTHER_TYPE_ERROR_TEXT } from '@/constants/otherTypeErrorText';
import axiosWithIntercepter from '../axiosWithIntercepter';

export const getMyInfo = async () => {
  try {
    const res: AxiosResponse<UserResponse> = await axiosWithIntercepter.get(`users/me`);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error(OTHER_TYPE_ERROR_TEXT);
    }
  }
};

export const changePassword = async (formData: PasswordFormData) => {
  try {
    const res: AxiosResponse<UserResponse> = await axiosWithIntercepter.patch(
      `users/me/password`,
      formData,
    );
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error(OTHER_TYPE_ERROR_TEXT);
    }
  }
};
