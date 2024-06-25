import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosDefault = axios.create({
  baseURL: API_URL,
});

export default axiosDefault;
