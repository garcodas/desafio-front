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
import ProductCategoryForm from "./ProductCategoryForm";
import { AddProductCategoryModalProps } from "@/types/productCategory";

const AddProductCategoryModal = ({
  onSuccess,
}: AddProductCategoryModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    onSuccess?.();
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Nueva Categoria</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva Categoria</DialogTitle>
          <DialogDescription>
            Crea una nueva categoría de producto aquí. Haz clic en Guardar
            cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <ProductCategoryForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductCategoryModal;
