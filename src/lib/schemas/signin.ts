import * as Yup from "yup";

export const signinSchema = Yup.object().shape({
  Password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),

  Email: Yup.string()
    .required("Tu correo electrónico es obligatorio")
    .email("El correo electrónico no es válido"),
});

export type SignInFormValues = Yup.InferType<typeof signinSchema>;
