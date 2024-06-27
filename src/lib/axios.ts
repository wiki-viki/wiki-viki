import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

type AxiosRequester = <T>(options: AxiosRequestConfig<T>, includeAuth?: boolean) => Promise<AxiosResponse<T>>;

export const axiosRequester: AxiosRequester = async (options, includeAuth) => {
  const headers  = { ...options.headers } as AxiosRequestHeaders;

  if (includeAuth) {
    const accessToken = document.cookie
      .split('; ')
      .find((row) => {
        return row.startsWith('accessToken=');
      })
      ?.split('=')[1];

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  const client = await axiosInstance({ ...options, headers });

  return client;
};
