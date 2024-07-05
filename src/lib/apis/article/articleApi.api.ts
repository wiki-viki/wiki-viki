import axios, { AxiosResponse } from 'axios';
import { ArticleResponse, ArticleListResponse, ArticleFormData } from '@/types/apiType';
import { OTHER_TYPE_ERROR_TEXT } from '@/constants/otherTypeErrorText';
import { OrderType } from '@/constants/orderOption';
import axiosWithIntercepter from '../axiosWithIntercepter';
import axiosDefault from '../axiosDefault';

// 게시글 목록 GET 요청
export const getArticle = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
}: {
  page?: number;
  pageSize?: number;
  orderBy?: OrderType;
  keyword?: string;
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    orderBy: orderBy,
    keyword: keyword,
  });

  try {
    const res: AxiosResponse<ArticleListResponse> = await axiosDefault.get(`articles?${params}`);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error(OTHER_TYPE_ERROR_TEXT);
    }
  }
};

// 게시글 상세 페이지 GET 요청
export const getDetailArticle = async (articleId: number) => {
  try {
    const res: AxiosResponse<ArticleResponse> = await axiosDefault.get(`articles/${articleId}`);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error(OTHER_TYPE_ERROR_TEXT);
    }
  }
};

// 게시글 상세 페이지 POST 요청
export const postArticle = async (formData: ArticleFormData) => {
  try {
    const res: AxiosResponse<ArticleResponse> = await axiosWithIntercepter.post(
      `articles`,
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

// 게시글 상세 페이지 PATCH 요청
export const changeDetailArticle = async (articleId: number, formData: ArticleFormData) => {
  try {
    const res: AxiosResponse<ArticleResponse> = await axiosWithIntercepter.patch(
      `articles/${articleId}`,
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

// // 게시글 상세 페이지 DELETE 요청
export const deleteDetailArticle = async (articleId: number) => {
  try {
    const res: AxiosResponse<ArticleResponse> = await axiosWithIntercepter.delete(
      `articles/${articleId}`,
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

// 게시글 상세 페이지 좋아요 POST 요청
export const postArticleLike = async (articleId: number) => {
  try {
    const res: AxiosResponse<ArticleResponse> = await axiosWithIntercepter.post(
      `articles/${articleId}/like`,
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

// 게시글 상세 페이지 좋아요 DELETE 요청
export const deleteArticleLike = async (articleId: number) => {
  try {
    const res: AxiosResponse<ArticleResponse> = await axiosWithIntercepter.delete(
      `articles/${articleId}/like`,
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
