import { Navigate, Outlet } from "react-router";
import useAuthStore from "../../store/authStore";
import Loader from "@shared/components/UI/Loader/Loader";

function PublicRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return <Loader fullPage={true} />;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
export default PublicRoute;
