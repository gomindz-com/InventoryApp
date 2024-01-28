import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Aside from "examples/Aside/index.js";
import Footer from "examples/Footer/index.js";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bubble } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

function Default() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showAside, setShowAside] = useState(true);
  const matches = useMediaQuery("(max-width: 1199.98px)");

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const optionsBubble = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const dataBubble = {
    datasets: [
      {
        label: "Red dataset",
        data: Array.from({ length: 50 }, () => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: "white",
      },
      {
        label: "Blue dataset",
        data: Array.from({ length: 50 }, () => ({
          x: faker.datatype.number({ min: -100, max: 100 }),
          y: faker.datatype.number({ min: -100, max: 100 }),
          r: faker.datatype.number({ min: 5, max: 20 }),
        })),
        backgroundColor: "green",
      },
    ],
  };

  return (
    <>
      <body className="g-sidenav-show  bg-gray-200">
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
                    Dashboard
                  </li>
                </ol>
                <h6 className="font-weight-bolder mb-0">Dashboard</h6>
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
                    <button
                      style={{ border: 0 }}
                      onClick={() => {
                        localStorage.removeItem("admin");
                        localStorage.removeItem("adminToken");
                        navigate("/authentication/sign-in");
                      }}
                      className="nav-link text-body font-weight-bold px-0"
                    >
                      <i className="fa fa-user me-sm-1"></i>
                      <span className="d-sm-inline d-none">Sign Out [Admin]</span>
                    </button>
                  </li>
                  <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                    <a
                      className="nav-link text-body p-0"
                      onClick={() => {
                        setShowAside(!showAside);
                      }}
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
                            <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto"></div>
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
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">weekend</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">Todays Money</p>
                      <h4 className="mb-0">$53k</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">+55% </span>than
                      last week
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">person</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">Todays Users</p>
                      <h4 className="mb-0">2,300</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">+3% </span>than last
                      month
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">person</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">New Clients</p>
                      <h4 className="mb-0">3,462</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-danger text-sm font-weight-bolder">-2%</span> than
                      yesterday
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">weekend</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">Sales</p>
                      <h4 className="mb-0">$103,430</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">+5% </span>than
                      yesterday
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-4 col-md-6 mt-4 mb-4">
                <div className="card z-index-2 ">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <div className="chart">
                        <canvas id="chart-bars" className="chart-canvas" height="170"></canvas>

                        {/* <Bubble options={optionsBubble} data={dataBubble} />                      */}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6 className="mb-0 ">Website Views</h6>
                    <p className="text-sm ">Last Campaign Performance</p>
                    <hr className="dark horizontal" />
                    <div className="d-flex ">
                      <i className="material-icons text-sm my-auto me-1">schedule</i>
                      <p className="mb-0 text-sm"> campaign sent 2 days ago </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mt-4 mb-4">
                <div className="card z-index-2  ">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                    <div className="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                      <div className="chart">
                        <Bubble options={optionsBubble} data={dataBubble} />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6 className="mb-0 "> Daily Sales </h6>
                    <p className="text-sm ">
                      {" "}
                      (<span className="font-weight-bolder">+15%</span>) increase in today sales.{" "}
                    </p>
                    <hr className="dark horizontal" />
                    <div className="d-flex ">
                      <i className="material-icons text-sm my-auto me-1">schedule</i>
                      <p className="mb-0 text-sm"> updated 4 min ago </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mb-3">
                <div className="card z-index-2 ">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                    <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                      <div className="chart">
                        <Line data={data} options={options} className="chart-canvas" height="170" />
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <h6 className="mb-0 ">Completed Tasks</h6>
                    <p className="text-sm ">Last Campaign Performance</p>
                    <hr className="dark horizontal" />
                    <div className="d-flex ">
                      <i className="material-icons text-sm my-auto me-1">schedule</i>
                      <p className="mb-0 text-sm">just updated</p>
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
                <button
                  className="btn bg-gradient-dark px-3 mb-2 active"
                  data-className="bg-gradient-dark"
                >
                  Dark
                </button>
                <button
                  className="btn bg-gradient-dark px-3 mb-2 ms-2"
                  data-className="bg-transparent"
                >
                  Transparent
                </button>
                <button className="btn bg-gradient-dark px-3 mb-2 ms-2" data-className="bg-white">
                  White
                </button>
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

        <script src="../../assets/js/core/popper.min.js"></script>
        <script src="../../assets/js/core/bootstrap.min.js"></script>
        <script src="../../assets/js/plugins/perfect-scrollbar.min.js"></script>
        <script src="../../assets/js/plugins/smooth-scrollbar.min.js"></script>
        <script src="../../assets/js/plugins/chartjs.min.js"></script>
      </body>
    </>
  );
}

export default Default;
