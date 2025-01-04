import apiClient from "./apiService";
import { CreateCateogory, UpdateCategory } from "@/types/productCategory";

const getCategories = async () => {
  return await apiClient.get(`/product-category`);
};

const createCategory = async (createCategory: CreateCateogory) => {
  return await apiClient.post(`/product-category`, createCategory);
};

const deleteCategory = async (id: number) => {
  return await apiClient.delete(`/product-category/${id}`);
};

const updateCategory = async (id: number, updateCategory: UpdateCategory) => {
  return await apiClient.patch(`/product-category/${id}`, updateCategory);
};
export { getCategories, createCategory, deleteCategory, updateCategory };
