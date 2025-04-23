import classes from "./App.module.css";

import { BrowserRouter } from "react-router";
import Router from "./components/Router/Router.jsx";

import { useEffect } from "react";
import useDutyStore from "../shared/store/dutyStore.js";
import Loader from "../shared/components/UI/Loader/Loader.jsx";
import Message from "../shared/components/Message/Message.jsx";
import Modal from "../shared/components/Modal/Modal.jsx";

import { useAuthStore } from "../modules/Auth/index.js";

function App() {
  const fetchDuties = useDutyStore((state) => state.fetchDuties);
  const isLoading = useDutyStore((state) => state.isLoading);

  useEffect(() => {
    fetchDuties();
  }, [fetchDuties]);

  if (isLoading) return <Loader fullPage={true} />;

  return (
    <div className={`${classes.App}`}>
      <Modal />
      <Message />
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
