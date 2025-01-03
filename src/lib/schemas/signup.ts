import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  FullName: Yup.string().required("Tu nombre es obligatorio"),
  Password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
  BirthDate: Yup.date().required("Tu fecha de nacimiento es obligatoria"),
  DeliveryAddress: Yup.string().required(
    "La dirección de entrega es obligatoria"
  ),
  Phone: Yup.string().required("Tu número de teléfono es obligatorio"),
  Email: Yup.string()
    .required("Tu correo electrónico es obligatorio")
    .email("El correo electrónico no es válido"),
});

export type SignUpFormValues = Yup.InferType<typeof signupSchema>;
