import AddProductModal from "./components/AddProductModal";
import ProductList from "./components/ProductList";
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import { Product as ProductType } from "@/types/product";

const Product = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const fetchProducts = useCallback(async () => {
    const response: { data: ProductType[] } = await getProducts();

    setProducts(response.data);
  }, []);

  const handleSuccess = async () => {
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <AddProductModal onSuccess={handleSuccess} />
      </div>
      <ProductList products={products} onSuccess={handleSuccess} />
    </div>
  );
};

export default Product;
