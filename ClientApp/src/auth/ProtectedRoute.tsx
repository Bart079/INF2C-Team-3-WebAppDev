import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { hasRole } from "./roles";

export function ProtectedRoute({ children, requiredRoles }: { children: ReactNode; requiredRoles: string[] }) {
  const { user } = useAuth();
  if (user === null) {
    return <Navigate to="/login" replace />;
  }
  if (!requiredRoles.some((role) => hasRole(user, role))) {
    return <Navigate to="/login" replace />;
  }
  return children;
}