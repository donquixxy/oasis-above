import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  auth: {
    username: import.meta.env.VITE_AUTH_USERNAME,
    password: import.meta.env.VITE_AUTH_PASSWORD,
  },
});

export interface BaseApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

export default api;
