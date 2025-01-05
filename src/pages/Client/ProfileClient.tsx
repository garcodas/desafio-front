import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClientForm from "./components/ClientForm";
import ClientDeactivatedAlert from "@/components/app/ClientDeactivatedAlert/ClientDeactivatedAlert";
import { Client } from "@/types/client";
import { useCallback, useEffect, useState } from "react";
import { getClientByUserId } from "@/services/clientService";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ProfileClient = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  const fetchClient = useCallback(async () => {
    const response: { data: Client } = await getClientByUserId(user.Id ?? 0);

    setClient(response.data);

    if (response.data) {
      setShowAlert(response.data.StatusId === 2);
    }
  }, [user.Id]);

  const handleSuccess = () => {
    fetchClient();
  };

  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Perfil de Cliente</CardTitle>
          <CardDescription>
            Debes crear un perfil de cliente para hacer ordenes
          </CardDescription>
          {showAlert && (
            <ClientDeactivatedAlert message="Tu perfil fue desactivado, significa que no puedes realizar ordenes. Por favor ponte en contacto con soporte técnico." />
          )}
        </CardHeader>
        <CardContent>
          <ClientForm client={client} onSuccess={handleSuccess} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileClient;
