import * as Yup from "yup";
export const productSchema = Yup.object().shape({
  Name: Yup.string().required("El nombre es requerido"),
  Brand: Yup.string().required("El nombre de la marca es requerido"),
  BarCode: Yup.string().required("El código de barras es requerido"),
  Stock: Yup.number().required("La cantidad en bodega es requerido").min(0),
  Price: Yup.number().required("El precio es requerido").min(0),
  Image: Yup.mixed()
    .required("La imagen es requerida")
    .test(
      "fileType",
      "Solo imágenes jpg, jpeg, png y gif son permitidas",
      (value) => {
        if (!value) return false;
        const allowedTypes = [
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/gif",
        ];
        return value instanceof File && allowedTypes.includes(value.type);
      }
    ),
  ProductCategoryId: Yup.number()
    .integer()
    .required("Product Category ID is required"),
  StatusId: Yup.number().integer().required("Status ID is required"),
});

export type ProductFormValues = Yup.InferType<typeof productSchema>;
