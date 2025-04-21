import { Navigate } from "react-router";

import MainPage from "../../pages/MainPage/MainPage";
import Calendar from "../../pages/CalendarWrapper/CalendarWrapper";
import Item from "../../pages/ItemWrapper/ItemWrapper";
import AdminWrapper from "../../pages/AdminWrapper/AdminWrapper";

export const routeConfig = [
  {
    path: "/",
    element: <MainPage />,
    children: [
      { path: "", element: <Navigate to="calendar" replace /> },
      { path: "calendar", element: <Calendar /> },
      { path: "calendar/:date", element: <Item /> },
      { path: "admin", element: <AdminWrapper /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/calendar" replace />,
  },
];
