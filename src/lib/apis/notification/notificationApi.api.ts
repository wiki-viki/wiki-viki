import axios, { AxiosResponse } from 'axios';
import { NotificationListResponse, NotificationResponse } from '@/types/apiType';
import { OTHER_TYPE_ERROR_TEXT } from '@/constants/otherTypeErrorText';
import axiosWithIntercepter from '../axiosWithIntercepter';

// 알림 GET 요청
export const getNotification = async ({
  page = 1,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  try {
    const res: AxiosResponse<NotificationListResponse> = await axiosWithIntercepter.get(
      `notifications?${params}`,
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

// 알림 DELETE 요청
export const deleteNotification = async (id: number) => {
  try {
    const res: AxiosResponse<NotificationResponse> = await axiosWithIntercepter.get(
      `notifications/${id}`,
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
