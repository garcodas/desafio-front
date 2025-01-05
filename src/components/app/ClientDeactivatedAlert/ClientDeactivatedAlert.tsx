import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ClientDeactivatedAlertProps = {
  message?: string; // Allow customization of the message
};
const ClientDeactivatedAlert = ({ message }: ClientDeactivatedAlertProps) => {
  return (
    <Alert className="border-l-4 border-red-600 bg-red-50 p-4 text-red-800">
      <div>
        <AlertTitle className="font-bold text-red-800">
          Perfil desactivado
        </AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
};

export default ClientDeactivatedAlert;
