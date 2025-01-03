import * as Yup from "yup";

export const productCategorySchema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  StatusId: Yup.string().required("Status ID is required"),
});

export type ProductCategoryFormValues = Yup.InferType<
  typeof productCategorySchema
>;
