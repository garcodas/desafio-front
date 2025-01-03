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
import { Category } from "@/types/productCategory";

interface EditCategoryModalProps {
  category: Category;
  onSuccess: () => void;
}

const EditProductCategoryModal = ({
  category,
  onSuccess,
}: EditCategoryModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
    onSuccess();
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
          <DialogTitle>Editar Categoria</DialogTitle>
          <DialogDescription>
            Realice cambios en la categoría aquí. Haga clic en Guardar cuando
            haya terminado.
          </DialogDescription>
        </DialogHeader>
        <ProductCategoryForm
          Id={category.Id}
          initialData={{
            Name: category.Name,
            StatusId: category.StatusId?.toString() || "",
          }}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductCategoryModal;
