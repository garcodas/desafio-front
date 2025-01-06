import { OrderDetail } from "./orderDetail";
import { Status } from "./status";

interface Order {
  Id?: number;
  FullName: string;
  Address: string;
  Phone: string;
  Email: string;
  Total: number;
  UserId?: number;
  Status?: Status;
  Products?: OrderDetail[];
}

interface OrderDetailsProps {
  orders: Order[];
}

export type { Order, OrderDetailsProps };
