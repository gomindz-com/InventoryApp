

// Dashboard layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/customers";
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
    route: "/customers",
    
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
    name: "Notifications",
    key: "notifications",
    route: "/notifications",
    
    component: <Notifications />,
  },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    route: "/profile",
    
    component: <Profile />,
  },
  {
    type: "route",
    name: "Sign Out",
    key: "sign-out",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
 
];

export default routes;
