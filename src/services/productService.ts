import { Product } from "@/types/product";
import apiClient from "./apiService";

const createProduct = async (product: Product) => {
  return await apiClient.post("/product", product);
};

const getProducts = async () => {
  return await apiClient.get("/product");
};

const deleteProduct = async (id: number) => {
  return await apiClient.delete(`/product/${id}`);
};

export { createProduct, getProducts, deleteProduct };
