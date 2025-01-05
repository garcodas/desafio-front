import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ClientFormValues, createClientSchema } from "@/lib/schemas/client";
import { createClient } from "@/services/clientService";
import { RootState } from "@/store/store";
import { Client, ClientFormProps } from "@/types/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const ClientForm = ({ onSuccess, client: initialClient }: ClientFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfoDisable, setContactInfoDisable] = useState<boolean>(false);
  const [allDisabled, setAllDisabled] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const { toast } = useToast();
  const form = useForm<ClientFormValues>({
    resolver: yupResolver(createClientSchema),
    defaultValues: initialClient || {
      CompanyName: "",
      TradeName: "",
      DeliveryAddress: "",
      Phone: "",
      Email: "",
    },
  });

  const setContactValues = (checked: boolean) => {
    if (checked) {
      form.setValue("Email", user.Email);
      form.setValue("Phone", user.Phone);

      setContactInfoDisable(true);
    } else {
      form.setValue("Email", "");
      form.setValue("Phone", "");

      setContactInfoDisable(false);
    }
  };

  async function onSubmit(values: ClientFormValues) {
    try {
      setIsSubmitting(true);

      const userData: Client = {
        ...values,
        UserId: user.Id ?? 0,
        StatusId: 1,
      };

      await createClient(userData);
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

  const setInitialData = useCallback(() => {
    if (initialClient) {
      setAllDisabled(true);
    }
  }, [initialClient]);

  useEffect(() => {
    setInitialData();
  }, [setInitialData]);

  // Set initial data and disable fields if client data is passed
  useEffect(() => {
    if (initialClient) {
      form.reset(initialClient);
    }
  }, [initialClient, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="CompanyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Compañía</FormLabel>
              <FormControl>
                <Input disabled={allDisabled} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="TradeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Comercial</FormLabel>
              <FormControl>
                <Input disabled={allDisabled} {...field} />
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
                <Textarea
                  disabled={allDisabled}
                  placeholder="Dirección exacta de entrega"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>Datos de Contacto</FormLabel>
            <FormDescription>
              ¿Deseas utilizar los mismos datos de contactos que colocaste al
              registrarte? <br /> Teléfono: {user.Phone} <br />
              Correo Electrónico: {user.Email}
            </FormDescription>
          </div>
          <FormControl>
            <Switch disabled={allDisabled} onCheckedChange={setContactValues} />
          </FormControl>
        </FormItem>
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input
                  disabled={contactInfoDisable || allDisabled}
                  type="email"
                  {...field}
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
                <Input
                  disabled={contactInfoDisable || allDisabled}
                  type="tel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || allDisabled}
        >
          {isSubmitting ? "Guardando Cliente..." : "Crear Cliente"}
        </Button>
      </form>
    </Form>
  );
};

export default ClientForm;
