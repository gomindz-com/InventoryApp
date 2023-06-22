// Argon Dashboard 2 MUI layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import Suppliers from "layouts/suppliers";
import Products from "layouts/products";
import Categories from "layouts/categories";
import Invoices from "layouts/invoices";
import Home from "layouts/home";
import ContactUs from "layouts/contact";
import Receipts from "layouts/receipts";
import Damages from "layouts/damages";

const routes = [

  {
    type: "route",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Home />,
  },
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
    component: <Dashboard />,
  },

  {
    type: "route",
    name: "Invoices",
    key: "invoices",
    route: "/invoices",
    icon: (
      <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-credit-card" />
    ),
    component: <Invoices />,
  },


  {
    type: "route",
    name: "Receipts",
    key: "receipts",
    route: "/receipts",
    icon: (
      <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-delivery-fast" />
    ),
    component: <Receipts />,
  },
  
  
  {
    type: "route",
    name: "Products",
    key: "products",
    route: "/products",
    icon: (
      <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-bag-17" />
    ),
    component: <Products />,
  },
  {
    type: "route",
    name: "Categories",
    key: "categories",
    route: "/categories",
    icon: (
      <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-align-center" />
    ),
    component: <Categories />,
  },
  {
    type: "route",
    name: "Damages",
    key: "damages",
    route: "/damages",
    icon: (
      <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-basket" />
    ),
    component: <Damages />,
  },
  {
    type: "route",
    name: "Suppliers",
    key: "suppliers",
    route: "/suppliers",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-bus-front-12" />
    ),
    component: <Suppliers />,
  },
 

  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
    component: <Profile />,
  },
  {
    type: "route",
    name: "Contact Us",
    key: "contact",
    route: "/contact-us",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-collection" />,
    component: <ContactUs />,
  },
  {
    type: "route",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
    ),
    component: <SignIn />,
  },
   {
    type: "route",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-badge " />,
    component: <SignUp />,
  }, 
];

export default routes;
