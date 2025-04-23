import { Outlet } from "react-router";
import { useEffect } from "react";

import useDutyStore from "../../shared/store/dutyStore.js";
import { useAuthStore } from "../../modules/Auth/index.js";

import { Header } from "../../modules/Header/index";

import Loader from "../../shared/components/UI/Loader/Loader.jsx";

function MainPage() {
  const fetchDuties = useDutyStore((state) => state.fetchDuties);
  const isLoading = useDutyStore((state) => state.isLoading);

  useEffect(() => {
    fetchDuties();
  }, [fetchDuties]);

  if (isLoading) return <Loader fullPage={true} />;

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default MainPage;
