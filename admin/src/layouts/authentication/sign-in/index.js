import { useState, useEffect, useMemo } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components


// Authentication layout components

import { UserSchema } from "../../../formValidation/addForm";
import { loginUser } from "apiservices/authService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useArgonController, setMiniSidenav,setLayout, setOpenConfigurator } from "context";


// Image
const bgImage =
  "https://us.123rf.com/450wm/kostsov/kostsov1906/kostsov190600026/126080344-modern-showcase-with-empty-space-on-pedestal-on-blue-background-3d-rendering-.jpg?ver=6";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => {
    console.log("you click me");
  };

  const [admin, setAdmin] = useState(null);

  //START LOGGING IN USER
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await UserSchema.isValid(userData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
      console.log(userData);
    } else {
      console.log(userData);
      await loginUser(userData)
        .then((res) => {
          if (res.data) {
            console.log("User Logged In Success");
            console.log(res.data.status);
            toast.success("User Login Successfully");
            setAdmin(res.data.result);
            console.log(res.data.result);
            localStorage.setItem("admintoken", res.data.result.jwt);
            localStorage.setItem("admin", JSON.stringify(res.data.result.user));
          } else {
            console.log("User Could Not Be Logged In");
            console.log(res.data);
            toast.error("Authnentication Failed");
          }
        })
        .catch((err) => {
          console.log("Error");
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [controller, dispatch] = useArgonController();


  useEffect(() => {
    
    //setLayout(dispatch, {layout: "authentication"});


  }, []);

  return (
    
<body className="bg-gray-200">

{admin && <Navigate to="/dashboard" replace={true} />}

<ToastContainer />
  <div className="container position-sticky z-index-sticky top-0">
    <div className="row">
      <div className="col-12">
        <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
          <div className="container-fluid ps-2 pe-0">
            <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " href="../pages/dashboard.html">
              Gomindz Inventory Admin Dashboard
            </a>
            <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon mt-2">
                <span className="navbar-toggler-bar bar1"></span>
                <span className="navbar-toggler-bar bar2"></span>
                <span className="navbar-toggler-bar bar3"></span>
              </span>
            </button>
            <div className="collapse navbar-collapse" id="navigation">
              <ul className="navbar-nav mx-auto">
                {/* <li className="nav-item">
                  <a className="nav-link d-flex align-items-center me-2 active" aria-current="page" href="../pages/dashboard.html">
                    <i className="fa fa-chart-pie opacity-6 text-dark me-1"></i>
                    Dashboard
                  </a>
                </li> */}
                {/* <li className="nav-item">
                  <a className="nav-link me-2" href="../pages/profile.html">
                    <i className="fa fa-user opacity-6 text-dark me-1"></i>
                    Profile
                  </a>
                </li> */}
                
                {/* <li className="nav-item">
                  <a className="nav-link me-2" href="../pages/sign-in.html">
                    <i className="fas fa-key opacity-6 text-dark me-1"></i>
                    Sign In
                  </a>
                </li> */}
              </ul>
              {/* <ul className="navbar-nav d-lg-flex d-none">
                <li className="nav-item d-flex align-items-center">
                  <a className="btn btn-outline-primary btn-sm mb-0 me-2"  href="https://www.creative-tim.com/builder/material?ref=navbar-dashboard">Online Builder</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/product/material-dashboard" className="btn btn-sm mb-0 me-1 bg-gradient-dark">Free download</a>
                </li>
              </ul> */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <main className="main-content  mt-0">
    <div className="page-header align-items-start min-vh-100" 
    
    style={{
      backgroundImage: "url(" + "https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" + ")",
 
    }
    }

    
    /* style="background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');"
     */
    >
     
     
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row" style={{marginTop: 100}}>
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                  
                </div>
              </div>
              <div className="card-body">
                <form role="form" className="text-start">
                  <div className="input-group input-group-outline my-3">
                    <label className="form-label"></label>
                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange}/>
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <label className="form-label"></label>
                    <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange}/>
                  </div>
                  <div className="form-check form-switch d-flex align-items-center mb-3">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label mb-0 ms-3" /* for="rememberMe" */>Remember me</label>
                  </div>
                  <div className="text-center">
                 
                  <a href="/dashboard">
                  <button type="button" onClick={handleSubmit} className="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button>

              </a>

                  </div>
                 {/*  <p className="mt-4 text-sm text-center">
                    Dont have an account?
                    <a href="../pages/sign-up.html" className="text-primary text-gradient font-weight-bold">Sign up</a>
                  </p> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer position-absolute bottom-2 py-2 w-100">
        <div className="container">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-12 col-md-6 my-auto">
              <div className="copyright text-center text-sm text-white text-lg-start">
                Copyright © 
                {(new Date().getFullYear())}
                ,
                GoMindz
               
              </div>
            </div>
           {/*  <div className="col-12 col-md-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                <li className="nav-item">
                  <a href="https://www.creative-tim.com" className="nav-link text-white" >Creative Tim</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/presentation" className="nav-link text-white" >About Us</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/blog" className="nav-link text-white" >Blog</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-white" >License</a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  </main>

</body>


  );
}

export default Illustration;
