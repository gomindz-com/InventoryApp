import useMediaQuery from "@mui/material/useMediaQuery";
import { toggleActivateSubscriber } from "apiservices/subscribersService";
import { getSubscribers } from "apiservices/subscribersService";
import { resetSubscriberPassword } from "apiservices/authService";
import Aside from "examples/Aside";
import Footer from "examples/Footer";
import { useState, useEffect } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { PiPasswordDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Spinner from "components/Spinner";
import { toast } from "react-toastify";

function Tables() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [showAside, setShowAside] = useState(true);
  const matches = useMediaQuery("(max-width: 1199.98px)");
  const [customersList, setCustomersList] = useState([]);
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = async (id, is_active) => {
    setIsToggled((prevState) => !prevState);
    try {
      await toggleActivateSubscriber(id, is_active)
        .then(async(res) => {
          if (res.status == 200) {
            await handleGetSubscribersList();
          } else {
          }
        })
        .catch((err) => console.log("Error in Getting setCustomersList", err));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSubscribersList = async () => {
    setCustomersList([]);
    try {
      await getSubscribers()
        .then((res) => {
          if (res.data?.status) {
            setCustomersList(res.data.subscribers);
            setLoading(false);
            toast.success("Successfull List");

          } else {
            setCustomersList([]);
            setLoading(false);
          }
        })
        .catch((err) => console.log("Error in Getting setCustomersList", err));
    } catch (error) {
      console.log(error);
    }
  };


  const handleResetSubscriberPassword = async (email) => {
    try {
      await resetSubscriberPassword(email)
        .then((res) => {
          if (res.status == 200) {
            setLoading(false);
            toast.success("The user password has been updated with the Default Password of password@123");

          } else {
            setLoading(false);
          }
        })
        .catch((err) => console.log("Error in Getting setCustomersList", err));
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    handleGetSubscribersList();
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
                      <h6 className="text-white text-capitalize ps-3">Subscribers table</h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    {loading ? (
                      <Spinner />
                    ) : (
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Customer
                              </th>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                Email
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Status
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                              <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"></th>
                              <th className="text-secondary opacity-7">Reset Password</th>
                              <th className="text-secondary opacity-7"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {customersList.map((subscriber) => {
                              let imageUrl = subscriber.profile;
                              const ipAddress = "137.184.113.183";
                              imageUrl = imageUrl.replace("localhost:8000", ipAddress);
                              return (
                                <tr key={subscriber.id}>
                                  <td>
                                    <div className="d-flex px-2 py-1">
                                      <div>
                                        <img
                                          src={imageUrl}
                                          className="avatar avatar-sm me-3 border-radius-lg"
                                          alt="user1"
                                        />
                                      </div>
                                      <div className="d-flex flex-column justify-content-center">
                                        <h6 className="mb-0 text-sm">
                                          {subscriber.first_name ??
                                            "NAN" + " " + subscriber.lastname}
                                        </h6>
                                       
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">
                                      {subscriber.email}
                                    </p>
                                  </td>
                                  <td className="align-middle text-center text-sm">
                                    <span
                                      className={
                                        subscriber.is_active
                                          ? "badge badge-sm bg-gradient-success"
                                          : "badge badge-sm bg-gradient-danger"
                                      }
                                    >
                                      {subscriber.is_active ? "Active" : "Inactive"}
                                    </span>
                                  </td>
                                  <td className="align-middle text-center">
                                    <span className="text-secondary text-xs font-weight-bold">
                                    </span>
                                  </td>
                                  <td className="align-middle">
                                    <a
                                      href="javascript:;"
                                      className="text-secondary font-weight-bold text-xs"
                                      data-toggle="tooltip"
                                      data-original-title="Edit user"
                                    >
                                      {subscriber.status}
                                    </a>
                                  </td>

                                  <td className="align-middle">
                                    <button
                                      onClick={() => {
                                        handleResetSubscriberPassword(subscriber.email);
                                      }}
                                      style={{
                                        border: "0",
                                        background: "transparent",
                                      }}
                                    >
                                      <PiPasswordDuotone fontSize={30} />

                                    </button>
                                  </td>

                                  <td className="align-middle">
                                    <button
                                      onClick={() => {
                                        handleToggle(subscriber.id, subscriber.is_active);
                                      }}
                                      style={{
                                        border: "0",
                                        background: "transparent",
                                      }}
                                    >
                                      {subscriber.is_active ? (
                                        <FaToggleOn fontSize={30} />
                                      ) : (
                                        <FaToggleOff fontSize={30} />
                                      )}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
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
