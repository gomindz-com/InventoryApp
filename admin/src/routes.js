

// Dashboard layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Dashboard omponents

import Notifications from "layouts/notifications";

const routes = [

  {
    type: "route",
    name: "Home",
    key: "home",
    route: "/",
    component: <SignIn />,
  },
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Suppliers",
    key: "suppliers",
    route: "/tables",
    
    component: <Tables />,
  },
  {
    type: "route",
    name: "Billing",
    key: "billing",
    route: "/billing",
   
    component: <Billing />,
  },
  {
    type: "route",
    name: "Products",
    key: "products",
    route: "/notifications",
    
    component: <Notifications />,
  },
  {
    type: "route",
    name: "Categories",
    key: "categories",
    route: "/profile",
    
    component: <Profile />,
  },
  {
    type: "route",
    name: "Orders",
    key: "orders",
    route: "/authentication/sign-in",
    
    component: <SignIn />,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
 
];

export default routes;
