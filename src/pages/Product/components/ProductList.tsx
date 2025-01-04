import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import EditProductModal from "./EditProductModal";
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
import numeral from "numeral";
import { VITE_API_URL } from "@/config/envs";
import { deleteProduct } from "@/services/productService";
import { useToast } from "@/hooks/use-toast";
import { ProductListProps } from "@/types/product";

const ProductList = ({
  products: initialProducts,
  onSuccess,
}: ProductListProps) => {
  const [products, setProducts] = useState(initialProducts);
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
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

  const returnImgUrl = (url: string) => {
    return `${VITE_API_URL}${url}`;
  };

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.Id}>
              <TableCell>{product.Id}</TableCell>
              <TableCell>
                <div className="relative w-16 h-16">
                  <img
                    src={returnImgUrl(product.ImageUrl)}
                    alt={`Image of ${product.Name}`}
                    className="rounded-md object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>{product.Name}</TableCell>
              <TableCell>{product.Brand}</TableCell>
              <TableCell>{product.Stock}</TableCell>
              <TableCell>
                Q {numeral(product.Price).format("Q0,0.00")}
              </TableCell>
              <TableCell>
                <EditProductModal
                  product={product}
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
                        Esta acción no se puede deshacer. Eliminará el producto
                        de forma permanente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(product.Id ?? 0)}
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

export default ProductList;
