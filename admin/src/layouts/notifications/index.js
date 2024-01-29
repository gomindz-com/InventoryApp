import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import Aside from "examples/Aside";
import Footer from "examples/Footer";
import "react-toastify/dist/ReactToastify.css";
import { getStoreActivities } from "apiservices/activityService";

function Notifications() {
  const navigate = useNavigate();
  const [showAside, setShowAside] = useState(true);
  const matches = useMediaQuery("(max-width: 1199.98px)");
  const [activityList, setActivityList] = useState([]);

  const handleGetActivityList = async () => {
    setActivityList([]);
    try {
      await getStoreActivities()
        .then((res) => {
          if (res.data?.status) {
            setActivityList(res.data.activities);
          } else {
            setActivityList([]);
          }
        })
        .catch((err) => console.log("Error in Getting Activity List", err));
    } catch (error) {
      console.log(error);
    }
  };
  //END GET CUSTOMERS

  useEffect(() => {
    handleGetActivityList();
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
                    Notifications
                  </li>
                </ol>
                <h6 className="font-weight-bolder mb-0">Notifications</h6>
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
                      href="javascript:;"
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
              <div className="col-lg-8 col-md-10 mx-auto">
                <div className="card mt-4">
                  <div className="card-header p-3">
                    <h5 className="mb-0">Alerts</h5>
                  </div>
                  <div className="card-body p-3 pb-0">
                    {/* <div className="alert alert-primary alert-dismissible text-white" role="alert">
                      <span className="text-sm">
                        A simple primary alert with{" "}
                        <a href="javascript:;" className="alert-link text-white">
                          an example link
                        </a>
                        . Give it a click if you like.
                      </span>
                      <button
                        type="button"
                        className="btn-close text-lg py-3 opacity-10"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div
                      className="alert alert-secondary alert-dismissible text-white"
                      role="alert"
                    >
                      <span className="text-sm">
                        A simple secondary alert with{" "}
                        <a href="javascript:;" className="alert-link text-white">
                          an example link
                        </a>
                        . Give it a click if you like.
                      </span>
                      <button
                        type="button"
                        className="btn-close text-lg py-3 opacity-10"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div> */}

                    {activityList.map((activity) => {
                      return (
                        <div
                          key={activity.id}
                          className="alert alert-success alert-dismissible text-white"
                          role="alert"
                        >
                          <span className="text-sm" >
                            {activity.details}{" "}
                            <a href="javascript:;" className="alert-link text-white">
                              {activity.activity_type}
                            </a>{" by "} {activity.username}
                            . {Date(activity.timestamp)}
                            
                          </span>
                          <button
                            type="button"
                            className="btn-close text-lg py-3 opacity-10"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      );
                    })}

                    {/* <div className="alert alert-success alert-dismissible text-white" role="alert">
                      <span className="text-sm">
                        A simple success alert with{" "}
                        <a href="javascript:;" className="alert-link text-white">
                          an example link
                        </a>
                        . Give it a click if you like.
                      </span>
                      <button
                        type="button"
                        className="btn-close text-lg py-3 opacity-10"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="alert alert-danger alert-dismissible text-white" role="alert">
                      <span className="text-sm">
                        A simple danger alert with{" "}
                        <a href="javascript:;" className="alert-link text-white">
                          an example link
                        </a>
                        . Give it a click if you like.
                      </span>
                      <button
                        type="button"
                        className="btn-close text-lg py-3 opacity-10"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="alert alert-warning alert-dismissible text-white" role="alert">
                      <span className="text-sm">
                        A simple warning alert with{" "}
                        <a href="javascript:;" className="alert-link text-white">
                          an example link
                        </a>
                        . Give it a click if you like.
                      </span>
                      <button
                        type="button"
                        className="btn-close text-lg py-3 opacity-10"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="alert alert-info alert-dismissible text-white" role="alert">
                      <span className="text-sm">
                        A simple info alert with{" "}
                        <a href="javascript:;" className="alert-link text-white">
                          an example link
                        </a>
                        . Give it a click if you like.
                      </span>
                      <button
                        type="button"
                        className="btn-close text-lg py-3 opacity-10"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="alert alert-light alert-dismissible text-white" role="alert">
                      <span className="text-sm">
                        A simple light alert with{" "}
                        <a href="javascript:;" className="alert-link text-white">
                          an example link
                        </a>
                        . Give it a click if you like.
                      </span>
                      <button
                        type="button"
                        className="btn-close text-lg py-3 opacity-10"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="alert alert-dark alert-dismissible text-white" role="alert">
                      <span className="text-sm">
                        A simple dark alert with{" "}
                        <a href="javascript:;" className="alert-link text-white">
                          an example link
                        </a>
                        . Give it a click if you like.
                      </span>
                      <button
                        type="button"
                        className="btn-close text-lg py-3 opacity-10"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="card mt-4">
                  <div className="card-header p-3">
                    <h5 className="mb-0">Notifications</h5>
                    <p className="text-sm mb-0">
                      Notifications Flag
                      
                    </p>
                  </div>
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-lg-3 col-sm-6 col-12">
                        <button
                          className="btn bg-gradient-success w-100 mb-0 toast-btn"
                          type="button"
                          data-target="successToast"
                        >
                          Success
                        </button>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12 mt-sm-0 mt-2">
                        <button
                          className="btn bg-gradient-info w-100 mb-0 toast-btn"
                          type="button"
                          data-target="infoToast"
                        >
                          Info
                        </button>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12 mt-lg-0 mt-2">
                        <button
                          className="btn bg-gradient-warning w-100 mb-0 toast-btn"
                          type="button"
                          data-target="warningToast"
                        >
                          Warning
                        </button>
                      </div>
                      <div className="col-lg-3 col-sm-6 col-12 mt-lg-0 mt-2">
                        <button
                          className="btn bg-gradient-danger w-100 mb-0 toast-btn"
                          type="button"
                          data-target="dangerToast"
                        >
                          Danger
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="position-fixed bottom-1 end-1 z-index-2">
              <div
                className="toast fade hide p-2 bg-white"
                role="alert"
                aria-live="assertive"
                id="successToast"
                aria-atomic="true"
              >
                <div className="toast-header border-0">
                  <i className="material-icons text-success me-2">check</i>
                  <span className="me-auto font-weight-bold">Material Dashboard </span>
                  <small className="text-body">11 mins ago</small>
                  <i
                    className="fas fa-times text-md ms-3 cursor-pointer"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></i>
                </div>
                <hr className="horizontal dark m-0" />
                <div className="toast-body">Hello, world! This is a notification message.</div>
              </div>
              <div
                className="toast fade hide p-2 mt-2 bg-gradient-info"
                role="alert"
                aria-live="assertive"
                id="infoToast"
                aria-atomic="true"
              >
                <div className="toast-header bg-transparent border-0">
                  <i className="material-icons text-white me-2">notifications</i>
                  <span className="me-auto text-white font-weight-bold">Material Dashboard </span>
                  <small className="text-white">11 mins ago</small>
                  <i
                    className="fas fa-times text-md text-white ms-3 cursor-pointer"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></i>
                </div>
                <hr className="horizontal light m-0" />
                <div className="toast-body text-white">
                  Hello, world! This is a notification message.
                </div>
              </div>
              <div
                className="toast fade hide p-2 mt-2 bg-white"
                role="alert"
                aria-live="assertive"
                id="warningToast"
                aria-atomic="true"
              >
                <div className="toast-header border-0">
                  <i className="material-icons text-warning me-2">travel_explore</i>
                  <span className="me-auto font-weight-bold">Material Dashboard </span>
                  <small className="text-body">11 mins ago</small>
                  <i
                    className="fas fa-times text-md ms-3 cursor-pointer"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></i>
                </div>
                <hr className="horizontal dark m-0" />
                <div className="toast-body">Hello, world! This is a notification message.</div>
              </div>
              <div
                className="toast fade hide p-2 mt-2 bg-white"
                role="alert"
                aria-live="assertive"
                id="dangerToast"
                aria-atomic="true"
              >
                <div className="toast-header border-0">
                  <i className="material-icons text-danger me-2">campaign</i>
                  <span className="me-auto text-gradient text-danger font-weight-bold">
                    Material Dashboard{" "}
                  </span>
                  <small className="text-body">11 mins ago</small>
                  <i
                    className="fas fa-times text-md ms-3 cursor-pointer"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></i>
                </div>
                <hr className="horizontal dark m-0" />
                <div className="toast-body">Hello, world! This is a notification message.</div>
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
      </body>
    </>
  );
}

export default Notifications;
