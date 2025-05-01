import { Navigate } from "react-router";
import { format } from "date-fns";

import Main from "../../pages/MainPage/MainPage";
import Calendar from "../../pages/CalendarPage/CalendarPage";
import Item from "../../pages/ItemPage/ItemPage";
import Auth from "../../pages/AuthPage/AuthPage";
import Admin from "../../pages/AdminPage/AdminPage";

import { PublicRoute, ProtectedRoute } from "../../modules/Auth";

const today = format(new Date(), "yyyy-MM-dd");

export const routeConfig = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Auth />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          { path: "", element: <Navigate to={`calendar`} replace /> },
          { path: "calendar", element: <Calendar /> },
          { path: "calendar/:date", element: <Item /> },
          { path: "admin", element: <Admin /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
