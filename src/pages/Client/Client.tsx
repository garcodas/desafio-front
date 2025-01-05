import { useCallback, useEffect, useState } from "react";
import ClientList from "./components/ClientList";
import { Client as ClientType } from "@/types/client";
import { getClients } from "@/services/clientService";

const Client = () => {
  const [clients, setClients] = useState<ClientType[]>([]);

  const fetchClients = useCallback(async () => {
    const response: { data: ClientType[] } = await getClients();

    setClients(response.data);
  }, []);

  const handleSuccess = async () => {
    await fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
      </div>
      <ClientList clients={clients} onSuccess={handleSuccess} />
    </div>
  );
};

export default Client;
