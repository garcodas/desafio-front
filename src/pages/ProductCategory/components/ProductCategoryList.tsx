import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import EditProductCategoryModal from "./EditProductCategoryModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CategoryListProps } from "@/types/productCategory";
import { useToast } from "@/hooks/use-toast";
import { deleteCategory } from "@/services/categoryService";

const ProductCategoryList = ({
  categories: initialCategories,
  onSuccess,
}: CategoryListProps) => {
  const [categories, setCategories] = useState(initialCategories);
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any).response?.data?.error ||
          "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleUpdateSuccess = () => {
    onSuccess?.();
  };

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.Id}>
              <TableCell>{category.Id}</TableCell>
              <TableCell>{category.Name}</TableCell>
              <TableCell>{category.Status.Name}</TableCell>
              <TableCell>
                <EditProductCategoryModal
                  category={category}
                  onSuccess={handleUpdateSuccess}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="ml-2">
                      Eliminar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        ¿Estas seguro de eliminar?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Eliminará la categoría
                        de forma permanente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(category.Id)}
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductCategoryList;
