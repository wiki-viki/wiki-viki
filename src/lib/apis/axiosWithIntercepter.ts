import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosWithIntercepter = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

axiosWithIntercepter.interceptors.request.use(
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

    config.url?.includes('/upload')
      ? (config.headers['content-Type'] = 'multipart/form-data')
      : (config.headers['Content-Type'] = 'application/json');

    return config;
  },
  (e) => {
    return Promise.reject(e);
  },
);

axiosWithIntercepter.interceptors.response.use(
  (response) => {
    return response;
  },
  async (e) => {
    const originalRequest = e.config;

    if (e.response && e.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = document.cookie
          .split('; ')
          .find((row) => {
            return row.startsWith('refreshToken=');
          })
          ?.split('=')[1];
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refreshToken: refreshToken,
        });

        const newToken = response.data.accessToken;
        document.cookie = `accessToken=${newToken}`;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosWithIntercepter(originalRequest);
      } catch (e) {
        console.error('토큰 재발급 요청 실패 :', e);
      }
    }

    return Promise.reject(e);
  },
);

export default axiosWithIntercepter;
