import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import React from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({ children }: ProtectedRouteProps) {
  const { loading, session, isAdmin } = useAuth();

  if (loading) {
    return <p className="text-center mt-10">Kontrollerar behörighet...</p>;
  }

  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
}
