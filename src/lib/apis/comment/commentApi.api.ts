import axios, { AxiosResponse } from 'axios';
import { CommentListResponse, CommentResponse, CommentFormData } from '@/types/apiType';
import { OTHER_TYPE_ERROR_TEXT } from '@/constants/otherTypeErrorText';
import axiosWithIntercepter from '../axiosWithIntercepter';
import axiosDefault from '../axiosDefault';

// 게시글 상세 페이지 댓글 GET 요청
export const getComment = async (articleId: number, limit: number, cursor?: number | null) => {
  try {
    const res: AxiosResponse<CommentListResponse> = await axiosDefault.get(
      `articles/${articleId}/comments`,
      {
        params: {
          limit,
          cursor,
        },
      },
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

// 게시글 상세 페이지 댓글 POST 요청
export const createComment = async (articleId: number, formData: CommentFormData) => {
  try {
    const res: AxiosResponse<CommentResponse> = await axiosWithIntercepter.post(
      `articles/${articleId}/comments`,
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

// 게시글 상세 페이지 댓글 PATCH 요청
export const updateComment = async (commentId: number, formData: CommentFormData) => {
  try {
    const res: AxiosResponse<CommentResponse> = await axiosWithIntercepter.patch(
      `comments/${commentId}`,
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

// 게시글 상세 페이지 댓글 DELETE 요청
export const deleteComment = async (commentId: number) => {
  try {
    const res = await axiosWithIntercepter.delete(`comments/${commentId}`);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error('예상치 못한 오류가 발생하였습니다. 관리자에게 문의하세요!');
    }
  }
};
