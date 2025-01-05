import * as Yup from "yup";

export const createClientSchema = Yup.object().shape({
  CompanyName: Yup.string().required("El nombre de la compañía es obligatorio"),
  TradeName: Yup.string().required("El nombre comercial es obligatorio"),
  DeliveryAddress: Yup.string().required(
    "La dirección de entrega es obligatorio"
  ),
  Phone: Yup.string().required("El teléfono es obligatorio"),
  Email: Yup.string()
    .required("El correco electrónico es obligatorio")
    .email("El correo electrónico no es válido"),
});

export type ClientFormValues = Yup.InferType<typeof createClientSchema>;
