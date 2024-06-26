import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

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
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "Redux/slices/User";
import Spinner from "components/Spinner";

function Illustration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const userProfileInfo = useSelector((state) => state.user.value);

  const handleSetRememberMe = () => {
    setRememberMe(!rememberMe);
    setUserData((currentState) => ({
      ...currentState,
      isChecked: !rememberMe,
    }));
  };
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    isChecked: false,
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleValidateSubmit = async (e) => {
    UserSchema.validate(userData, { abortEarly: false })
      .then(async () => {
        handleSubmit();
      })
      .catch((err) => {
        toast.error(err.errors[0]);
      });
  };

  const handleSubmit = async () => {

    setLoading(true)
    const { email, password, isChecked } = userData;
    if (isChecked && email !== "") {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("checkbox", isChecked);
    }

    await loginUser(userData)
      .then(async (res) => {
        if (res.status == 200) {
          localStorage.setItem("token", res.data?.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setUser(res.data.user);
          dispatch(login(res.data.user));
          toast.success("Login Successful", { draggable: false });
          setLoading(false)
          navigate("/dashboard");
        } else if (res.status == 0) {
          toast.error("Contact Sytem Administration: Server Error", { draggable: false });
          setLoading(false)

        } else {
          toast.error("Incorrect Credentials");
          setLoading(false)

        }
      })
      .catch((err) => {
        console.log("Response is : ", err);
        setLoading(false)

      });
  };

  useEffect(() => {
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");

    if (localStorage.isChecked && localStorage.email !== "") {
      setUserData({
        isChecked: true,
        email: localStorage.username,
        password: localStorage.password,
      });
    }
  }, []);

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in to Megastore"
      illustration={{
        image:
          "https://us.123rf.com/450wm/kostsov/kostsov1906/kostsov190600026/126080344-modern-showcase-with-empty-space-on-pedestal-on-blue-background-3d-rendering-.jpg?ver=6",
        title: "Our Inventory App Is The One",
        description: "The more difficult management looks, the more easy we make it for you.",
      }}
    >
      

        
        <ArgonBox component="form" role="form">
          <ArgonBox mb={2}>
            <ArgonInput
              name="email"
              type="email"
              placeholder="Email"
              value={userData.email}
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
              value={userData.password}
              onChange={handleChange}
            />
          </ArgonBox>
          <ArgonBox display="flex" alignItems="center">
            <Switch checked={userData.isChecked} onChange={handleSetRememberMe} />
            <ArgonTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;Remember me
            </ArgonTypography>
          </ArgonBox>

          {loading ?
            <Spinner height={"30px"} width={"30px"}></Spinner> :

<ArgonBox mt={4} mb={1}>
            <ArgonButton onClick={() => handleValidateSubmit()} color="info" size="large" fullWidth>
              Sign In
            </ArgonButton>
          </ArgonBox>

          }
          

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
