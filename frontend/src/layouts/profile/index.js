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

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// Overview page components
import Header from "layouts/profile/components/Header";
import ArgonInput from "components/ArgonInput";
import { Card, Divider, Icon, Tooltip } from "@mui/material";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import { ToastContainer, toast } from "react-toastify";
import { getUserDetails } from "apiservices/userService";


const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function Overview() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [editFormActive, setEditFormActive] = useState(false);


  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    contact: "",
    city: ""
  });


  const handleChange = (e) => {

      setUserData({ ...userData, [e.target.name]: e.target.value });
    
  };


  const updateCustomer = () => {

    const uploadData = new FormData();
    uploadData.append("first_name", userData.first_name);
    uploadData.append("last_name", userData.last_name);
    uploadData.append("contact",  userData.contact);
    uploadData.append("city",  userData.city);
    


    let token = localStorage.getItem("token");


    fetch(`http://localhost:8000/api/user/userdetails/${user.email}/`, {
      method: 'PATCH',
      headers: new Headers({
        'Authorization': token ? `Token ${token}` : "",
      }), 
      body: uploadData,
    })
    .then(async res => {

  


      if(res.status == 200 ){
        

        
     await getUserDetails(user.email).then((res) => {
   
           
              if (res.status == 200) {
                
                
                localStorage.setItem("user", JSON.stringify(res.data));
                setUser(JSON.parse(localStorage.getItem("user")))
              } else {
              }
            })
            
          
      }
      else{
        toast.error("Upload Error");
      }
    })
    .catch(error => {})

  }



  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <ToastContainer />
      <Header />
      <ArgonBox mt={5} mb={3}>
        {!editFormActive ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} xl={12}>
              <ProfileInfoCard
                title="profile information"
                onclick={() => setEditFormActive(!editFormActive)}
                description="Hi, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: user.first_name + " " + user.last_name,
                  mobile: user.contact,
                  email: user.email,
                  location: user.city,
                }}
                social={[
                  {
                    link: "https://www.facebook.com/gomindz/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/gomindz",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/gomindz/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
              />
            </Grid>
          </Grid>
        ) : (
          <Card sx={{ height: "100%" }}>
            <ArgonBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              pt={2}
              px={2}
            >
              <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                Edit
              </ArgonTypography>
              <ArgonTypography variant="body2" color="secondary">

              


                <Tooltip title={"Cancel"} placement="top">
                  <Icon onClick={() => setEditFormActive(!editFormActive)}> cancel</Icon>
                </Tooltip>
              </ArgonTypography>
            </ArgonBox>

            <ArgonBox pt={2} pb={3} px={3}>
              <ArgonBox component="form" role="form">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <ArgonBox mb={2}>
                      <ArgonInput
                        name="first_name"
                        type="text"
                        placeholder="Frist Name"
                        size="large"
                        onChange={handleChange}
                      />
                    </ArgonBox>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <ArgonBox mb={2}>
                      <ArgonInput
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        size="large"
                        onChange={handleChange}
                      />
                    </ArgonBox>
                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={12}>
                    <ArgonBox mb={2}>
                      <ArgonInput
                        name="contact"
                        type="mobile"
                        placeholder="Mobile"
                        size="large"
                        autocomplete="off"
                        onChange={handleChange}
                      />
                    </ArgonBox>
                  </Grid>
                </Grid>

                <ArgonBox mb={2}>
                  <ArgonInput
                    name="city"
                    type="textarea"
                    placeholder="Location"
                    size="large"
                    autocomplete="off"
                    onChange={handleChange}
                  />
                </ArgonBox>

                <ArgonBox mt={4} mb={1}>
                  <ArgonButton  onClick={updateCustomer} variant="gradient" color="dark" fullWidth>
                    Update
                  </ArgonButton>
                </ArgonBox>
              </ArgonBox>
            </ArgonBox>
          </Card>
        )}
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
