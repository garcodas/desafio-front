import { VITE_API_URL } from "@/config/envs";
import { AUTH_STORAGE_TOKEN_NAME } from "@/utils/constants/auth.constant";
import axios from "axios";

const apiClient = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_STORAGE_TOKEN_NAME);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
