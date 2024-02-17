import { useState } from "react";
import { UserSchema } from "../../../formValidation/addForm";
import { loginUser } from "apiservices/authService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function Illustration() {
  const [admin, setAdmin] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await UserSchema.isValid(userData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      await loginUser(userData)
        .then((res) => {
          if (res.data) {
            toast.success("User Login Successfully");
            setAdmin(res.data.user);
            localStorage.setItem("adminToken", res.data.token);
            localStorage.setItem("admin", JSON.stringify(res.data.user));
          } else {
            toast.error("Authnentication Failed", { draggable: false });
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

  return (
    <body className="bg-gray-200">
      {admin && <Navigate to="/dashboard" replace={true} />}

      <ToastContainer />
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
              <div className="container-fluid ps-2 pe-0">
                <a
                  className="navbar-brand font-weight-bolder ms-lg-0 ms-3 "
                  href="../pages/dashboard.html"
                >
                  Gomindz Inventory Admin Dashboard
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
                <div className="collapse navbar-collapse" id="navigation">
                  <ul className="navbar-nav mx-auto"></ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <main className="main-content  mt-0">
        <div
          className="page-header align-items-start min-vh-100"
          style={{
            backgroundImage:
              "url(" +
              "https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" +
              ")",
          }}
        >
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container my-auto">
            <div className="row" style={{ marginTop: 100 }}>
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                        Sign in
                      </h4>
                    </div>
                  </div>
                  <div className="card-body">
                    <form role="form" className="text-start">
                      <div className="input-group input-group-outline my-3">
                        <label className="form-label"></label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label"></label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input className="form-check-input" type="checkbox" id="rememberMe" />
                        <label className="form-check-label mb-0 ms-3" /* for="rememberMe" */>
                          Remember me
                        </label>
                      </div>
                      <div className="text-center">
                        <a href="/dashboard">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn bg-gradient-primary w-100 my-4 mb-2"
                          >
                            Sign in
                          </button>
                        </a>
                      </div>
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
                    Copyright ©{new Date().getFullYear()}, GoMindz
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </body>
  );
}

export default Illustration;
