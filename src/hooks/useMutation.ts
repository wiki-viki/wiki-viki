/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { axiosRequester } from '@/lib/axios';

interface RequestConfig {
  options: AxiosRequestConfig<any>;
  includeAuth?: boolean;
}

type Mutation = <T>(options?: AxiosRequestConfig<T>) => Promise<T | any>;

const useMutation = ({ options, includeAuth = false }: RequestConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const mutation: Mutation = async (args) => {
    setIsLoading(true);
    setIsError(null);
    setStatusCode(null);

    try {
      const response = await axiosRequester({ ...options, ...args }, includeAuth);

      if (includeAuth) {
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;

        if (accessToken && refreshToken) {
          document.cookie = `accessToken=${accessToken}`;
          document.cookie = `refreshToken=${refreshToken}`;
        }
      }

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

  return { isLoading, isError, statusCode, mutation };
};

export default useMutation;
