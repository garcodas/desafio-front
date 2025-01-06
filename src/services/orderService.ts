import { Order } from "@/types/order";
import apiClient from "./apiService";

const createOrder = async (order: Order) => {
  return await apiClient.post("/order", order);
};

const getOrdersByUserId = async (userId: number) => {
  return await apiClient.get(`/order/byUserId/${userId}`);
};

const getOrders = async () => {
  return await apiClient.get("/order");
};

export { createOrder, getOrders, getOrdersByUserId };
