import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { CloudUploadOutlined } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ArgonInput from "components/ArgonInput";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import { Card, Icon, Tooltip } from "@mui/material";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonAvatar from "components/ArgonAvatar";
import AppBar from "@mui/material/AppBar";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { getUserDetails, updateSubscriberDetails } from "apiservices/userService";
import { updatePassword } from "apiservices/authService";
import { toast } from "react-toastify";

function Overview() {
  const bgImage =
    "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/profile-layout-header.jpg";

  const baseImageUrl = process.env.REACT_APP_BASE_IMAGE_URL;

  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [editFormActive, setEditFormActive] = useState(false);
  const [editUpdatePasswordActive, setEeditUpdatePasswordActive] = useState(false);

  const [userData, setUserData] = useState({
    first_name: user.first_name,
    last_name: user.last_name ?? "",
    contact: user.contact ?? "",
    city: user.city ?? "",
  });

  const [userPasswordData, setUserPasswordData] = useState({
    old_password: "",
    password: "",
    password_confirm: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
    setOpen(true);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordFormChange = (e) => {
    setUserPasswordData({ ...userPasswordData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubscriberProfile = async () => {
    const uploadData = new FormData();
    uploadData.append("profile", profilePicture);

    try {
      const res = await updateSubscriberDetails(uploadData);
      if (res.status == 200) {
        await getUserDetails().then((res) => {
          if (res.status == 200) {
            toast.success("Update Successful");
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(JSON.parse(localStorage.getItem("user")));
          } else {
            toast.error("Upload Error");
          }
        });
      }
    } catch (error) {
      toast.error("Could Not Be Updated");
    }
  };

  const handleUpdateSubscriber = async () => {
    const uploadData = new FormData();
    uploadData.append("first_name", userData.first_name);
    uploadData.append("last_name", userData.last_name);
    uploadData.append("contact", userData.contact);
    uploadData.append("city", userData.city);

    try {
      const res = await updateSubscriberDetails(uploadData);
      if (res.status == 200) {
        await getUserDetails().then((res) => {
          if (res.status == 200) {
            toast.success("Update Successful");
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setUser(JSON.parse(localStorage.getItem("user")));
          } else {
            toast.error("Upload Error");
          }
        });
      }
    } catch (error) {
      toast.error("Could Not Be Updated");
    }
  };

  const handleUpdatePassword = async () => {
    const uploadData = new FormData();
    uploadData.append("old_password", userPasswordData.old_password);
    uploadData.append("password", userPasswordData.password);
    uploadData.append("password_confirm", userPasswordData.password_confirm);

    try {
      const res = await updatePassword(uploadData);
      if (res.status == 200) {
        localStorage.removeItem("admin");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("userToken");
        localStorage.removeItem("adminToken");
        toast.success("Update Successful: Log out and Relogin");
      } else {
        toast.error("Password Update Unsuccessful");
      }
    } catch (error) {
      toast.error("Could Not Be Updated, Contact System Administrator");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Company Profile</DialogTitle>
        <DialogContent>
          {profilePicture && (
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateSubscriberProfile} color="primary">
            Upload
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
                  src={`${baseImageUrl}${user?.profile}`}
                  alt="profile-image"
                  variant="rounded"
                  size="xl"
                  shadow="sm"
                />
              </Grid>

              <Grid item xs={8} md={5} lg={4} sx={{ ml: "auto" }}>
                <AppBar position="static">
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="profile-picture-upload"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="profile-picture-upload">
                    <ArgonButton
                      variant="contained"
                      color="primary"
                      component="span"
                      startIcon={<CloudUploadOutlined />}
                    >
                      Update Profile Picture
                    </ArgonButton>
                  </label>
                </AppBar>
              </Grid>
            </Grid>
          </Card>
        </ArgonBox>

        <ArgonBox mt={5} mb={3}>
          {!editFormActive ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} xl={12}>
                <ProfileInfoCard
                  title="profile information"
                  onclick={() => setEditFormActive(!editFormActive)}
                  description=""
                  info={{
                    fullName: user.first_name + " " + user.last_name,
                    mobile: user.contact,
                    email: user.email,
                    location: user.city,
                  }}
                  social={[
                    {
                      link: "",
                      icon: <FacebookIcon />,
                      color: "facebook",
                    },
                    {
                      link: "",
                      icon: <TwitterIcon />,
                      color: "twitter",
                    },
                    {
                      link: "",
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
                          name="last_name"
                          type="text"
                          placeholder="Last Name"
                          value={userData?.last_name}
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
                    <ArgonInput
                      name="city"
                      type="textarea"
                      placeholder="Location"
                      value={userData?.city}
                      size="large"
                      autoComplete="off"
                      onChange={handleChange}
                    />
                  </ArgonBox>

                  <ArgonBox mt={4} mb={1}>
                    <ArgonButton
                      color="info"
                      size="large"
                      onClick={handleUpdateSubscriber}
                      variant="gradient"
                      fullWidth
                    >
                      Submit
                    </ArgonButton>
                  </ArgonBox>
                </ArgonBox>
              </ArgonBox>
            </Card>
          )}
        </ArgonBox>

        <ArgonBox mt={5} mb={3}>
          {!editUpdatePasswordActive ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} xl={12}>
                <Card sx={{ height: "100%" }}>
                  <ArgonBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    pt={2}
                    px={2}
                  ></ArgonBox>

                  <ArgonBox pt={2} pb={3} px={3}>
                    <ArgonBox component="form" role="form">
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                          <ArgonBox mb={2}>
                            <ArgonButton
                              onClick={() => {
                                setEeditUpdatePasswordActive(true);
                              }}
                              variant="contained"
                              color="primary"
                              component="span"
                              endIcon={<ChevronRightIcon />}
                            >
                              Update Password
                            </ArgonButton>
                          </ArgonBox>
                        </Grid>
                      </Grid>

                     
                    </ArgonBox>
                  </ArgonBox>
                </Card>
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
                    <Icon onClick={() => setEeditUpdatePasswordActive(!editUpdatePasswordActive)}>
                      {" "}
                      cancel
                    </Icon>
                  </Tooltip>
                </ArgonTypography>
              </ArgonBox>

              
              <ArgonBox pt={2} pb={3} px={3}>
                <ArgonBox component="form" role="form">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <ArgonBox mb={2}>
                        <ArgonInput
                          name="old_password"
                          type="password"
                          placeholder="Old Password"
                          value={userPasswordData?.old_password}
                          size="large"
                          onChange={handlePasswordFormChange}
                        />
                      </ArgonBox>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <ArgonBox mb={2}>
                        <ArgonInput
                          name="password"
                          type="password"
                          placeholder="New Password"
                          value={userPasswordData?.password}
                          size="large"
                          onChange={handlePasswordFormChange}
                        />
                      </ArgonBox>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <ArgonBox mb={2}>
                        <ArgonInput
                          name="password_confirm"
                          type="password"
                          placeholder="Comfirm Password"
                          value={userPasswordData?.password_confirm}
                          size="large"
                          autoComplete="off"
                          onChange={handlePasswordFormChange}
                        />
                      </ArgonBox>
                    </Grid>
                  </Grid>

                  <ArgonBox mt={4} mb={1}>
                    <ArgonButton
                      color="info"
                      size="large"
                      onClick={handleUpdatePassword}
                      variant="gradient"
                      fullWidth
                    >
                      Submit
                    </ArgonButton>
                  </ArgonBox>
                </ArgonBox>
              </ArgonBox>
            
            </Card>
          )}
        </ArgonBox>

        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Overview;
