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

// @mui material components
import Card from "@mui/material/Card";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getCustomers } from "apiservices/customerService";
import Aside from "examples/Aside";
import Footer from "examples/Footer";
import { useState, useEffect } from "react";

// Argon Dashboard 2 MUI components

// Data

function Tables() {
  const [showAside, setShowAside] = useState(true);
  const matches = useMediaQuery("(max-width: 1199.98px)");

  const [customersList, setCustomersList] = useState([]);


   //START GET CUSTOMERS
   const handleGetCustomersList = async () => {
    setCustomersList([]);
    try {
      await getCustomers()
        .then((res) => {
          console.log(res);
          if (res.data?.status === "true") {
            console.log("Customers List");
            console.log(res.data.result);
            setCustomersList(res.data.result);
          } else {
            setCustomersList([]);
          }
        })
        .catch((err) => console.log("Error in Getting setCustomersList", err));
    } catch (error) {
      console.log(error);
    }
  };
  //END GET CUSTOMERS
  

  useEffect(() => {
    handleGetCustomersList();
  }, []);



  return (
    <>
      <body className="g-sidenav-show bg-gray-200">
        <Aside showAside={showAside} setShowAside={setShowAside} matches={matches} />

        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
            id="navbarBlur"
            data-scroll="true"
          >
            <div className="container-fluid py-1 px-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                  <li className="breadcrumb-item text-sm">
                    <a className="opacity-5 text-dark" href="javascript:;">
                      Pages
                    </a>
                  </li>
                  <li className="breadcrumb-item text-sm text-dark active" aria-current="page">
                    Customers
                  </li>
                </ol>
                <h6 className="font-weight-bolder mb-0">Customers</h6>
              </nav>
              <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                  <div className="input-group input-group-outline">
                    <label className="form-label">Type here...</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <ul className="navbar-nav  justify-content-end">
                  <li className="nav-item d-flex align-items-center">
                    <a
                      className="btn btn-outline-primary btn-sm mb-0 me-3"
                      href="https://www.creative-tim.com/builder/material?ref=navbar-dashboard"
                    >
                      Online Status
                    </a>
                  </li>
                  <li className="nav-item d-flex align-items-center">
                    <button
                      style={{ border: 0 }}
                      onClick={() => {
                        localStorage.removeItem("admin");
                        localStorage.removeItem("admintoken");
                        navigate("/authentication/sign-in");
                      }}
                      className="nav-link text-body font-weight-bold px-0"
                    >
                      <i className="fa fa-user me-sm-1"></i>
                      <span className="d-sm-inline d-none">Sign Out</span>
                    </button>
                  </li>
                  <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                    <a
                      href="javascript:;"
                      onClick={() => {
                        setShowAside(!showAside);
                      }}
                      className="nav-link text-body p-0"
                      id="iconNavbarSidenav"
                    >
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line"></i>
                        <i className="sidenav-toggler-line"></i>
                        <i className="sidenav-toggler-line"></i>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item px-3 d-flex align-items-center">
                    <a href="javascript:;" className="nav-link text-body p-0">
                      <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                    </a>
                  </li>
                  <li className="nav-item dropdown pe-2 d-flex align-items-center">
                    <a
                      href="javascript:;"
                      className="nav-link text-body p-0"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-bell cursor-pointer"></i>
                    </a>
                    <ul
                      className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li className="mb-2">
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                          <div className="d-flex py-1">
                            <div className="my-auto">
                              <img
                                src="../assets/img/team-2.jpg"
                                className="avatar avatar-sm  me-3 "
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                <span className="font-weight-bold">New message</span> from Laur
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                <i className="fa fa-clock me-1"></i>
                                13 minutes ago
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="mb-2">
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                          <div className="d-flex py-1">
                            <div className="my-auto">
                              <img
                                src="../assets/img/small-logos/logo-spotify.svg"
                                className="avatar avatar-sm bg-gradient-dark  me-3 "
                              />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                <span className="font-weight-bold">New album</span> by Travis Scott
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                <i className="fa fa-clock me-1"></i>1 day
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                          <div className="d-flex py-1">
                            <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                              {/* <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                          <title>credit-card</title>
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                              <g transform="translate(1716.000000, 291.000000)">
                                <g transform="translate(453.000000, 454.000000)">
                                  <path class="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                  <path class="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg> */}
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                Payment successfully completed
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                <i className="fa fa-clock me-1"></i>2 days
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize ps-3">Customers table</h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Customer
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Function
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Status
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Registered
                            </th>
                            <th className="text-secondary opacity-7"></th>
                          </tr>
                        </thead>
                        <tbody>

                        {customersList.map(customer => {
                            return (
                              <tr key={customer.id}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <div>
                                    <img
                                      src={require('../../assets/images/team-1.jpg')}
                                      className="avatar avatar-sm me-3 border-radius-lg"
                                      alt="user1"
                                    />
                                  </div>
                                  <div className="d-flex flex-column justify-content-center">
                                    <h6 className="mb-0 text-sm">{customer.firstname+ ' ' + customer.lastname }</h6>
                                    <p className="text-xs text-secondary mb-0">
                                    {customer.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <p className="text-xs font-weight-bold mb-0">Manager</p>
                                <p className="text-xs text-secondary mb-0">Organization</p>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <span className="badge badge-sm bg-gradient-success">Online</span>
                              </td>
                              <td className="align-middle text-center">
                                <span className="text-secondary text-xs font-weight-bold">
                                  {customer.date_joined.substring(0, 10)}
                                </span>
                              </td>
                              <td className="align-middle">
                                <a
                                  href="javascript:;"
                                  className="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                            );
                          })}
                                             
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize ps-3">Projects table</h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center justify-content-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Project
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Budget
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Status
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">
                              Completion
                            </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex px-2">
                                <div>
                                  <img
                                    src="../assets/img/small-logos/logo-asana.svg"
                                    className="avatar avatar-sm rounded-circle me-2"
                                    alt="spotify"
                                  />
                                </div>
                                <div className="my-auto">
                                  <h6 className="mb-0 text-sm">Asana</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-sm font-weight-bold mb-0">$2,500</p>
                            </td>
                            <td>
                              <span className="text-xs font-weight-bold">working</span>
                            </td>
                            <td className="align-middle text-center">
                              <div className="d-flex align-items-center justify-content-center">
                                <span className="me-2 text-xs font-weight-bold">60%</span>
                                <div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar bg-gradient-info"
                                      role="progressbar"
                                      aria-valuenow="60"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <button className="btn btn-link text-secondary mb-0">
                                <i className="fa fa-ellipsis-v text-xs"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2">
                                <div>
                                  <img
                                    src="../assets/img/small-logos/github.svg"
                                    className="avatar avatar-sm rounded-circle me-2"
                                    alt="invision"
                                  />
                                </div>
                                <div className="my-auto">
                                  <h6 className="mb-0 text-sm">Github</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-sm font-weight-bold mb-0">$5,000</p>
                            </td>
                            <td>
                              <span className="text-xs font-weight-bold">done</span>
                            </td>
                            <td className="align-middle text-center">
                              <div className="d-flex align-items-center justify-content-center">
                                <span className="me-2 text-xs font-weight-bold">100%</span>
                                <div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar bg-gradient-success"
                                      role="progressbar"
                                      aria-valuenow="100"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-link text-secondary mb-0"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="fa fa-ellipsis-v text-xs"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2">
                                <div>
                                  <img
                                    src="../assets/img/small-logos/logo-atlassian.svg"
                                    className="avatar avatar-sm rounded-circle me-2"
                                    alt="jira"
                                  />
                                </div>
                                <div className="my-auto">
                                  <h6 className="mb-0 text-sm">Atlassian</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-sm font-weight-bold mb-0">$3,400</p>
                            </td>
                            <td>
                              <span className="text-xs font-weight-bold">canceled</span>
                            </td>
                            <td className="align-middle text-center">
                              <div className="d-flex align-items-center justify-content-center">
                                <span className="me-2 text-xs font-weight-bold">30%</span>
                                <div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar bg-gradient-danger"
                                      role="progressbar"
                                      aria-valuenow="30"
                                      aria-valuemin="0"
                                      aria-valuemax="30"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-link text-secondary mb-0"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="fa fa-ellipsis-v text-xs"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2">
                                <div>
                                  <img
                                    src="../assets/img/small-logos/bootstrap.svg"
                                    className="avatar avatar-sm rounded-circle me-2"
                                    alt="webdev"
                                  />
                                </div>
                                <div className="my-auto">
                                  <h6 className="mb-0 text-sm">Bootstrap</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-sm font-weight-bold mb-0">$14,000</p>
                            </td>
                            <td>
                              <span className="text-xs font-weight-bold">working</span>
                            </td>
                            <td className="align-middle text-center">
                              <div className="d-flex align-items-center justify-content-center">
                                <span className="me-2 text-xs font-weight-bold">80%</span>
                                <div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar bg-gradient-info"
                                      role="progressbar"
                                      aria-valuenow="80"
                                      aria-valuemin="0"
                                      aria-valuemax="80"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-link text-secondary mb-0"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="fa fa-ellipsis-v text-xs"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2">
                                <div>
                                  <img
                                    src="../assets/img/small-logos/logo-slack.svg"
                                    className="avatar avatar-sm rounded-circle me-2"
                                    alt="slack"
                                  />
                                </div>
                                <div className="my-auto">
                                  <h6 className="mb-0 text-sm">Slack</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-sm font-weight-bold mb-0">$1,000</p>
                            </td>
                            <td>
                              <span className="text-xs font-weight-bold">canceled</span>
                            </td>
                            <td className="align-middle text-center">
                              <div className="d-flex align-items-center justify-content-center">
                                <span className="me-2 text-xs font-weight-bold">0%</span>
                                <div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar bg-gradient-success"
                                      role="progressbar"
                                      aria-valuenow="0"
                                      aria-valuemin="0"
                                      aria-valuemax="0"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-link text-secondary mb-0"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="fa fa-ellipsis-v text-xs"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2">
                                <div>
                                  <img
                                    src="../assets/img/small-logos/devto.svg"
                                    className="avatar avatar-sm rounded-circle me-2"
                                    alt="xd"
                                  />
                                </div>
                                <div className="my-auto">
                                  <h6 className="mb-0 text-sm">Devto</h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-sm font-weight-bold mb-0">$2,300</p>
                            </td>
                            <td>
                              <span className="text-xs font-weight-bold">done</span>
                            </td>
                            <td className="align-middle text-center">
                              <div className="d-flex align-items-center justify-content-center">
                                <span className="me-2 text-xs font-weight-bold">100%</span>
                                <div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar bg-gradient-success"
                                      role="progressbar"
                                      aria-valuenow="100"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle">
                              <button
                                className="btn btn-link text-secondary mb-0"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="fa fa-ellipsis-v text-xs"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </main>
        <div className="fixed-plugin">
          <a className="fixed-plugin-button text-dark position-fixed px-3 py-2">
            <i className="material-icons py-2">settings</i>
          </a>
          <div className="card shadow-lg">
            <div className="card-header pb-0 pt-3">
              <div className="float-start">
                <h5 className="mt-3 mb-0">Material UI Configurator</h5>
                <p>See our dashboard options.</p>
              </div>
              <div className="float-end mt-4">
                <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                  <i className="material-icons">clear</i>
                </button>
              </div>
            </div>
            <hr className="horizontal dark my-1" />
            <div className="card-body pt-sm-3 pt-0">
              <div>
                <h6 className="mb-0">Sidebar Colors</h6>
              </div>
              <a href="javascript:void(0)" className="switch-trigger background-color">
                <div className="badge-colors my-2 text-start">
                  <span
                    className="badge filter bg-gradient-primary active"
                    data-color="primary"
                  ></span>
                  <span className="badge filter bg-gradient-dark" data-color="dark"></span>
                  <span className="badge filter bg-gradient-info" data-color="info"></span>
                  <span className="badge filter bg-gradient-success" data-color="success"></span>
                  <span className="badge filter bg-gradient-warning" data-color="warning"></span>
                  <span className="badge filter bg-gradient-danger" data-color="danger"></span>
                </div>
              </a>
              <div className="mt-3">
                <h6 className="mb-0">Sidenav Type</h6>
                <p className="text-sm">Choose between 2 different sidenav types.</p>
              </div>
              <div className="d-flex">
                <button className="btn bg-gradient-dark px-3 mb-2 active">Dark</button>
                <button className="btn bg-gradient-dark px-3 mb-2 ms-2">Transparent</button>
                <button className="btn bg-gradient-dark px-3 mb-2 ms-2">White</button>
              </div>
              <p className="text-sm d-xl-none d-block mt-2">
                You can change the sidenav type just on desktop view.
              </p>
              <div className="mt-3 d-flex">
                <h6 className="mb-0">Navbar Fixed</h6>
                <div className="form-check form-switch ps-0 ms-auto my-auto">
                  <input
                    className="form-check-input mt-1 ms-auto"
                    type="checkbox"
                    id="navbarFixed"
                  />
                </div>
              </div>
              <hr className="horizontal dark my-3" />
              <div className="mt-2 d-flex">
                <h6 className="mb-0">Light / Dark</h6>
                <div className="form-check form-switch ps-0 ms-auto my-auto">
                  <input
                    className="form-check-input mt-1 ms-auto"
                    type="checkbox"
                    id="dark-version"
                  />
                </div>
              </div>
              <hr className="horizontal dark my-sm-4" />
              <a
                className="btn bg-gradient-info w-100"
                href="https://www.creative-tim.com/product/material-dashboard-pro"
              >
                Free Download
              </a>
              <a
                className="btn btn-outline-dark w-100"
                href="https://www.creative-tim.com/learning-lab/bootstrap/overview/material-dashboard"
              >
                View documentation
              </a>
              <div className="w-100 text-center">
                <a
                  className="github-button"
                  href="https://github.com/creativetimofficial/material-dashboard"
                  data-icon="octicon-star"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star creativetimofficial/material-dashboard on GitHub"
                >
                  Star
                </a>
                <h6 className="mt-3">Thank you for sharing!</h6>
                <a
                  href="https://twitter.com/intent/tweet?text=Check%20Material%20UI%20Dashboard%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23bootstrap5&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fsoft-ui-dashboard"
                  className="btn btn-dark mb-0 me-2"
                >
                  <i className="fab fa-twitter me-1" aria-hidden="true"></i> Tweet
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-dashboard"
                  className="btn btn-dark mb-0 me-2"
                >
                  <i className="fab fa-facebook-square me-1" aria-hidden="true"></i> Share
                </a>
              </div>
            </div>
          </div>
        </div>
        <script src="../assets/js/core/popper.min.js"></script>
        <script src="../assets/js/core/bootstrap.min.js"></script>
        <script src="../assets/js/plugins/perfect-scrollbar.min.js"></script>
        <script src="../assets/js/plugins/smooth-scrollbar.min.js"></script>

        <script async defer src="https://buttons.github.io/buttons.js"></script>
        <script src="../assets/js/material-dashboard.min.js?v=3.0.4"></script>
      </body>
    </>
  );
}

export default Tables;
