import { Client } from "@/types/client";
import apiClient from "./apiService";

const createClient = async (client: Client) => {
  return await apiClient.post(`/client`, client);
};

const getClients = async () => {
  return await apiClient.get("/client");
};

const changeClientStatus = async (clientId: number, statusId: number) => {
  return await apiClient.put(`/client/${clientId}/${statusId}`);
};

const getClientByUserId = async (userId: number) => {
  return await apiClient.get(`/client/byUserId/${userId}`);
};

export { getClients, changeClientStatus, createClient, getClientByUserId };
