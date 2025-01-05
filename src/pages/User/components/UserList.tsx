import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { changeUserStatus } from "@/services/userService";
import { RootState } from "@/store/store";
import { User, UserListProps } from "@/types/user";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserList = ({ users: initialUsers, onSuccess }: UserListProps) => {
  const [users, setusers] = useState(initialUsers);
  const { toast } = useToast();
  const userStore = useSelector((state: RootState) => state.user);

  const changeStatus = async (userId: number, statusId: number) => {
    try {
      const newStatus = statusId === 1 ? 2 : 1;

      await changeUserStatus(userId, newStatus);

      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description:
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any).response?.data?.error ||
          "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    setusers(initialUsers);
  }, [initialUsers]);
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Correo Electrónico</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.Id}>
              <TableCell>{user.Id}</TableCell>

              <TableCell>{user.FullName}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell>{user.Phone}</TableCell>
              <TableCell>{user.Role?.Name}</TableCell>
              <TableCell>{user.Status?.Name}</TableCell>
              <TableCell>
                {userStore.Id !== user.Id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      changeStatus(user.Id ?? 0, user.StatusId ?? 0);
                    }}
                  >
                    Cambiar Estado
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
