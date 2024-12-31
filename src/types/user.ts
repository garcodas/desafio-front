interface User {
  Id?: string;
  FullName: string;
  BirthDate: Date;
  Email: string;
  Phone: string;
  RoleId: number;
  Token?: string;
}

interface RegisterUser extends User {
  DeliveryAddress: string;
  Password: string;
}

interface LoginUser {
  Email: string;
  Password: string;
}

interface LoginUserResponse {
  Token: string;
  User: User;
}

export type { User, RegisterUser, LoginUser, LoginUserResponse };
