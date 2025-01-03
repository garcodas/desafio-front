import { VITE_API_URL } from "@/config/envs";
import apiClient from "./apiService";
import { CreateCateogory, UpdateCategory } from "@/types/productCategory";

const getCategories = async () => {
  return await apiClient.get(`${VITE_API_URL}/product-category`);
};

const createCategory = async (createCategory: CreateCateogory) => {
  return await apiClient.post(
    `${VITE_API_URL}/product-category`,
    createCategory
  );
};

const deleteCategory = async (id: number) => {
  return await apiClient.delete(`${VITE_API_URL}/product-category/${id}`);
};

const updateCategory = async (id: number, updateCategory: UpdateCategory) => {
  return await apiClient.patch(
    `${VITE_API_URL}/product-category/${id}`,
    updateCategory
  );
};
export { getCategories, createCategory, deleteCategory, updateCategory };
