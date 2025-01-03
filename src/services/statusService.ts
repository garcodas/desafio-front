import { VITE_API_URL } from "@/config/envs";
import apiClient from "./apiService";

const getStatuses = async () => {
  return await apiClient.get(`${VITE_API_URL}/status`);
};

export { getStatuses };
