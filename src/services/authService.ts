import { VITE_API_URL } from "@/config/envs";
import { LoginUser, LoginUserResponse, RegisterUser } from "@/types/user";
import axios from "axios";
import apiClient from "./apiService";

const registerUser = async (data: RegisterUser) => {
  return await axios.post(`${VITE_API_URL}/auth/signup`, data);
};

const loginUser = async (data: LoginUser) => {
  return await axios.post<{ data: LoginUserResponse }>(
    `${VITE_API_URL}/auth/signin`,
    data
  );
};

const logOut = async () => {
  return await apiClient.post(`/auth/signout`);
};

export { registerUser, loginUser, logOut };
