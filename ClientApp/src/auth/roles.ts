import type { User } from "../types/User";

export function hasRole(user: User | null, role: string): boolean {
  return user?.roles.includes(role) ?? false;
}