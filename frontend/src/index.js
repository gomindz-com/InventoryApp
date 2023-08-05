import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { HashRouter } from 'react-router-dom'
import App from "App";

// Soft UI Context Provider
import { ArgonControllerProvider } from "context";

// react-perfect-scrollbar component
import PerfectScrollbar from "react-perfect-scrollbar";

// react-perfect-scrollbar styles
import "react-perfect-scrollbar/dist/css/styles.css";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
import {store} from "./Redux/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <ArgonControllerProvider>
      <PerfectScrollbar>
      <ToastContainer />
        <App />
      </PerfectScrollbar>
    </ArgonControllerProvider>
  </BrowserRouter>
  </Provider>
);


