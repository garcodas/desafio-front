import { Status } from "./status";
import { User } from "./user";

interface Client {
  Id?: number;
  CompanyName: string;
  TradeName: string;
  DeliveryAddress: string;
  Phone: string;
  Email: string;
  UserId: number;
  StatusId: number;
  Status?: Status;
  User?: Partial<User>;
}

interface ClientListProps {
  clients: Client[];
  onSuccess?: () => void;
}

interface ClientFormProps {
  onSuccess: () => void;
  client: Client | null;
}

export type { Client, ClientListProps, ClientFormProps };
