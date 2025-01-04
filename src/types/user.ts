interface User {
  Id?: number;
  FullName: string;
  BirthDate: Date;
  Email: string;
  Phone: string;
  Token?: string;
  RoleId?: number;
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

export type { User, RegisterUser, LoginUser, LoginUserResponse };
