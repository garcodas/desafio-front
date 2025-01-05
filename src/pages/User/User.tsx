import { User as UserType } from "@/types/user";
import UserList from "./components/UserList";
import { useCallback, useEffect, useState } from "react";
import { getUsers } from "@/services/userService";
import AddUserModal from "./components/AddUser";

const User = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUsers = useCallback(async () => {
    const response: { data: UserType[] } = await getUsers();

    setUsers(response.data);
  }, []);

  const handleSuccess = async () => {
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <AddUserModal onSuccess={handleSuccess} />
      </div>
      <UserList users={users} onSuccess={handleSuccess} />
    </div>
  );
};

export default User;
