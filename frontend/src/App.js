import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

import { Link, useNavigate } from "react-router-dom";

// Argon Dashboard 2 MUI example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Argon Dashboard 2 MUI themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Argon Dashboard 2 MUI routes
import routes from "routes";

// Argon Dashboard 2 MUI contexts
import { useArgonController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/finalLogo.png";
import brandDark from "assets/images/finalLogo.png";

// Icon Fonts
import "assets/css/nucleo-icons.css";
import "assets/css/nucleo-svg.css";
import { useSelector } from "react-redux";
import { getUserDetails } from "apiservices/userService";

import Spinner from "components/Spinner";

export default function App() {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, darkSidenav, darkMode } =
    controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const userProfileInfo = useSelector((state) => state.user.value);

  const handleCheckUserAuthenticated = async () => {
    await getUserDetails().then((res) => {
      if (res.status == 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setLoading(false);
      } else {
        navigate("/authentication/sign-in");
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    handleCheckUserAuthenticated();
  }, []);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname, userProfileInfo]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route?.collapse) {
        return getRoutes(route?.collapse);
      }

      if (route?.route) {
        return <Route exact path={route?.route} element={route?.component} key={route?.key} />;
      }

      return null;
    });

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />

      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={darkSidenav || darkMode ? brand : brandDark}
            brandName="Mega Store"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
        </>
      )}

      <Routes>
        {getRoutes(routes)}
        {token ? (
          <Route path="/" element={<Navigate to="/dashboard" />} />
        ) : (
          <Route path="/" element={<Navigate to="/authenticate/sign-in" />} />
        )}

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ThemeProvider>
  );
}