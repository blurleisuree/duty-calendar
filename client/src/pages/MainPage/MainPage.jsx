import { Outlet } from "react-router";

import { Header } from "../../modules/Header/index";

function MainPage() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default MainPage;
