import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddUserModalProps } from "@/types/user";
import { useState } from "react";
import AddUserForm from "./AddUserForm";

const AddUserModal = ({ onSuccess }: AddUserModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    onSuccess?.();
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Nuevo Usuario</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
          <DialogDescription>
            Crea un nuevo usuario aquí. Haz clic en Guardar cuando hayas
            terminado.
          </DialogDescription>
        </DialogHeader>
        <AddUserForm session onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
