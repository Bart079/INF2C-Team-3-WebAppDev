export type User = {
  id: number;
  username: string;
  roles: string[];
};
export type UserCredentials = User & {
  password: string;
};