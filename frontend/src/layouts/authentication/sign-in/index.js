import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

import { UserSchema } from "../../../formValidation/addForm";
import { loginUser } from "apiservices/authService";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, Navigate, useLocation, } from "react-router-dom";
import { getUserDetails } from "apiservices/userService";

// Image
const bgImage =
  "https://us.123rf.com/450wm/kostsov/kostsov1906/kostsov190600026/126080344-modern-showcase-with-empty-space-on-pedestal-on-blue-background-3d-rendering-.jpg?ver=6";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => {
    console.log("you click me");
  };

  const [user, setUser] = useState(null);

  //START LOGGING IN USER
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    //e.preventDefault();

    const isValid = await UserSchema.isValid(userData);
    if (!isValid) {
      toast.error("Please enter all the required fields!!");
    } else {
      await loginUser(userData)
        .then(async (res) => {

        
          
          if (res.status == 200) {
            localStorage.setItem("token", res.data.token);

            try {
              await getUserDetails(userData.email)
                .then((res) => {
                  if (res?.status == 200) {
                   
                    localStorage.setItem("user", JSON.stringify(res.data));

                  } else {
                  }
                })
                .catch((err) => console.log("Error in Getting User Detail", err));
                } catch (error) {
              console.log(error);
            }

            
            setUser(JSON.parse(localStorage.getItem("user")))
            toast.success("User Login Successfully");

            
          } else {
            toast.error("User Could Not Be Logged In");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        image: bgImage,
        title: '"Our Inventory App Is The One"',
        description: "The more difficult management looks, the more easy we make it for you.",
      }}
    >
      {user && <Navigate to="/home" replace={true} />}
      <ToastContainer />
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput
            name="email"
            type="email"
            placeholder="Email"
            size="large"
            onChange={handleChange}
          />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput
            name="password"
            type="password"
            placeholder="Password"
            size="large"
            onChange={handleChange}
          />
        </ArgonBox>
        <ArgonBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <ArgonTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton onClick={handleSubmit} color="info" size="large" fullWidth>
            Sign In
          </ArgonButton>
        </ArgonBox>

         <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign up
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>

      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
