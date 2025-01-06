import { Product } from "./product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export type { ProductCardProps };
