interface Role {
  Id: number;
  Name: string;
}

interface ResponseRole {
  data: Role[];
}

export type { Role, ResponseRole };
