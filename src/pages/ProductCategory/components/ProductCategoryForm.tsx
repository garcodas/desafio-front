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
import {
  ProductCategoryFormValues,
  productCategorySchema,
} from "@/lib/schemas/productCategory";
import { createCategory, updateCategory } from "@/services/categoryService";
import { getStatuses } from "@/services/statusService";
import { RootState } from "@/store/store";
import { CreateCateogory, UpdateCategory } from "@/types/productCategory";
import { Status } from "@/types/status";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

interface CategoryFormProps {
  Id?: number;
  initialData?: ProductCategoryFormValues;
  onSuccess?: () => void;
}
const ProductCategoryForm = ({
  initialData,
  onSuccess,
  Id,
}: CategoryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.user);

  const form = useForm<ProductCategoryFormValues>({
    resolver: yupResolver(productCategorySchema),
    defaultValues: initialData || {
      Name: "",
    },
  });

  async function onSubmit(values: ProductCategoryFormValues) {
    setIsSubmitting(true);
    try {
      if (!Id) {
        const createCategoryData: CreateCateogory = {
          ...values,
          StatusId: parseInt(values.StatusId),
          UserId: user?.Id || 0,
        };

        await createCategory(createCategoryData);

        toast({
          title: "Categoria creada",
          description: "La categoria ha sido creada con exito",
        });
      } else {
        const updateCategoryData: UpdateCategory = {
          Name: values.Name,
          StatusId: parseInt(values.StatusId),
        };

        await updateCategory(Id ?? 0, updateCategoryData);
        toast({
          title: "Categoria editada",
          description: "La categoria ha sido editada con exito",
        });
      }
      form.reset();
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
    } finally {
      setIsSubmitting(false);
    }
  }

  const fetchSatatuses = useCallback(async () => {
    // Fetch statuses from API
    const response: { data: Status[] } = await getStatuses();
    setStatuses(response.data);
  }, []);

  useEffect(() => {
    fetchSatatuses();
  }, [fetchSatatuses]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            ? "Enviando Categoria..."
            : initialData
            ? "Acutalizar Categoria"
            : "Crear Categoria"}
        </Button>
      </form>
    </Form>
  );
};

export default ProductCategoryForm;
