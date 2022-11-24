import React, {useState} from 'react'
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from 'react-router-dom';
import { matchRoutes, useLocation } from "react-router-dom"



export default function Footer({}) {

 
    return (
        
        <>
<footer className="footer py-4  ">
            <div className="container-fluid">
              <div className="row align-items-center justify-content-lg-between">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <div className="copyright text-center text-sm text-muted text-lg-start">
                    © {(new Date().getFullYear())},{" "}
                    <i className="fa fa-heart"></i> by
                    <a href="https://www.creative-tim.com" className="font-weight-bold">
                      {" "}
                      GoMindz
                    </a>
                  </div>
                </div>
                <div className="col-lg-6">
                  <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                    <li className="nav-item">
                      <Link 
                      to="/dashboard" 
                       className="nav-link text-muted">
                        GoMindz
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/dashboard" 
                        className="nav-link text-muted"
                      >
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/dashboard"  className="nav-link text-muted">
                        Contact Usdd
                      </Link>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
          </footer>

            </>
    
    )
}