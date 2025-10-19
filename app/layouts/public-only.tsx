import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "~/store/auth";

export default function PublicOnly() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
