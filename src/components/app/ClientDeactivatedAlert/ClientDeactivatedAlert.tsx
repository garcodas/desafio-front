import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ClientDeactivatedAlertProps = {
  message?: string;
  title: string;
};
const ClientDeactivatedAlert = ({
  message,
  title,
}: ClientDeactivatedAlertProps) => {
  return (
    <Alert className="border-l-4 border-red-600 bg-red-50 p-4 text-red-800">
      <div>
        <AlertTitle className="font-bold text-red-800">{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
    </Alert>
  );
};

export default ClientDeactivatedAlert;
