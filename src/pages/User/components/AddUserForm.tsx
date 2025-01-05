import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale/es";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SignUpFormValues, signupSchema } from "@/lib/schemas/signup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddUserFormProps, RegisterUser } from "@/types/user";
import { registerAdmin, registerUser } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
registerLocale("es", es);
const AddUserForm = ({ onSuccess, session }: AddUserFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const form = useForm<SignUpFormValues>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      FullName: "",
      Password: "",
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
      if (values.CopyPermissions) {
        await registerAdmin(userData);
      } else {
        await registerUser(userData);
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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        {session && (
          <FormField
            control={form.control}
            name="CopyPermissions"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Permisos</FormLabel>
                  <FormDescription>
                    Replicar los permisos asignados al usuario con la sesión
                    actualmente activa.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creando usuario..." : "Registrarse"}
        </Button>
      </form>
    </Form>
  );
};

export default AddUserForm;
