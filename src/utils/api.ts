import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  auth: {
    username: "digitels",
    password: "Digitels123!",
  },
});

export interface BaseApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

export default api;
