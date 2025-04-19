import classes from "./App.module.css";

import { BrowserRouter } from "react-router";
import Router from "./components/Router/Router.jsx";

import { useEffect } from "react";
import useDutyStore from "../shared/store/dutyStore.js";

function App() {
  const fetchDuties = useDutyStore((state) => state.fetchDuties);
  const isLoading = useDutyStore((state) => state.isLoading);

  useEffect(() => {
    fetchDuties();
  }, [fetchDuties]);

  if (isLoading) return <div>loading...</div>;

  return (
    <div className={`${classes.App}`}>
      <Router />
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
