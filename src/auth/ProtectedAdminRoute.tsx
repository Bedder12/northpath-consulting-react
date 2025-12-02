import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";
import { ReactNode } from "react";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { loading, session, isAdmin } = useAuthContext();

  // Still loading or admin not checked yet
  if (loading || isAdmin === null) {
    return <p className="text-center mt-10">Kontrollerar behörighet...</p>;
  }

  if (!session) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
}
