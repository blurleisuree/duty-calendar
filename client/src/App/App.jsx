import classes from './App.module.css';

import { BrowserRouter } from "react-router";

import Router from "./components/Router/Router.jsx";

function App() {
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
