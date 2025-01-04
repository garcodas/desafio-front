import apiClient from "./apiService";

const getStatuses = async () => {
  return await apiClient.get(`/status`);
};

export { getStatuses };
