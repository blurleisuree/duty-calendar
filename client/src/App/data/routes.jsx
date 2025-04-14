import { Navigate } from "react-router";

import Inner from "../../pages/Inner/Inner";

export const routeConfig = [
  {
    path: "/",
    element: <Inner />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
