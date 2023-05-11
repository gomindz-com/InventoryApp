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


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <ArgonControllerProvider>
      <PerfectScrollbar>
        <App />
      </PerfectScrollbar>
    </ArgonControllerProvider>
  </HashRouter>
);


