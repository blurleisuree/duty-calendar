import { Navigate, Outlet } from "react-router";
import Loader from "../../../../shared/components/UI/Loader/Loader";
import useAdminStore from "../../store/adminStore";

function AdminProtectedRoute() {
  const AdminIsAuthenticated = useAdminStore((state) => state.AdminIsAuthenticated);
  const loading = useAdminStore((state) => state.loading);

  if (loading) {
    return <Loader fullPage={true} />;
  }

  return AdminIsAuthenticated ? <Outlet /> : <Navigate to="/admin/auth" replace />;
}

export default AdminProtectedRoute;
