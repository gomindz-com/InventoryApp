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
import { registerUser } from "apiservices/authService";
import { RegisterUserSchema } from "../../../formValidation/addForm";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

function Cover() {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    contact: "",
    company_name: "",
    first_name: "",
    last_name: "",
    streetAddress: "",
    postcode: "",
    city: "",
    region: "",
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  
  const handleValidateSubmit = async (e) => {
    RegisterUserSchema.validate(userData, { abortEarly: false })
      .then(async () => {
        handleSubmit();
      })
      .catch((err) => {
        toast.error(err.errors[0]);
      });
  };

  const handleSubmit = async (e) => {
    await registerUser(userData)
      .then(async (res) => {
        if (res.status == 201) {
          localStorage.clear();
          toast.success("Successful Sign Up", {
            onClose: () => {
              navigate("/authentication/sign-in");
            },
            autoClose: 1000,
          });
        } else {
          const entries = Object.entries(res.data);
          const [firstKey, firstValue] = entries[0];
          toast.error(`${firstKey} : ${firstValue[0]} `);
        }
      })
      .catch((err) => {
        toast.error("User Could Not Be Registered");
      });
  };


  return (
    <CoverLayout
      title="Welcome!"
      description="Our Inventory Application is The Best Out There. Register With Us To Find Out!"
      image="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg"
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >

      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Register
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    name="company_name"
                    type="text"
                    placeholder="Company Name"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    name="username"
                    type="text"
                    placeholder="UserName"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    size="large"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
              <Grid item xs={12} md={6}>
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
                    name="email"
                    type="email"
                    placeholder="Email"
                    size="large"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    size="large"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    name="password2"
                    type="password"
                    placeholder="Confirm Password"
                    size="large"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    name="contact"
                    type="text"
                    placeholder="Contact Number"
                    size="large"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    name="streetAddress"
                    type="text"
                    placeholder="Street Address"
                    size="large"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    name="postcode"
                    type="text"
                    placeholder="Postcode"
                    size="large"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <ArgonBox mb={2}>
                  <ArgonInput
                    name="city"
                    type="text"
                    placeholder="City"
                    size="large"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                </ArgonBox>
              </Grid>
            </Grid>
            <ArgonBox mb={2}>
              <ArgonInput
                name="region"
                type="text"
                placeholder="Region"
                size="large"
                autoComplete="off"
                onChange={handleChange}
              />
            </ArgonBox>

            <ArgonBox display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </ArgonTypography>
              <ArgonTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Terms and Conditions
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton
                onClick={() => handleValidateSubmit()}
                variant="gradient"
                color="dark"
                fullWidth
              >
                sign up
              </ArgonButton>
            </ArgonBox>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
