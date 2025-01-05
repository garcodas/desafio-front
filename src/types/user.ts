import { Role } from "./role";
import { Status } from "./status";

interface User {
  Id?: number;
  FullName: string;
  BirthDate: Date;
  Email: string;
  Phone: string;
  Token?: string;
  RoleId?: number;
  StatusId?: number;
  Role?: Role;
  Status?: Status;
}

interface UserListProps {
  users: User[];
  onSuccess?: () => void;
}

interface RegisterUser extends User {
  Password: string;
}

interface LoginUser {
  Email: string;
  Password: string;
}

interface LoginUserResponse {
  User: User;
}

interface AddUserModalProps {
  onSuccess: () => void;
}

interface AddUserFormProps {
  onSuccess: () => void;
  session: boolean;
}

export type {
  User,
  RegisterUser,
  LoginUser,
  LoginUserResponse,
  UserListProps,
  AddUserModalProps,
  AddUserFormProps,
};
