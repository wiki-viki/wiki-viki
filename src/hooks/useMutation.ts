/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { axiosRequester } from '@/lib/axios';

interface RequestConfig {
  options: AxiosRequestConfig<any>;
  includeAuth?: boolean;
}

type AxiosFetch = <T>(options?: AxiosRequestConfig<T>) => Promise<T | any>;

const useMutation = <T>({ options, includeAuth = false }: RequestConfig) => {
  const [data, setData] = useState<AxiosResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const axiosFetch: AxiosFetch = async (args) => {
    setIsLoading(true);
    setIsError(null);
    setStatusCode(null);

    try {
      const response = await axiosRequester({ ...options, ...args }, includeAuth);

      if (includeAuth) {
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        const userId = response?.data?.user.id;

        if (accessToken && refreshToken) {
          document.cookie = `accessToken=${accessToken}`;
          document.cookie = `refreshToken=${refreshToken}`;
          document.cookie = `userId=${userId}`;
        }
      }

      setData(response);
      return response;
    } catch (err) {
      if (err instanceof AxiosError) {
        setIsError(err.response?.data?.message || err.message);
        setStatusCode(err.response?.status || null);
      }
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, statusCode, axiosFetch };
};

export default useMutation;
