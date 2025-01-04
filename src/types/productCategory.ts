import { ProductCategoryFormValues } from "@/lib/schemas/productCategory";
import { Status } from "./status";

interface Category extends ProductCategoryFormValues {
  Id: number;
  Status: Status;
}

interface CreateCateogory {
  UserId: number;
  Name: string;
  StatusId: number;
}

interface UpdateCategory {
  Name: string;
  StatusId: number;
}

interface CategoryListProps {
  categories: Category[];
  onSuccess?: () => void;
}

interface AddProductCategoryModalProps {
  onSuccess?: () => void;
}

export type {
  Category,
  CategoryListProps,
  CreateCateogory,
  UpdateCategory,
  AddProductCategoryModalProps,
};
