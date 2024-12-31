import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100">
            <AlertTriangle
              className="w-6 h-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Acceso no autorizado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Lo sentimos, no tienes permiso para acceder a esta página. Inicia
            sesión o ponte en contacto con el servicio de asistencia si crees
            que se trata de un error.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild>
            <Link to="/auth/signin">Iniciar Sesión</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Unauthorized;
