// import { Navigate, Outlet } from "react-router";
// import Loader from "../../../../shared/components/UI/Loader/Loader";
// import useAdminStore from "../../store/adminStore";

// function AdminPublicRoute() {
//   const AdminIsAuthenticated = useAdminStore((state) => state.AdminIsAuthenticated);
//   const loading = useAdminStore((state) => state.loading);

//   if (loading) {
//     return <Loader fullPage={true} />;
//   }

//   return !AdminIsAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />;
// }
// export default AdminPublicRoute;
