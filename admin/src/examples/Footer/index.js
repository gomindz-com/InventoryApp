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
                      <a href="https://www.creative-tim.com" className="nav-link text-muted">
                        GoMindz
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="https://www.creative-tim.com/presentation"
                        className="nav-link text-muted"
                      >
                        About Us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="https://www.creative-tim.com/blog" className="nav-link text-muted">
                        Contact Us
                      </a>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
          </footer>

            </>
    
    )
}