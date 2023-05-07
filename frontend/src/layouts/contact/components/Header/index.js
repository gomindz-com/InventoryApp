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

import { ToastContainer, toast } from "react-toastify";


import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";

// Argon Dashboard 2 MUI example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Argon Dashboard 2 MUI base styles
import breakpoints from "assets/theme/base/breakpoints";

import './index.css';
// Images
import burceMars from "assets/images/bruce-mars.jpg";
import { getUserDetails } from "apiservices/userService";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);


  const [profile, setProfile] = useState()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  
  
  let token = localStorage.getItem("token");


  const updateCustomer = () => {

    const uploadData = new FormData();
    uploadData.append('profile', profile, profile.name)

    fetch(`http://localhost:8000/api/user/userdetails/${user.email}/`, {
      method: 'PATCH',
      headers: new Headers({
        'Authorization': token ? `Token ${token}` : "",
      }), 
      body: uploadData,
    })
    .then(async res => {
      if(res.status == 200 ){
        toast.success("Company Logo Successfully Updated");
        try {
          await getUserDetails(user.email)
            .then((res) => {
              if (res?.status == 200) {
                
                localStorage.setItem("user", JSON.stringify(res.data));
                setUser(JSON.parse(localStorage.getItem("user")))
              } else {
              }
            })
            .catch((err) => {});
            } catch (error) {
        }
      }
      else{
        toast.error("Upload Error");
      }
    })
    .catch(error => {})

  }




  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);


  const divStyle = {
    margin: '40px',
    border: '5px solid pink'
  };
  const pStyle = {
    fontSize: '15px',
    textAlign: 'center'
  };



  return (
    <ArgonBox position="relative">

      <ToastContainer />

      <DashboardNavbar absolute light />
      <ArgonBox height="220px" />
      <Card
        sx={{
          py: 2,
          px: 2,
          boxShadow: ({ boxShadows: { md } }) => md,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <div className="img-wrapper">
              <ArgonAvatar
                src={`${user.profile}`}
                alt="profile-image"
                variant="rounded"
                size="xl"
                shadow="sm"
                className="hover-zoom"
              />
              </div>
          </Grid>
          <Grid item>
            <ArgonBox height="100%" mt={0.5} lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                {user.name}
              </ArgonTypography>
              
            </ArgonBox>
          </Grid>
          <Grid item xs={8} md={5} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
             
              
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </ArgonBox>
  );
}

export default Header;
