import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { useState } from "react";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import { registerUser } from "apiservices/authService";
import { RegisterUserSchema } from "formValidation/addForm";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Contact() {
  //START LOGGING IN USER
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    contact: "",
    firstname: "",
    lastname: "",
    streetAddress: "",
    postcode: "",
    city: "",
    region: "",
    is_customer: true,
  });

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
    <CoverLayout
      title="Contact Us!"
      description="We will Reply as soon as possible!"
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <ToastContainer />

      <Card>
        {/* <ArgonBox mb={2}>
          <Socials />
        </ArgonBox> */}
        {/* <ArgonBox px={12}>
          <Separator />
        </ArgonBox> */}

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
      </Card>
    </CoverLayout>
  );
}

export default Contact;
