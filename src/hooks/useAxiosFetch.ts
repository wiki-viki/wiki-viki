/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line react-hooks/exhaustive-deps
import { useEffect, useState } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { axiosRequester } from '@/lib/axios';

interface RequestConfig {
  options: AxiosRequestConfig<any>;
  skip?: boolean;
  deps?: any[];
  includeAuth?: boolean;
}

type AxiosFetch = <T>(options?: AxiosRequestConfig<T>) => Promise<T | any>;

const useAxiosFetch = <T>({
  options,
  skip = false,
  deps = [],
  includeAuth = false,
}: RequestConfig) => {
  const [data, setData] = useState<AxiosResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const axiosFetch: AxiosFetch = async (args) => {
    setIsLoading(true);
    setStatusCode(null);

    try {
      const response = await axiosRequester({ ...options, ...args }, includeAuth);

      if (includeAuth) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;

        if (accessToken && refreshToken) {
          document.cookie = `accessToken=${accessToken}`;
          document.cookie = `refreshToken=${refreshToken}`;
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

  useEffect(() => {
    if (skip) {
      return;
    }

    axiosFetch();
  }, deps);

  return { data, isLoading, isError, statusCode, axiosFetch };
};

export default useAxiosFetch;
