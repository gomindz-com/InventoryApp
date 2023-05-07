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
import Header from "layouts/contact/components/Header";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { useNavigate } from "react-router-dom";

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

function ContactUs() {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));




  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //e.preventDefault();

    const isValid = await RegisterUserSchema.isValid(userData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      await registerUser(userData)
        .then((res) => {
          if (res.data) {
            if (res.data.message == "success") {
              toast.success("User Registered Successfully");
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/authentication/sign-in");
            } else {
              toast.error("User Could Not Be Registered");
            }
          } else {
            toast.error("User Could Not Be Registered");
          }
        })
        .catch((err) => {});
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

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
      <Header />
     
      <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form">
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    name="firstname"
                    type="text"
                    placeholder="Full Name"
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
                    name="email"
                    type="email"
                    placeholder="Email"
                    size="large"
                    autocomplete="off"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
            </Grid>

            <ArgonBox mb={2}>
              <ArgonInput
                name="region"
                type="textarea"
                placeholder="How can we help you?"
                size="large"
                autocomplete="off"
                onChange={handleChange}
              />
            </ArgonBox>

            <ArgonBox mt={4} mb={1}>
              <ArgonButton onClick={handleSubmit} variant="gradient" color="dark" fullWidth>
                Send Message
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default ContactUs;
