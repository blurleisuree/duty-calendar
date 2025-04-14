import { useRoutes } from "react-router";
import { routeConfig } from "../../data/routes";

const Router = () => {
    const routes = useRoutes(routeConfig);
    return routes;
  };

export default Router
