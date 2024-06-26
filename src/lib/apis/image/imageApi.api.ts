import axios, { AxiosResponse } from 'axios';
import { OTHER_TYPE_ERROR_TEXT } from '@/constants/otherTypeErrorText';
import axiosWithIntercepter from '../axiosWithIntercepter';

export type imageResponse = {
  url: string;
};

export type ImageData = {
  image?: string | File | null;
};

// 이미지 업로드 요청
const getImageUrl = async (image: ImageData) => {
  try {
    const response: AxiosResponse<imageResponse> = await axiosWithIntercepter.post(
      '/images/upload',
      image,
    );
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error(OTHER_TYPE_ERROR_TEXT);
    }
  }
};

export default getImageUrl;
