import apiClient from "./apiService";

const getUsers = async () => {
  return await apiClient.get("/user");
};

const changeUserStatus = async (userId: number, statusId: number) => {
  return await apiClient.put(`/user/${userId}/${statusId}`);
};

export { getUsers, changeUserStatus };
