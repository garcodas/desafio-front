import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { changeClientStatus } from "@/services/clientService";
import { Client, ClientListProps } from "@/types/client";
import { useEffect, useState } from "react";

const ClientList = ({
  clients: initialclients,
  onSuccess,
}: ClientListProps) => {
  const [clients, setclients] = useState(initialclients);
  const { toast } = useToast();

  const changeStatus = async (clientId: number, statusId: number) => {
    try {
      const newStatus = statusId === 1 ? 2 : 1;

      await changeClientStatus(clientId, newStatus);

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
    }
  };

  useEffect(() => {
    setclients(initialclients);
  }, [initialclients]);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre de la Empresa</TableHead>
            <TableHead>Nombre Comercial</TableHead>
            <TableHead>Dirección de Entrega</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Nombre de Usuario</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((user: Client) => (
            <TableRow key={user.Id}>
              <TableCell>{user.Id}</TableCell>

              <TableCell>{user.CompanyName}</TableCell>
              <TableCell>{user.TradeName}</TableCell>
              <TableCell>{user.DeliveryAddress}</TableCell>
              <TableCell>{user.Phone}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.Status?.Name}</TableCell>
              <TableCell>{user.User?.FullName}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    changeStatus(user.Id ?? 0, user.StatusId ?? 0);
                  }}
                >
                  Cambiar Estado
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientList;
