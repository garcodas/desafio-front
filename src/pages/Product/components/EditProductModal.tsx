import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ProductForm from "./ProductForm";
import { Product } from "@/types/product";

interface EditProductModalProps {
  product: Product;
  onSuccess: (updatedProduct: Product) => void;
}

const EditProductModal = ({ product, onSuccess }: EditProductModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    onSuccess(product);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>
            Realice cambios en el producto aquí. Haga clic en Guardar cuando
            haya terminado.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          Id={product.Id}
          initialData={product}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
