
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
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { FacebookIcon } from "assets/images/icons/facebookIcon";
import { Twitter } from "assets/images/icons/twitter";
import { Linkiding } from "assets/images/icons/linkding";
import { Instagram } from "assets/images/icons/instagram";
// import { Autoplay, Pagination, Navigation } from 'swiper/modules';

SwiperCore.use([Navigation, Pagination, Autoplay]);


// Image
const bgImage = [

  "https://www.maersk.com/~/media_sc9/maersk/news/press-releases/images/2022/11/maersk-warehouse-bangladesh_1024x576.jpg?w=877&hash=8DED7E83FF7A116871655E909C77BA9D",
"https://media.sortly.com/wp-content/uploads/2021/10/20040652/Warehouse-management-team.jpg",
]
 


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
    <div   className="about-us bg-gray-200">
      <ToastContainer />

      <nav   className="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3  navbar-transparent ">
        <div   className="container">


          <div  style={{fontSize: 30, fontWeight: "bold", color: "#fff"}} className="navbar-brand   "
 >
          Go Inventory App

          </div>
          {/* <a
            className="navbar-brand  text-white  "
            href="#"
            rel="tooltip"
            title="Designed and Coded by Creative Tim"
            data-placement="bottom"

            
            
          >
            Go Inventory App
          </a> */}
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
         modules={[Autoplay, Pagination, Navigation]} >
  {bgImage.map((imageUrl, index) => (
    <SwiperSlide key={index}>
      <header style={{

      }} className="bg-gradient-dark">
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
                <p className="lead mb-4 text-white opacity-8">
                  We’re constantly trying to express ourselves and actualize our dreams.{" "}
                </p>

                <section className="py-7 animate__animated animate__fadeInUp">
                <div style={{}} className="d-flex justify-content-center">



<Link to = "/" style={{width: "30px", height: "30px", fill: "#3f3e43", marginLeft: "20px"}}>
      <FacebookIcon/>
</Link>


<Link to = "/" style={{width: "30px", height: "30px", fill: "#3f3e43", marginLeft: "20px"}}>
  <Twitter/>
</Link>


<Link to = "/" style={{width: "30px", height: "30px", fill: "#3f3e43", marginLeft: "20px"}}>
  <Linkiding/>
</Link>



<Link to = "/" style={{width: "30px", height: "30px", fill: "#3f3e43", marginLeft: "20px"}}>
  <Instagram/>
</Link>


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
                      <a href="#">Clear figures  and graphs</a>
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
                      <a href="#">Accurate statistics</a>
                    </h5>
                    <p className="mb-0">
                      With accurate statistics, you can make the best decisions and and improve your
                      business
                    </p>
                  </div>
                </div>
              </div>

    
            </div>
          </div>
        </section>


        {/* testing */}

        


      {/* testing close */}





        {/* Testimoney */}

        {/* Testtimoney end */}
        <section
      style={{  background: "#e7e9eb", borderRadius: 20 }}
      className=" card-header "
    >
      <div className="container">
        <div className="row">
          <div className="col-md-8 text-start mb-5 mt-5">
            <h3 className="text-black z-index-1 position-relative">
              Payment methods 
            </h3>
          
          </div>
        </div>

        <div className="row mt-4">
          {/* first card */}
          <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.6s">
            {/* Card content */}
            <div className="position-relative shadow rounded border-top border-5 border-info bg-white"   >
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
                <p className="text-info mb-1">
                  Latest Offer 
                </p>
                <h1 className="mb-3">
                  <small
                    className="align-top"
                    style={{ fontSize: "22px", lineHeight: "45px" }}
                  >
                    
                  </small>
                  Free
                  <small
                    className="align-bottom"
                    style={{ fontSize: "16px", lineHeight: "40px" }}
                  >
                  </small>
                </h1>
                <a className="btn btn-info px-4 py-2" href="">
                  Subscribe
                </a>
              </div>
              {/* Card footer */}
              <div className="p-4">
                <p className="border-bottom pb-3">
                  <i className="fa fa-check  me-3"></i>  1 user
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check  me-3"></i>3 Product Categories
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check  me-3"></i>
                </p>
                <p className="border-bottom pb-3">
                  <i className="fa fa-check  me-3"></i>
                </p>

                <p className="border-bottom pb-3">
                  <i className="fa fa-check  me-3"></i>
                </p>
                <p className="mb-0">
                  <i className="fa fa-check  me-3"></i>
                </p>
                
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
                <p className="text-info mb-1">
                  Latest Offer 
                </p>
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
                <p className="mb-0">
                  <i className="fa fa-check  me-3"></i>
                </p>
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
                <p className="text-info mb-1">
                  Latest Offer 
                </p>
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
                    <a className="nav-link pe-1" href="https://www.facebook.com/CreativeTim">
                      <i className="fab fa-facebook text-lg opacity-8"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link pe-1" href="#">
                      <i className="fab fa-twitter text-lg opacity-8"></i>
                    </a>
                  </li>
                 
                </ul>
              </div>
            </div>

        
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








  