import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/services/authService";
import { setCookie } from "@/services/cookieService";
import { setUser } from "@/store/slices/user.slice";
import { AppDispatch } from "@/store/store";
import { LoginUser } from "@/types/user";
import { AUTH_COOKIE_NAME } from "@/utils/constants/auth.constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const signinSchema = Yup.object().shape({
  Password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),

  Email: Yup.string()
    .required("Tu correo electrónico es obligatorio")
    .email("El correo electrónico no es válido"),
});

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<Yup.InferType<typeof signinSchema>>({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      Password: "",
      Email: "",
    },
  });

  async function onSubmit(values: Yup.InferType<typeof signinSchema>) {
    try {
      setIsSubmitting(true);

      const userData: LoginUser = {
        ...values,
      };
      const response = await loginUser(userData);

      dispatch(setUser(response.data.data.User));
      setCookie(AUTH_COOKIE_NAME, response.data.data.Token);

      if (response.data.data.User.RoleId === 1) {
        navigate("/product-category");
        return;
      }

      navigate("/store");

      toast({
        title: `Bienvenido ${response.data.data.User.FullName}`,
      });
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
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registrase</CardTitle>
          <CardDescription>Crear una cuenta</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
              </Button>
              <p>
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/auth/signup"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Iniciar Sesión
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
