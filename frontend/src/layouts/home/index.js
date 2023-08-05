import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useArgonController, setLayout } from "context";
import "./styles.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "animate.css/animate.min.css";

import { useNavigate } from "react-router-dom";

import static1 from "../../assets/images/staic1.png";
import static2 from "../../assets/images/staic2.png";

import static3 from "../../assets/images/staic3.png";
import multipleUser from "../../assets/images/multipleUser.png";
import notified from "../../assets/images/notified.png";
import werehousing from "../../assets/images/werehousing.png";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper";

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCoverflow]);

const bgImage = [
  "https://www.maersk.com/~/media_sc9/maersk/news/press-releases/images/2022/11/maersk-warehouse-bangladesh_1024x576.jpg?w=877&hash=8DED7E83FF7A116871655E909C77BA9D",
  "https://media.sortly.com/wp-content/uploads/2021/10/20040652/Warehouse-management-team.jpg",
];

function Home() {
  const [controller, dispatch] = useArgonController();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "home");
  }, [pathname]);

  return (
    <div className="about-us bg-gray-200">
      <nav className="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3  navbar-transparent ">
        <div className="container">
          <div className="navbar-brand title">
            Go Inventory App
          </div>
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
                  {user ? "Sign Out" : "Sign In"}
                </Link>
              </li>

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

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {bgImage.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <header style={{}} className="bg-gradient-dark">
              <div
                className="page-header min-vh-75"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                }}
              >
                <div className="container" style={{ marginTop: 100 }}>
                  <div className="row justify-content-center">
                    <div className="col-lg-8 text-center mx-auto my-auto">
                      <h1 className="text-white">Work with an amazing Inventory System</h1>
                      <p className="    lead mb-5 text-white mx-auto">
                        We’re constantly trying to express ourselves and actualize our dreams.{" "}
                      </p>

                      <section className="py-7 animate__animated animate__fadeInUp">
                        <div style={{}} className="d-flex justify-content-center">
                          <a
                            className="nav-link pe-3"
                            href="https://www.linkedin.com/company/gomindz/"
                            target={"_blank"}
                            rel="noreferrer"
                          >
                            <i className="fab fa-linkedin opacity-8 fa-lg"></i>
                          </a>

                          <a
                            className="nav-link pe-1 mr-5"
                            href="https://www.facebook.com/GomindzAcademy"
                            target={"_blank"}
                            rel="noreferrer"
                          >
                            <i className="fab fa-facebook fa-lg opacity-8"></i>
                          </a>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </header>
          </SwiperSlide>
        ))}
      </Swiper>
      <section className="py-7 animate__animated animate__fadeInUp">
        <div></div>

        <div className="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
          <section className="py-7">
            <div style={{ alignItems: "center" }} className="container ">
              <div className="row" style={{ flexWrap: "nowrap" }}>
                <div style={{ display: "block", width: "100%" }} className="col-lg-4 mt-lg-0 mt-4">
                  <Swiper
                    spaceBetween={30}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: false,
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    className="mySwiper"
                    style={{
                      width: "100%",
                      paddingBottom: "100px",
                      marginBottom: "100px",
                    }}
                  >
                    <SwiperSlide
                      style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        width: "350px",
                        height: "100px",
                      }}
                    >
                      <div className="card">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                          <a className="d-block blur-shadow-image">
                            <img
                              src={static1}
                              alt="img-colored-shadow"
                              className="img-fluid border-radius-lg"
                              style={{ height: 250 }}
                            />
                          </a>
                        </div>
                        <div className="card-body text-center">
                          <h5 className="font-weight-normal">
                            <div>Accurate Stock Recordes</div>
                          </h5>
                          <p className="mb-0">
                            Get accurate stock records with straightforward figures. You need not
                            worry about counting everything in the store.
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide
                      style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        width: "300px",
                        height: "300px",
                      }}
                    >
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
                            <div>Clear figures and graphs</div>
                          </h5>
                          <p className="mb-0">
                            With clear figures and graphs, you can read all statistics of your store
                            and stay in the loop.
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide
                      style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        width: "300px",
                        height: "300px",
                      }}
                    >
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
                            <div>Accurate statistics</div>
                          </h5>
                          <p className="mb-0">
                            With accurate statistics, you can make the best decisions and improve
                            your business.
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide
                      style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        width: "300px",
                        height: "300px",
                      }}
                    >
                      <div className="card">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                          <a className="d-block blur-shadow-image">
                            <img
                              src={notified}
                              alt="img-colored-shadow"
                              className="img-fluid border-radius-lg"
                              style={{ height: 250 }}
                            />
                          </a>
                        </div>
                        <div className="card-body text-center">
                          <h5 className="font-weight-normal">
                            <div>Get notified</div>
                          </h5>
                          <p className="mb-0">
                            Get weekly notification about the status of your business on whatsApp
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide
                      style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        width: "300px",
                        height: "300px",
                      }}
                    >
                      <div className="card">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                          <a className="d-block blur-shadow-image">
                            <img
                              src={werehousing}
                              alt="img-colored-shadow"
                              className="img-fluid border-radius-lg"
                              style={{ height: 275 }}
                            />
                          </a>
                        </div>
                        <div className="card-body text-center">
                          <h5 className="font-weight-normal">
                            <div>Multiple Werehousing</div>
                          </h5>
                          <p className="mb-0">
                            With our Enterprise plan. you can manage multiple werehousces in
                            diffrent location .
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide
                      style={{
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        width: "300px",
                        height: "300px",
                      }}
                    >
                      <div className="card">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                          <a className="d-block blur-shadow-image">
                            <img
                              src={multipleUser}
                              alt="img-colored-shadow"
                              className="img-fluid border-radius-lg"
                              style={{ height: 275 }}
                            />
                          </a>
                        </div>
                        <div className="card-body text-center">
                          <h5 className="font-weight-normal">
                            <a href="#">Multiple User Sign Up</a>
                          </h5>
                          <p className="mb-0">
                            Register up to ten users with diffrenct roles and permission.
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                    {/* Add more SwiperSlides for additional cards */}
                  </Swiper>
                  <div style={{ backgroundColor: "red" }} className="swiper-pagination"></div>
                </div>
                {/* Add other card items here */}
              </div>
            </div>
          </section>

          {/* Testimoney */}

          {/* Testtimoney end */}
          <section style={{ background: "#e7e9eb", borderRadius: 20 }} className=" card-header ">
            <div className="container">
              <div className="row">
                <div className="col-md-8 text-start mb-5 mt-5">
                  <h3 className="text-black z-index-1 position-relative">Payment methods</h3>
                </div>
              </div>

              <div className="row mt-4">
                {/* first card */}
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                  {/* Card content */}
                  <div className="position-relative shadow rounded border-top border-5 border-info bg-white">
                    {/* Card icon */}
                    <div
                      className="d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle bg-info rounded-circle"
                      style={{ width: "45px", height: "45px", marginTop: "-3px" }}
                    >
                      <i className="fa fa-cog text-white"></i>
                    </div>
                    {/* Card header */}
                    <div className="text-center border-bottom p-4 pt-5">
                      <h4 className="fw-bold">Basic</h4>
                    </div>
                    {/* Card body */}
                    <div className="text-center border-bottom p-4">
                      <h1 className="mb-3">
                        <small
                          className="align-top"
                          style={{ fontSize: "22px", lineHeight: "45px" }}
                        ></small>
                        Free
                        <small
                          className="align-bottom"
                          style={{ fontSize: "16px", lineHeight: "40px" }}
                        ></small>
                      </h1>
                      <a className="btn btn-info px-4 py-2" href="">
                        Subscribe
                      </a>
                    </div>
                    {/* Card footer */}
                    <div className="p-4">
                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i> 1 user
                      </p>
                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>3 Product Categories
                      </p>
                      <p className="border-bottom pb-9  "></p>

                      <p className="border-bottom pb-5"></p>
                    </div>
                  </div>
                </div>

                {/* second card */}
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="1.2s">
                  {/* Card content */}
                  <div className="position-relative shadow rounded border-top border-5 border-info bg-white">
                    {/* Card icon */}
                    <div
                      className="d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle bg-info rounded-circle"
                      style={{ width: "45px", height: "45px", marginTop: "-3px" }}
                    >
                      <i className="fa fa-cog text-white"></i>
                    </div>
                    {/* Card header */}
                    <div className="text-center border-bottom p-4 pt-5">
                      <h4 className="fw-bold">Standard</h4>
                    </div>
                    {/* Card body */}
                    <div className="text-center border-bottom p-4">
                      <h1 className="mb-3">
                        <small
                          className="align-top"
                          style={{ fontSize: "22px", lineHeight: "45px" }}
                        >
                          D
                        </small>
                        500
                        <small
                          className="align-bottom"
                          style={{ fontSize: "16px", lineHeight: "40px" }}
                        >
                          / Month
                        </small>
                      </h1>
                      <a className="btn btn-info px-4 py-2" href="">
                        Subscribe
                      </a>
                    </div>
                    {/* Card footer */}
                    <div className="p-4">
                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>2 Users
                      </p>
                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>15 Product categories
                      </p>
                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>Monthly Stock notification
                      </p>
                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>Single Warehouse managment
                      </p>

                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>Expired Product Tracking
                      </p>
                      <p className="pb-3"></p>
                    </div>
                  </div>
                </div>

                {/* third card */}
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="1.8s">
                  {/* Card content */}
                  <div className="position-relative shadow rounded border-top border-5 border-info bg-white">
                    {/* Card icon */}
                    <div
                      className="d-flex align-items-center justify-content-center position-absolute top-0 start-50 translate-middle bg-info rounded-circle"
                      style={{ width: "45px", height: "45px", marginTop: "-3px" }}
                    >
                      <i className="fa fa-cog text-white"></i>
                    </div>
                    {/* Card header */}
                    <div className="text-center border-bottom p-4 pt-5">
                      <h4 className="fw-bold">Enterprise</h4>
                    </div>
                    {/* Card body */}
                    <div className="text-center border-bottom p-4">
                      <h1 className="mb-3">
                        <small
                          className="align-top"
                          style={{ fontSize: "22px", lineHeight: "45px" }}
                        >
                          D
                        </small>
                        2500
                        <small
                          className="align-bottom"
                          style={{ fontSize: "16px", lineHeight: "40px" }}
                        >
                          / Month
                        </small>
                      </h1>
                      <a className="btn btn-info px-4 py-2" href="">
                        Subscribe
                      </a>
                    </div>
                    {/* Card footer */}
                    <div className="p-4">
                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>10 Users
                      </p>
                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>Unlimited categories
                      </p>
                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>Weekly stock notification
                      </p>
                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>Multiple warehouse managment
                      </p>

                      <p className="border-bottom pb-3">
                        <i className="fa fa-check  me-3"></i>Expired Product Tracking
                      </p>

                      <p className="mb-0">
                        <i className="fa fa-check me-3"></i>Notification on whatsapp
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-7">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <div className="row justify-content-start">
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="card border-primary" style={{ width: "100%", height: "90%" }}>
                        <div className="card-body text-primary">
                          <h5 className="card-title">Stock Management</h5>
                          <p className="card-text" style={{ color: "black" }}>
                            Track and monitor quantity of products
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            Reconcile your purchase with current stock
                          </p>

                          <p className="card-text" style={{ color: "black" }}>
                            Keep track of suplliers and products .
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="card border-primary" style={{ height: "90%", width: "100%" }}>
                        <div className="card-body text-primary">
                          <h5 className="card-title">Expiry Managment</h5>
                          <p className="card-text" style={{ color: "black" }}>
                            Keep track of and monitor expired/ expiring item in the stock .
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            pre notifications on items about to expire .
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            get report of all expired items in one click .
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="card border-primary" style={{ height: "90%", width: "100%" }}>
                        <div className="card-body text-primary">
                          <h5 className="card-title">User friendly interface</h5>
                          <p className="card-text" style={{ color: "black" }}>
                            Comprehensive and mordern user friendly interface .
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            Paster service expriance .
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            Diffrent user themes: light mode or Dark mode.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-start mt-4">
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="card border-primary" style={{ height: "90%", width: "100%" }}>
                        <div className="card-body text-primary">
                          <h5 className="card-title">Sales management</h5>
                          <p className="card-text" style={{ color: "black" }}>
                            Calculate profite on diffrent products and categories in real time{" "}
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            Automatically update stock after each sale .
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            Notify on product shortage
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="card border-primary" style={{ height: "90%", width: "100%" }}>
                        <div className="card-body text-primary">
                          <h5 className="card-title">Reporting </h5>
                          <p className="card-text" style={{ color: "black" }}>
                            Sales and Stock report
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            Purchase and supply reports
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            Debtors and creditors report
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            petty cash and cash book report
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 mb-4">
                      <div className="card border-primary" style={{ height: "90%", width: "100%" }}>
                        <div className="card-body text-primary">
                          <h5 className="card-title">notifications</h5>
                          <p className="card-text" style={{ color: "black" }}>
                            Whatsapp notification on sales reports{" "}
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            Monthly and qurtely report on transaction{" "}
                          </p>
                          <p className="card-text" style={{ color: "black" }}>
                            closing and opening stock
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <div className="col-md-5 ">
                <div className="position-relative">
                  <img
                    className="max-width-10 w-100 "
                    src={require("../../assets/images/GomindzInventory.png")}
                    alt="image"
                  />
                </div>
              </div> */}
        </div>
      </section>

      {/* <div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
      >
        {slide_img.map((img, i) => {
          return (
            <SwiperSlide style={{backgroundImage: 'url("your-image.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            width: '300px',
            height: '300px', }} key={i}>
              <img style={{width: "50%"}} src={img} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div> */}

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
                </ul>
              </div>
            </div>
            <div className="col-md-3 mb-4 ms-auto">
              <div>
                <h6 className="font-weight-bolder mb-4">Go Inventory App</h6>
              </div>
              <div>
                <ul className="d-flex flex-row ms-n3 nav">
                  <li className="nav-item">
                    <a
                      className="nav-link pe-1"
                      href="https://www.linkedin.com/company/gomindz/"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <i className="fab fa-linkedin text-lg opacity-8"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link pe-1"
                      href="https://www.facebook.com/GomindzAcademy"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <i className="fab fa-facebook text-lg opacity-8"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* starting */}

            {/* closing */}

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
