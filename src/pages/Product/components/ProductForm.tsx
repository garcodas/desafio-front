import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ProductFormValues, productSchema } from "@/lib/schemas/product";
import { getCategories } from "@/services/categoryService";
import { getStatuses } from "@/services/statusService";
import { uploadImage } from "@/services/uploadImageService";
import { RootState } from "@/store/store";
import { Category } from "@/types/productCategory";
import { Status } from "@/types/status";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { createProduct } from "@/services/productService";
import { Product, ProductFormProps } from "@/types/product";

const ProductForm = ({ initialData, onSuccess }: ProductFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.user);

  const form = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema),
    defaultValues: initialData || {
      Name: "",
      Brand: "",
      BarCode: "",
      Stock: 0,
      Price: 0,
      ProductCategoryId: 0,
      StatusId: 0,
    },
  });

  async function onSubmit(values: ProductFormValues) {
    try {
      setIsSubmitting(true);
      const response: { data: string } = await uploadImage(
        values.Image as File
      );

      const product: Product = {
        Name: values.Name,
        Brand: values.Brand,
        BarCode: values.BarCode,
        Stock: values.Stock,
        Price: values.Price,
        ImageUrl: response.data,
        StatusId: values.StatusId,
        ProductCategoryId: values.ProductCategoryId,
        UserId: user.Id ?? 0,
      };

      await createProduct(product);

      toast({
        title: "Categoria creada",
        description: "La categoria ha sido creada con exito",
      });

      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const fetchSatatuses = useCallback(async () => {
    const response: { data: Status[] } = await getStatuses();
    setStatuses(response.data);
  }, []);

  const fetchCategories = useCallback(async () => {
    // Fetch categories from API
    const response: { data: Category[] } = await getCategories();

    setCategories(response.data);
  }, []);

  useEffect(() => {
    fetchSatatuses();
    fetchCategories();
  }, [fetchSatatuses, fetchCategories]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca del Producto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="BarCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de Barras</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file); // Pass the file object to React Hook Form
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ProductCategoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.Id}
                      value={category.Id.toString()}
                    >
                      {category.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="StatusId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.Id} value={status.Id.toString()}>
                      {status.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting
            ? "Enviando Producto..."
            : initialData
            ? "Actualizar Producto"
            : "Crear Producto"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
