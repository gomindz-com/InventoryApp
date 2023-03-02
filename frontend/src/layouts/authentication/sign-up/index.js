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
import { RegisterUserSchema } from "../../../formValidation/addForm";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Grid } from "@mui/material";

// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";





function Cover() {


  
  //START LOGGING IN USER
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    contact: "",
    company_name : "",
    first_name : "",
    last_name: "",
    streetAddress: "",
    postcode: "",
    city: "",
    region: "",   
  });

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    //e.preventDefault();

    const isValid = await RegisterUserSchema.isValid(userData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
       } else {
      await registerUser(userData)
        .then(async(res) => {

          if(res.status == 201){
            localStorage.removeItem("user")
            localStorage.removeItem("token");
            toast.success("Successful Sign Up", {
              onClose: () => {
                navigate('/authentication/sign-in');
              },
              autoClose: 1000
            });
            
          }

        else{
          toast.error("User Could Not Be Registered");
          toast.error(JSON.stringify(res.data));
        }

        
        })
        .catch((err) => {
          toast.error("User Could Not Be Registered");
        });
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };




  return (
    <CoverLayout
      title="Welcome!"
      description="Our Inventory Application is The Best Out There. Register With Us To Find Out!"
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <ToastContainer />

      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Register 
          </ArgonTypography>
        </ArgonBox>
        {/* <ArgonBox mb={2}>
          <Socials />
        </ArgonBox> */}
        {/* <ArgonBox px={12}>
          <Separator />
        </ArgonBox> */}





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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
          <ArgonBox mb={2}>
            <ArgonInput
            name="password"
            
            type="password"
            placeholder="Password"
            size="large"
            autocomplete="off" 
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
            autocomplete="off" 
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
            autocomplete="off" 
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
            autocomplete="off" 
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
            autocomplete="off" 
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
            autocomplete="off" 
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
              <ArgonButton onClick={handleSubmit} variant="gradient" color="dark" fullWidth>
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
