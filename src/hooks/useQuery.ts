/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { axiosRequester } from '@/lib/axios';

interface RequestConfig {
  options: AxiosRequestConfig<any>;
  deps?: any[];
  includeAuth?: boolean;
}

const useQuery = <T>({ options, deps = [], includeAuth = false }: RequestConfig) => {
  const [data, setData] = useState<AxiosResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const response = await axiosRequester({ ...options }, includeAuth);

        if (includeAuth) {
          const accessToken = response?.data?.accessToken;
          const refreshToken = response?.data?.refreshToken;
  
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
    })();
  }, deps);

  return { data, isLoading, isError, statusCode };
};

export default useQuery;
