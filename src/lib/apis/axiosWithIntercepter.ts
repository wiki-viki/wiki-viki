import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosWithInterceptor = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

axiosWithInterceptor.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split('; ')
      .find((row) => {
        return row.startsWith('accessToken=');
      })
      ?.split('=')[1];

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (
      config.url?.includes('/upload') ||
      (config.url?.includes('/profiles') && config.method === 'patch')
    ) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosWithInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = document.cookie
          .split('; ')
          .find((row) => {
            return row.startsWith('refreshToken=');
          })
          ?.split('=')[1];

        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh-token`, {
            refreshToken: refreshToken,
          });

          const newToken = response.data.accessToken;
          document.cookie = `accessToken=${newToken}`;

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosWithInterceptor(originalRequest);
        }
      } catch (refreshError) {
        console.error('토큰 재발급 요청 실패:', refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosWithInterceptor;
