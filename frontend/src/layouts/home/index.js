/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

import { useArgonController, setMiniSidenav, setLayout, setDarkSidenav } from "context";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Image
const bgImage =
  "https://us.123rf.com/450wm/kostsov/kostsov1906/kostsov190600026/126080344-modern-showcase-with-empty-space-on-pedestal-on-blue-background-3d-rendering-.jpg?ver=6";

function Home() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => {
    console.log("you click me");
  };

  const [controller, dispatch] = useArgonController();


  const { pathname } = useLocation();


  const [user, setUser] = useState(null);

  
  useEffect(() => {
    setLayout(dispatch, "home");
  }, [pathname]);
 

  return (

   



    <div>fff</div>
  );
}

export default Home;
