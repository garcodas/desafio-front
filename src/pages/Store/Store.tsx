import { Suspense } from "react";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";

const Store = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Nuestros Productos</h1>
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid />
        </Suspense>
      </div>
      <Cart />
    </div>
  );
};

export default Store;
