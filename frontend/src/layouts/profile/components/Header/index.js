import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";

// Argon Dashboard 2 MUI example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Argon Dashboard 2 MUI base styles
import breakpoints from "assets/theme/base/breakpoints";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

import { getUserDetails } from "apiservices/userService";
import "./index.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [profile, setProfile] = useState();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  let token = localStorage.getItem("token");

  const updateCustomer = () => {
    const uploadData = new FormData();
    uploadData.append("profile", profile, profile.name);

    fetch(`http://localhost:8000/api/customer/update`, {
      method: "PATCH",
      headers: new Headers({
        Authorization: token ? `Token ${token}` : "",
      }),
      body: uploadData,
    })
      .then(async (res) => {
        if (res.status == 200) {
          toast.success("Company Logo Successfully Updated");
          try {
            const res = await getUserDetails();
            if (res?.status == 200) {
              localStorage.setItem("user", JSON.stringify(res.data.user));
              setUser(JSON.parse(localStorage.getItem("user")));
            } else {
              toast.error("Upload Error");
            }
          } catch {
            toast.error("Upload Error");

          }
        }
        else {
          toast.error("Upload Error");
        }
      })
      .catch((error) => {
        toast.error("Upload Error");
      });
  };
  const navigate = useNavigate();
  
  return (
    <> 
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
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            
              <ArgonAvatar
                src={`http://localhost:8000${user?.profile}`}
                alt="profile-image"
                variant="rounded"
                size="xl"
                shadow="sm"
              />
           
          </Grid>
          <Grid item>
            <ArgonBox height="100%" mt={0.5} lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                
              </ArgonTypography>
              <ArgonTypography variant="button" color="text" fontWeight="medium">
                {user?.company_name}
              </ArgonTypography>
            </ArgonBox>
          </Grid>
          <Grid item xs={8} md={5} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              {/* <ArgonBox mb={2} mx={5}>
                <ArgonInput
                  type="file"
                  name="image"
                  accept="image/*"
                  placeholder="Image"
                  size="large"
                  onChange={(e) => setProfile(e.target.files[0])}
                />
              </ArgonBox> */}

              {/* <ArgonBox mb={2} mx={5}>
                <ArgonButton onClick={() => updateCustomer()} color="info" size="large" fullWidth>
                  Update Company Profile
                </ArgonButton>
              </ArgonBox> */}
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </ArgonBox>
    </>
  );
}

export default Header;
