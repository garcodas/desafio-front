import { ProductFormValues } from "@/lib/schemas/product";
import { Status } from "./status";
import { Category } from "./productCategory";

interface Product {
  Id?: number;
  Name: string;
  Brand: string;
  BarCode: string;
  Stock: number;
  Price: number;
  ImageUrl: string;
  StatusId: number;
  UserId: number;
  ProductCategoryId: number;
  CreatedAt?: Date;
  ModifiedAt?: Date;
  Status?: Status;
  ProductCategory?: Category;
  OrderQty?: number;
}

interface ProductListProps {
  products: Product[];
  onSuccess?: () => void;
}

interface AddProductModalProps {
  onSuccess: () => void;
}

interface ProductFormProps {
  Id?: number;
  initialData?: ProductFormValues | Partial<ProductFormValues>;
  onSuccess?: () => void;
}

export type {
  Product,
  ProductListProps,
  AddProductModalProps,
  ProductFormProps,
};
