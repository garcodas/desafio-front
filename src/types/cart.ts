import { Product } from "./product";

interface CartState {
  items: Product[];
  isOpen: boolean;
}

export type { CartState };
