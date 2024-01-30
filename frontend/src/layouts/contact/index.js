import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { Navigate, useNavigate } from "react-router-dom";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Card, Icon, Tooltip } from "@mui/material";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonTypography from "components/ArgonTypography";

import './Contact.css'


function ContactUs() {
  const bgImage =
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [userData, setUserData] = useState({
    first_name: user.first_name,
    last_name: user.last_name ?? "",
    contact: user.contact ?? "",
    city: user.city ?? "",
  });
  const baseImageUrl = process.env.REACT_APP_BASE_IMAGE_URL;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
      {user == null && <Navigate to="/authentication/sign-in" replace={true} />}

      <ArgonBox position="relative">
        <DashboardNavbar absolute light />
        <ArgonBox height="220px" />
        <Card
          sx={{
            py: 2,
            px: 2,
            boxShadow: ({ boxShadows: { md } }) => md,
          }}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <ArgonAvatar
                src={`${baseImageUrl}${user?.profile}`}
                alt="profile-image"
                variant="rounded"
                size="xl"
                shadow="sm"
              />
            </Grid>

            <Grid item xs={8} md={1} lg={4} sx={{ ml: "auto" }}></Grid>
          </Grid>
        </Card>
      </ArgonBox>

      <ArgonBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} xl={12}>
            <Card sx={{ height: "100%" }}>
              <ArgonBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              ></ArgonBox>

              <ArgonBox pt={2} pb={3} px={3}>
                <ArgonBox component="form" role="form">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <ArgonBox mb={2}>
                        <ArgonInput
                          name="first_name"
                          type="text"
                          placeholder="Frist Name"
                          value={userData?.first_name}
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
                          value={userData?.contact}
                          size="large"
                          autoComplete="off"
                          onChange={handleChange}
                        />
                      </ArgonBox>
                    </Grid>
                  </Grid>

                  <ArgonBox mb={2}>
                    <div class="form-group">
                      <textarea
                        class="custom-textarea"
                        rows="5"
                        placeholder=" Enter Message here..."
                      ></textarea>
                    </div>
                  </ArgonBox>

                  <ArgonBox mt={4} mb={1}>
                    <ArgonButton onClick={() => {}} variant="contained" color="info">
                      Send
                    </ArgonButton>
                  </ArgonBox>
                </ArgonBox>
              </ArgonBox>
            </Card>
          </Grid>
        </Grid>
      </ArgonBox>

      <Footer />
    </DashboardLayout>
  );
}

export default ContactUs;
