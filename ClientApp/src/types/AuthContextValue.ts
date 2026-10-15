import type { User } from "../types/User";
export type AuthContextValue = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};