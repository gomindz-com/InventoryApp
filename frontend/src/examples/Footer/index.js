// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";
import { Link } from "react-router-dom";


function Footer({ company, links }) {
  const { to, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <ArgonBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link to={link.to} >
          <ArgonTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </ArgonTypography>
        </Link>
      </ArgonBox>
    ));

  return (
    <ArgonBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <ArgonBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with
        <ArgonBox fontSize={size.md} color="text" mb={2.5} mt={0} mx={0.25}>
          <Icon style={{marginTop: 30}} color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </ArgonBox>
        by
        <Link to={to} target="_blank">
          <ArgonTypography variant="button" fontWeight="medium">
            &nbsp;Gomindz&nbsp;
          </ArgonTypography>
        </Link>
        for a better Inventory Management.
      </ArgonBox>
      <ArgonBox
        component="ul"
        sx={({ breakpoints }) => ({
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          listStyle: "none",
          mt: 3,
          mb: 0,
          p: 0,

          [breakpoints.up("lg")]: {
            mt: 0,
          },
        })}
      >
        {renderLinks()}
      </ArgonBox>
    </ArgonBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { to: "/home", name: "Gomindz" },
  links: [
    { to: "/", name: "Gomindz" },
    { to: "/", name: "About Us" },
    { to: "/contact-us", name: "Contact Us" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
