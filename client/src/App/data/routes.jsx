import { Navigate } from "react-router";

import MainPage from "../../pages/MainPage/MainPage";
import Calendar from "../../pages/CalendarWrapper/CalendarWrapper";
import Item from "../../pages/ItemWrapper/ItemWrapper";
import Inner from '../../pages/Inner/Inner'

export const routeConfig = [
  {
    path: "/",
    element: <MainPage />,
    children: [
      { path: "", element: <Navigate to="calendar" replace /> },
      { path: "calendar", element: <Calendar /> },
      { path: "calendar/:date", element: <Item /> },
      { path: "admin", element: <Inner /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/calendar" replace />,
  },
];
