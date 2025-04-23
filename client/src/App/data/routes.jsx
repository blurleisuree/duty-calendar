import { Navigate } from "react-router";
import { format } from "date-fns";

import MainPage from "../../pages/MainPage/MainPage";
import Calendar from "../../pages/CalendarWrapper/CalendarWrapper";
import Item from "../../pages/ItemWrapper/ItemWrapper";
import AuthPage from "../../pages/AuthPage/AuthPage";

import { PublicRoute, ProtectedRoute } from "../../modules/Auth";

import AdminWrapper from "../../pages/AdminWrapper/AdminWrapper";
// import AdminAuthWrapper from "../../pages/AdminAuthWrapper/AdminAuthWrapper";
// import { AdminProtectedRoute, AdminPublicRoute } from "../../modules/Admin";

import Loader from "../../shared/components/UI/Loader/Loader";

import useValidateISODate from "../../shared/hooks/useValidateISODate";

const today = format(new Date(), "yyyy-MM-dd");

export const routeConfig = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <AuthPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainPage />,
        children: [
          { path: "", element: <Navigate to={`calendar/${today}`} replace /> },
          { path: "calendar", element: <Calendar /> },
          { path: "calendar/:date", element: <Item /> },
          { path: "admin", element: <AdminWrapper /> },
          // {
          //   element: <AdminPublicRoute />,
          //   children: [
          //     {
          //       path: "admin/auth",
          //       element: <AdminAuthWrapper />,
          //     },
          //   ],
          // },
          // {
          //   element: <AdminProtectedRoute />,
          //   children: [
          //     {
          //       path: "admin",
          //       element: <AdminWrapper />,
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/calendar" replace />,
  },
];
