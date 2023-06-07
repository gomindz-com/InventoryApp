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
import backgroudImage from "../../assets/images/ware.jpg";
// react-router-dom components
import { Link } from "react-router-dom";

import { useArgonController, setMiniSidenav, setLayout, setDarkSidenav } from "context";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import avatar from "../../assets/images/bg9.jpg";
import "animate.css/animate.min.css";


import { useNavigate } from "react-router-dom";

import static1 from "../../assets/images/staic1.png";
import static2 from "../../assets/images/staic2.png";

import static3 from "../../assets/images/staic3.png";
import { height } from "@mui/system";

// Image
const bgImage =
  "https://us.123rf.com/450wm/kostsov/kostsov1906/kostsov190600026/126080344-modern-showcase-with-empty-space-on-pedestal-on-blue-background-3d-rendering-.jpg?ver=6";

function Home() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => {
  };

  const [controller, dispatch] = useArgonController();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "home");
  }, [pathname]);

  return (
    <div className="about-us bg-gray-200">
      <ToastContainer />

      <nav className="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3  navbar-transparent ">
        <div className="container">
          <a
            className="navbar-brand  text-white  "
            href="#"
            rel="tooltip"
            title="Designed and Coded by Creative Tim"
            data-placement="bottom"
          >
            Go Inventory App
          </a>
          <button
            className="navbar-toggler shadow-none ms-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navigation"
            aria-controls="navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon mt-2">
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </span>
          </button>
          <div
            className="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0 ms-lg-12 ps-lg-5"
            id="navigation"
          >
            <ul className="navbar-nav navbar-nav-hover ms-auto">
              <Link
                onClick={() => {
                  navigate("/dashboard");
                }}
                to="/dashboard"
                className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                id="dropdownMenuPages8"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="material-icons opacity-6 me-2 text-md">dashboard</i>
                Dashboard
              </Link>

              <li className="nav-item dropdown dropdown-hover mx-2 ms-lg-6">
                <Link
                  to=""
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    navigate("/authentication/sign-in");
                  }}
                  className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center"
                  id="dropdownMenuPages8"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="material-icons opacity-6 me-2 text-md">logout</i>
                  SignIn
                </Link>
              </li>

              {/* <li  className="nav-item my-auto ms-3 ms-lg-0">
                <Link
                style={{fontSize: 10, paddingLeft: 10, paddingRight: 10}}
                  to="/authentication/sign-up"
                  className="btn btn-sm  bg-white  mb-0 me-1 mt-2 mt-md-0"
                >
                  Register With Us
                </Link>
              </li> */}

              {user != null && (
                <li className="nav-item my-auto ms-3 ms-lg-0">
                  <p
                    style={{
                      backgroundColor: "#030305",
                      fontSize: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    className="btn btn-sm  mb-0 me-1 mt-2 mt-md-0"
                  >
                    {" Welcome " + user?.first_name}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-gradient-dark">
        <div
          className="page-header min-vh-75"
          style={{
            backgroundImage: `url(${backgroudImage})`,
          }}
          /*        style="background-image: url('../assets/img/bg9.jpg');"
           */
        >
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container" style={{ marginTop: 100 }}>
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center mx-auto my-auto">
                <h1 className="text-white">Work with an amazing Inventory System</h1>
                <p className="lead mb-4 text-white opacity-8">
                  We’re constantly trying to express ourselves and actualize our dreams.{" "}
                </p>

                <section className="py-7 animate__animated animate__fadeInUp">
                <div style={{}} className="d-flex justify-content-center">

<a href="https://www.facebook.com/GomindzAcademy/">
<i style={{ color: "white" }} className="fab fa-facebook text-lg me-4"></i>
</a>

<a href="https://www.linkedin.com/company/gomindz/" >
<i style={{ color: "black" }} className="fab fa-linkedin text-lg me-4"></i>

</a> 
<a href="#">
<i style={{ color: "black" }} className="fab fa-instagram text-lg  me-4"></i>
</a>
<a href="#">
<i style={{ color: "black" }} className="fab fa-twitter text-lg  me-4"></i>
</a>
<a href="#">
<i style={{ color: "black" }} className="fab fa-google-plus text-lg "></i>
</a>
</div>
</section>


                {/* <h6 className="mb-2 mt-5" style={{paddingTop: 70}} >Find us on</h6> */}
              
              </div>
            </div>
          </div>
        </div>
      </header>






<section className="py-7 animate__animated animate__fadeInUp">
  
<div className="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
        <section className="py-7">
          <div className="container">
            <div className="row">
              <div className="  col-lg-4 mt-lg-0 mt-4">
                <div className="card">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        style={{ height: 250 }}
                        src={static1}
                        alt="img-colored-shadow"
                        className="img-fluid border-radius-lg"
                      />
                    </a>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="font-weight-normal">
                      <a href="#">Accurate Stock Recordes</a>
                    </h5>
                    <p className="mb-0">
                      Get accurate stock records with stright forword figures . You need not to
                      worry about counting everything in the store
                    </p>
                  </div>
                </div>
              </div>
              {/* second card */}

              <div className="  col-lg-4 mt-lg-0 mt-4">
                <div className="card">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        src={static2}
                        alt="img-colored-shadow"
                        className="img-fluid border-radius-lg"
                        style={{ height: 275 }}
                      />
                    </a>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="font-weight-normal">
                      <a href="#">Get insights on Search</a>
                    </h5>
                    <p className="mb-0">
                      With clear figures and graphs , you can read all statistics of your store and
                      stay in the loop.
                    </p>
                  </div>
                </div>
              </div>

              {/* third cord */}

              <div className="  col-lg-4 mt-lg-0 mt-4">
                <div className="card">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        src={static3}
                        alt="img-colored-shadow"
                        className="img-fluid border-radius-lg"
                        style={{ height: 275 }}
                      />
                    </a>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="font-weight-normal">
                      <a href="#">Get insights on Search</a>
                    </h5>
                    <p className="mb-0">
                      With ccurate statistics, you can make the best decisions and and improve your
                      business
                    </p>
                  </div>
                </div>
              </div>

              {/* furth card */}

              {/* <div className="  col-lg-4 mt-lg-0 mt-4">
                <div className="card">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <a className="d-block blur-shadow-image">
                      <img
                        src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="img-colored-shadow"
                        className="img-fluid border-radius-lg"
                      />
                    </a>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="font-weight-normal">
                      <a href="#">Get insights on Search</a>
                    </h5>
                    <p className="mb-0">
                      Website visitors today demand a frictionless user expericence — especially
                      when using search. Because of the hight standards.
                    </p>
                    <button type="button" className="btn bg-gradient-info btn-sm mb-0 mt-3">
                      Find out more
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Testimoney */}

        {/* Testtimoney end */}
        <section
      style={{ backgroundco: "#11cdef" }}
      className="pb-5 position-relative bg-info p-3 mb-5 mx-n5"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-8 text-start mb-5 mt-5">
            <h3 className="text-white z-index-1 position-relative">
              The Executive Team
            </h3>
            <p className="text-white opacity-8 mb-0">
              There’s nothing I really wanted to do in life that I wasn’t able to get good at. That’s my skill.
            </p>
          </div>
        </div>

        <div className="row mt-4">
          {/* first card */}
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
            {/* Card content */}
            <div className="position-relative shadow rounded border-top border-5 border-primary bg-white">
              {/* Card icon */}
              <div
                className="d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle bg-primary rounded-circle"
                style={{ width: "45px", height: "45px", marginTop: "-3px" }}
              >
                <i className="fa fa-cog text-white"></i>
              </div>
              {/* Card header */}
              <div className="text-center border-bottom p-4 pt-5">
                <h4 className="fw-bold">Dedi Hosting</h4>
                <p className="mb-0">
                  Eirmod erat dolor amet est nrdd clita lorem erat justo rebum elitr eos
                </p>
              </div>
              {/* Card body */}
              <div className="text-center border-bottom p-4">
                <p className="text-primary mb-1">
                  Latest Offer - <strong>Save 30%</strong>
                </p>
                <h1 className="mb-3">
                  <small
                    className="align-top"
                    style={{ fontSize: "22px", lineHeight: "45px" }}
                  >
                    D
                  </small>
                  11.49
                  <small
                    className="align-bottom"
                    style={{ fontSize: "16px", lineHeight: "40px" }}
                  >
                    / Month
                  </small>
                </h1>
                <a className="btn btn-primary px-4 py-2" href="">
                  Buy Now
                </a>
              </div>
              {/* Card footer */}
              <div className="p-4">
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>100 GB Disk Space
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>Unlimited Bandwith
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>Upgrade to Positive SSL
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>Automatic Malware Removal
                </p>
                <p className="mb-0">
                  <i className="fa fa-check text-primary me-3"></i>30 Days Money Back Guarantee
                </p>
              </div>
            </div>
          </div>

          {/* second card */}
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="1.2s">
            {/* Card content */}
            <div className="position-relative shadow rounded border-top border-5 border-primary bg-white">
              {/* Card icon */}
              <div
                className="d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle bg-primary rounded-circle"
                style={{ width: "45px", height: "45px", marginTop: "-3px" }}
              >
                <i className="fa fa-cog text-white"></i>
              </div>
              {/* Card header */}
              <div className="text-center border-bottom p-4 pt-5">
                <h4 className="fw-bold">Dedi Hosting</h4>
                <p className="mb-0">
                  Eirmod erat dolor amet est clita lorem erat justo rebum elitr eos
                </p>
              </div>
              {/* Card body */}
              <div className="text-center border-bottom p-4">
                <p className="text-primary mb-1">
                  Latest Offer - <strong>Save 30%</strong>
                </p>
                <h1 className="mb-3">
                  <small
                    className="align-top"
                    style={{ fontSize: "22px", lineHeight: "45px" }}
                  >
                    D
                  </small>
                  11.49
                  <small
                    className="align-bottom"
                    style={{ fontSize: "16px", lineHeight: "40px" }}
                  >
                    / Month
                  </small>
                </h1>
                <a className="btn btn-primary px-4 py-2" href="">
                  Buy Now
                </a>
              </div>
              {/* Card footer */}
              <div className="p-4">
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>100 GB Disk Space
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>Unlimited Bandwith
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>Upgrade to Positive SSL
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>Automatic Malware Removal
                </p>
                <p className="mb-0">
                  <i className="fa fa-check text-primary me-3"></i>30 Days Money Back Guarantee
                </p>
              </div>
            </div>
          </div>

          {/* third card */}
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="1.8s">
            {/* Card content */}
            <div className="position-relative shadow rounded border-top border-5 border-primary bg-white">
              {/* Card icon */}
              <div
                className="d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle bg-primary rounded-circle"
                style={{ width: "45px", height: "45px", marginTop: "-3px" }}
              >
                <i className="fa fa-cog text-white"></i>
              </div>
              {/* Card header */}
              <div className="text-center border-bottom p-4 pt-5">
                <h4 className="fw-bold">Dedi Hosting</h4>
                <p className="mb-0">
                  Eirmod erat dolor amet est clita lorem erat justo rebum elitr eos
                </p>
              </div>
              {/* Card body */}
              <div className="text-center border-bottom p-4">
                <p className="text-primary mb-1">
                  Latest Offer - <strong>Save 30%</strong>
                </p>
                <h1 className="mb-3">
                  <small
                    className="align-top"
                    style={{ fontSize: "22px", lineHeight: "45px" }}
                  >
                    D
                  </small>
                  11.49
                  <small
                    className="align-bottom"
                    style={{ fontSize: "16px", lineHeight: "40px" }}
                  >
                    / Month
                  </small>
                </h1>
                <a className="btn btn-primary px-4 py-2" href="">
                  Buy Now
                </a>
              </div>
              {/* Card footer */}
              <div className="p-4">
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>100 GB Disk Space
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>Unlimited Bandwith
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>Upgrade to Positive SSL
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check text-primary me-3"></i>Automatic Malware Removal
                </p>
                <p className="mb-0">
                  <i className="fa fa-check text-primary me-3"></i>30 Days Money Back Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

        {/* <section className="pt-4 pb-6" id="count-stats">
          <div className="container">
            <div className="row mb-7">
              <div className="col-lg-2 col-md-4 col-6 mb-4">
                <img
                  className="w-100 opacity-7"
                  src="../assets/img/logos/gray-logos/logo-coinbase.svg"
                  alt="logo"
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6 mb-4">
                <img
                  className="w-100 opacity-7"
                  src="../assets/img/logos/gray-logos/logo-nasa.svg"
                  alt="logo"
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6 mb-4">
                <img
                  className="w-100 opacity-7"
                  src="../assets/img/logos/gray-logos/logo-netflix.svg"
                  alt="logo"
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6 mb-4">
                <img
                  className="w-100 opacity-7"
                  src="../assets/img/logos/gray-logos/logo-pinterest.svg"
                  alt="logo"
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6 mb-4">
                <img
                  className="w-100 opacity-7"
                  src="../assets/img/logos/gray-logos/logo-spotify.svg"
                  alt="logo"
                />
              </div>
              <div className="col-lg-2 col-md-4 col-6 mb-4">
                <img
                  className="w-100 opacity-7"
                  src="../assets/img/logos/gray-logos/logo-vodafone.svg"
                  alt="logo"
                />
              </div>
            </div>
            <div className="row justify-content-center text-center">
              <div className="col-md-3">
                <h1 className="text-gradient text-info" id="state1">
                  0
                </h1>
                <h5>Projects</h5>
                <p>Of “high-performing” level are led by a certified project manager</p>
              </div>
              <div className="col-md-3">
                <h1 className="text-gradient text-info">
                  <span id="state2">0</span>+
                </h1>
                <h5>Hours</h5>
                <p>That meets quality standards required by our users</p>
              </div>
              <div className="col-md-3">
                <h1 className="text-gradient text-info">
                  <span id="state3">0</span>
                  /7
                </h1>
                <h5>Support</h5>
                <p>Actively engage team members that finishes on time</p>
              </div>
            </div>
          </div>
        </section> */}
     


        <div className="col-md-5 ">
                <div className="position-relative">
                  <img
                    className="max-width-10 w-100 "
                    src={require("../../assets/images/GomindzInventory.png")}
                    alt="image"
                  />
                </div>
              </div>
      </div>
</section>








     

      <footer className="footer pt-5 mt-5">
        <div className="container">
          <div className=" row">
            <div className="col-md-2 col-sm-6 col-6 mb-4">
              <div>
                <h6 className="text-sm">Company</h6>
                <ul className="flex-column ms-n3 nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/home">
                      About Us
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" href="https://www.creative-tim.com/templates/free">
                      Freebies
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="https://www.creative-tim.com/templates/premium">
                      Premium Tools
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="https://www.creative-tim.com/blog">
                      Blog
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-md-3 mb-4 ms-auto">
              <div>
                {/* <a href="#">
                  <img
                    src={require("../../assets/images/apple-icon.png")}
                    className="mb-3 footer-logo"
                    alt="main_logo"
                  />
                </a> */}
                <h6 className="font-weight-bolder mb-4">Go Inventory App</h6>
              </div>
              <div>
                <ul className="d-flex flex-row ms-n3 nav">
                  <li className="nav-item">
                    <a className="nav-link pe-1" href="https://www.facebook.com/CreativeTim">
                      <i className="fab fa-facebook text-lg opacity-8"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link pe-1" href="#">
                      <i className="fab fa-twitter text-lg opacity-8"></i>
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link pe-1" href="https://dribbble.com/creativetim">
                      <i className="fab fa-dribbble text-lg opacity-8"></i>
                    </a>
                  </li> */}
                  {/* <li className="nav-item">
                    <a className="nav-link pe-1" href="https://github.com/creativetimofficial">
                      <i className="fab fa-github text-lg opacity-8"></i>
                    </a>
                  </li> */}
                  {/* <li className="nav-item">
                    <a
                      className="nav-link pe-1"
                      href="https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w"
                    >
                      <i className="fab fa-youtube text-lg opacity-8"></i>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>

            {/* <div className="col-md-2 col-sm-6 col-6 mb-4">
              <div>
                <h6 className="text-sm">Resources</h6>
                <ul className="flex-column ms-n3 nav">
                  <li className="nav-item">
                    <a className="nav-link" href="https://iradesign.io/">
                      Illustrations
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="https://www.creative-tim.com/bits">
                      Bits & Snippets
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="https://www.creative-tim.com/affiliates/new">
                      Affiliate Program
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <div className="col-md-2 col-sm-6 col-6 mb-4">
              <div>
                <h6 className="text-sm">Help & Support</h6>
                <ul className="flex-column ms-n3 nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/contact-us">
                      Contact Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Knowledge Center
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2 col-sm-6 col-6 mb-4 me-auto">
              <div>
                <h6 className="text-sm">Legal</h6>
                <ul className="flex-column ms-n3 nav">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="https://www.creative-tim.com/knowledge-center/terms-of-service"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="https://www.creative-tim.com/knowledge-center/privacy-policy"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="https://www.creative-tim.com/license">
                      Licenses (EULA)
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="col-12">
              <div className="text-center">
                <p className="text-dark my-4 text-sm font-weight-normal">
                  All rights reserved. Copyright © <script>{new Date().getFullYear()}</script>{" "}
                  GoMindz Inventory App <a href="https://www.gomindz.com">Gomindz Inc</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
