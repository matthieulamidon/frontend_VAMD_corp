import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexte/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, loading, role } = useAuth();
  console.log(
    "ProtectedRoute - isAuthenticated:",
    isAuthenticated,
    "role:",
    role
  );

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole && role !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />; // page d’accès refusé
  }

  return <>{children}</>;
};
