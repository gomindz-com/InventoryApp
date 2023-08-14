// @mui material components
import Link from "@mui/material/Link";

// Argon Dashboard 2 MUI components
import ArgonButton from "components/ArgonButton";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI context
import { useArgonController } from "context";

// Images
import icon from "assets/images/illustrations/icon-documentation.svg";

function SidenavFooter() {
  const [controller] = useArgonController();
  const { miniSidenav, darkSidenav } = controller;

  return (
    <ArgonBox opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <ArgonBox position="relative" textAlign="center">
        <ArgonBox component="img" src={icon} alt="sidebar_illustration" width="60%" />
        <ArgonBox
          width="100%"
          pb={2}
          px={2}
          color={darkSidenav ? "white" : "dark"}
          textAlign="center"
          lineHeight={0}
        >
          <ArgonTypography color="inherit" variant="h6">
            Need help?
          </ArgonTypography>
          <ArgonTypography color="inherit" variant="caption">
            Please call us on <a href="tel:+220 325 8685">325 8685</a> 
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
      <ArgonBox display="flex" flexDirection="column">
        
      </ArgonBox>
    </ArgonBox>
  );
}

export default SidenavFooter;
