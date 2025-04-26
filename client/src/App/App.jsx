import classes from "./App.module.css";

import { BrowserRouter } from "react-router";
import Router from "./components/Router/Router.jsx";

import Message from "@shared/components/Message/Message.jsx";
import Modal from "@shared/components/Modal/Modal.jsx";

function App() {
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
