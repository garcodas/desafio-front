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
import { AddProductModalProps } from "@/types/product";

const AddProductModal = ({ onSuccess }: AddProductModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    onSuccess?.();
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Nuevo Producto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
          <DialogDescription>
            Crea un nuevo producto aquí. Haz clic en Guardar cuando hayas
            terminado.
          </DialogDescription>
        </DialogHeader>
        <ProductForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
