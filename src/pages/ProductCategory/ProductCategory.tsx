import { Category } from "@/types/productCategory";
import AddProductCategoryModal from "./components/AddProductCategoryModal";
import ProductCategoryList from "./components/ProductCategoryList";
import { getCategories } from "@/services/categoryService";
import { useCallback, useEffect, useState } from "react";

const ProductCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    // Fetch categories from API
    const response: { data: Category[] } = await getCategories();

    setCategories(response.data);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSuccess = async () => {
    await fetchCategories();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categorias de Productos</h1>
        <AddProductCategoryModal onSuccess={handleSuccess} />
      </div>
      <ProductCategoryList onSuccess={handleSuccess} categories={categories} />
    </div>
  );
};

export default ProductCategory;
