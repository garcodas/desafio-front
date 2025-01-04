import apiClient from "./apiService";

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  return await apiClient.post("/uploads/product-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { uploadImage };
