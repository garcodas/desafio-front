import { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { getProductsStore } from "@/services/productService";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { addToCart, toggleChart } from "@/store/slices/cart.slice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const ProductGrid = () => {
  const dispatch: AppDispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const addToCartfnc = (product: Product) => {
    dispatch(addToCart(product));
    toast({
      title: "Producto agregado",
      description: `Tu producto ${product.Name} fue agregado`,
      action: (
        <ToastAction
          onClick={() => {
            dispatch(toggleChart());
          }}
          altText="Try again"
        >
          Revisar carrito
        </ToastAction>
      ),
    });
  };

  const fetchProduct = useCallback(async () => {
    const response = await getProductsStore();

    setProducts(response.data);
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.Id}
          product={product}
          onAddToCart={addToCartfnc}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
