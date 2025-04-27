import classes from "./App.module.css";

import { useEffect } from "react";
import { BrowserRouter } from "react-router";
import Router from "./components/Router/Router.jsx";

import Message from "@shared/components/Message/Message.jsx";
import Modal from "@shared/components/Modal/Modal.jsx";
import Loader from "@shared/components/UI/Loader/Loader.jsx";

import { useAuthStore } from "@modules/Auth/index";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const loading = useAuthStore((state) => state.loading);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (loading) {
    return <Loader fullPage={true} />;
  }

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
