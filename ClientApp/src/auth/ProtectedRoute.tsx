import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { hasRole } from "./roles";

export function ProtectedRoute({ children, requiredRole }: { children: ReactNode; requiredRole?: string }) {
  const { user } = useAuth();
  if (user === null) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && !hasRole(user, requiredRole)) {
    return <Navigate to="/" replace />;
  }
  return children;
}