import axios, { AxiosResponse } from 'axios';
import {
  ProfileListResponse,
  DetailProfileResponse,
  CreateProfileFormData,
  PingResponse,
  ChangeProfilesFormData,
  PingFormData,
  CodeType,
} from '@/types/apiType';
import { OTHER_TYPE_ERROR_TEXT } from '@/constants/otherTypeErrorText';
import axiosWithIntercepter from '../axiosWithIntercepter';
import axiosDefault from '../axiosDefault';

// 위키 프로필 목록 GET 요청
export const getProfiles = async ({
  page = 1,
  pageSize = 3,
  name = '',
}: {
  page?: number;
  pageSize?: number;
  name?: string;
}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    name: name,
  });

  try {
    const res: AxiosResponse<ProfileListResponse> = await axiosDefault.get(`profiles?${params}`);
    console.log(page, pageSize, name, res.data);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error(OTHER_TYPE_ERROR_TEXT);
    }
  }
};

// 위키 프로필 상세정보 GET 요청
export const getDetailProfiles = async (code: CodeType) => {
  try {
    const res: AxiosResponse<DetailProfileResponse> = await axiosDefault.get(`profiles/${code}`);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error(OTHER_TYPE_ERROR_TEXT);
    }
  }
};

// 위키 프로필 상세정보 핑 GET 요청
export const getPing = async (code: CodeType) => {
  try {
    const res: AxiosResponse<PingResponse> = await axiosDefault.get(`profiles/${code}/ping`);
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error(OTHER_TYPE_ERROR_TEXT);
    }
  }
};

// 위키 프로필 상세정보 POST 요청
export const changeProfile = async (code: CodeType, formData: ChangeProfilesFormData) => {
  try {
    const res: AxiosResponse<DetailProfileResponse> = await axiosWithIntercepter.patch(
      `profiles/${code}`,
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

// 위키 프로필 생성 POST 요청
export const createProfile = async (formData: CreateProfileFormData) => {
  try {
    const res: AxiosResponse<DetailProfileResponse> = await axiosWithIntercepter.post(
      `profiles`,
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

// 위키 프로필 수정 핑 POST 요청
export const postPing = async (code: CodeType, formData: PingFormData) => {
  try {
    const res: AxiosResponse<DetailProfileResponse> = await axiosWithIntercepter.post(
      `profiles/${code}/ping`,
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
