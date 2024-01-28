import React, {useState} from 'react'
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from 'react-router-dom';
import { matchRoutes, useLocation } from "react-router-dom"



export default function Aside({showAside, setShowAside, matches, activePage}) {

  const location = useLocation();
  console.log("location.pathname");
  console.log(location.pathname);
  
    return (
        
        <>

       
            <aside
              className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
              id="sidenav-main"
              style={
                {
                  //matches && {transform: "translateX(17.125rem)"
                }
              }
            >
              <div className="sidenav-header">
                <i
                  className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                  aria-hidden="true"
                  id="iconSidenav"
                ></i>
                <a
                  className="navbar-brand m-0"
                  href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard "
                >
                  <img
                    src={require("../../assets/images/logo-ct.png")}
                    className="navbar-brand-img h-100"
                    alt="main_logo"
                  />
                  <span className="ms-1 font-weight-bold text-white">Inventory Admin Dashboard</span>
                </a>
              </div>
              <hr className="horizontal light mt-0 mb-2" />
              <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                  <li className="nav-item">

                  <Link to="/dashboard" /* className="nav-link text-white active bg-gradient-primary" */
                  
                  
                  className={`nav-link  ${location.pathname.includes("dashboard") ? "active bg-gradient-primary" : ""}`}
                  >
                    
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="material-icons opacity-10">dashboard</i>
                      </div>
                      <span className="nav-link-text ms-1">Dashboard</span>
                    </Link>


                    
                  </li>
                  <li className="nav-item">
                    <Link  className={`nav-link text-white ${location.pathname.includes("customers") ? "active bg-gradient-primary" : ""}`} to="/customers">
                      <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="material-icons opacity-10">table_view</i>
                      </div>
                      <span className="nav-link-text ms-1">Customers</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link text-white ${location.pathname.includes("billing") ? "active bg-gradient-primary" : ""}`} to="/billing">
                      <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="material-icons opacity-10">receipt_long</i>
                      </div>
                      <span className="nav-link-text ms-1">Billing</span>
                    </Link>
                  </li>
    
                  <li className="nav-item">
                    <Link className={`nav-link text-white ${location.pathname.includes("notifications") ? "active bg-gradient-primary" : ""}`} to="/notifications">
                      <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="material-icons opacity-10">notifications</i>
                      </div>
                      <span className="nav-link-text ms-1">Notifications</span>
                    </Link>
                  </li>
                  <li className="nav-item mt-3">
                    <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
                      Account pages
                    </h6>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link text-white ${location.pathname.includes("profile") ? "active bg-gradient-primary" : ""}`} to="/profile">
                      <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="material-icons opacity-10">person</i>
                      </div>
                      <span className="nav-link-text ms-1">Profile</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a onClick={()=>{
                         localStorage.removeItem("admin")
                        localStorage.removeItem("admintoken");
                        navigate('/authentication/sign-in');
                    }} className="nav-link text-white " href="/authentication/sign-in">
                      <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                        <i className="material-icons opacity-10">login</i>
                      </div>
                      <span className="nav-link-text ms-1">Sign Out</span>
                    </a>
                  </li>
                  {/* <li className="nav-item">
              <a className="nav-link text-white " href="/authentication/sign-in">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">assignment</i>
                </div>
                <span className="nav-link-text ms-1">Sign Up</span>
              </a>
            </li> */}
                </ul>
              </div>
            </aside>
         

            </>
    
    )
}