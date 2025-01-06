import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, OrderDetailsProps } from "@/types/order";

const OrderList = ({ orders }: OrderDetailsProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Dirección de Entrega</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((user: Order) => (
            <TableRow key={user.Id}>
              <TableCell>{user.Id}</TableCell>

              <TableCell>{user.FullName}</TableCell>
              <TableCell>{user.Address}</TableCell>
              <TableCell>{user.Phone}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.Total}</TableCell>
              <TableCell>{user.Status?.Name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
