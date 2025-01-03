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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterUser } from "@/types/user";
import { registerUser } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Link, useNavigate } from "react-router-dom";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { cn } from "@/lib/utils";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
import { SignUpFormValues, signupSchema } from "@/lib/schemas/signup";
registerLocale("es", es);

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SignUpFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      FullName: "",
      Password: "",
      DeliveryAddress: "",
      Phone: "",
      Email: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    try {
      setIsSubmitting(true);

      const userData: RegisterUser = {
        ...values,
      };
      await registerUser(userData);

      form.reset();

      toast({
        title: "Usuario creado",
        description:
          "El usuario se ha creado correctamente. Por motivos de seguridad, debes iniciar sesión",
        action: (
          <ToastAction
            onClick={() => {
              navigate("/auth/signin");
            }}
            altText="Try again"
          >
            Iniciar sesión
          </ToastAction>
        ),
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
                name="FullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormDescription>
                      La contraseña debe tener al menos 8 caracteres
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="BirthDate"
                render={() => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl className="w-full">
                      <Controller
                        name="BirthDate"
                        control={form.control}
                        render={({ field: controllerField }) => (
                          <ReactDatePicker
                            locale="es"
                            selected={controllerField.value}
                            onChange={(date) => controllerField.onChange(date)}
                            showYearDropdown
                            yearDropdownItemNumber={100}
                            scrollableYearDropdown
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date("1900-01-01")}
                            maxDate={
                              new Date(
                                new Date().getFullYear() - 18,
                                new Date().getMonth(),
                                new Date().getDate()
                              )
                            }
                            className={cn(
                              "w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                              !controllerField.value && "text-muted-foreground"
                            )}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="DeliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección de Entrega</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefono</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creando usuario..." : "Registrarse"}
              </Button>
              <p>
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/auth/signin"
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

export default SignUp;
