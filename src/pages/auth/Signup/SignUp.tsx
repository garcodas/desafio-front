import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import AddUserForm from "@/pages/User/components/AddUserForm";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlerSuccess = () => {
    toast({
      title: "Usuario creado",
      description:
        "El usuario se ha creado correctamente. Por motivos de seguridad, debes iniciar sesión",
      action: (
        <ToastAction
          onClick={() => {
            navigate("/auth/signin");
          }}
          altText="Try again"
        >
          Iniciar sesión
        </ToastAction>
      ),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Registrase</CardTitle>
          <CardDescription>Crear una cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <AddUserForm onSuccess={handlerSuccess} session={false} />
        </CardContent>
        <CardFooter className="text-center">
          <p className="w-full text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/auth/signin"
              className="text-blue-500 hover:text-blue-700"
            >
              Iniciar Sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
