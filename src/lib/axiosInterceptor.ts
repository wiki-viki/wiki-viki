import { axiosInstance } from './axios';

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = document.cookie
        .split('; ')
        .find((row) => {
          return row.startsWith('refreshToken=');
        })
        ?.split('=')[1];

      const response = await axiosInstance.post('auth/refresh-token', { refreshToken });

      if (response.status === 200) {
        const newAccessToken = response?.data?.accessToken;
        document.cookie = `accessToken=${newAccessToken}`;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
