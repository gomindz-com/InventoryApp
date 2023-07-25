import { Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

export const SIZES = {
  width,
  height,
  statusbar: StatusBar.currentHeight,
};

export const STYLES = {
  h1: { fontWeight: "bold", fontSize: 35 },
  h2: { fontWeight: "bold", fontSize: 32 },
  h3: { fontWeight: "bold", fontSize: 29 },
  h4: { fontWeight: "bold", fontSize: 26 },
  h5: { fontWeight: "bold", AfontSize: 23 },
  h6: { fontWeight: "bold", fontSize: 20 },
  body1: { fontSize: 17 },
  body2: { fontSize: 14 },
  small: { fontSize: 10 },
  light: { opacity: 0.7 },
  radius1: { borderRadius: 10 },
  radius2: { borderRadius: 20 },
  radius3: { borderRadius: 30 },
};

export const COLORS = {
  yellow: "#FFD43A",
  brown: "#5E043F",
  light: "#888",
  dark: "#333",
  link: "#AD40AF",
  green: "#337037",
  
};

export const IMAGES = {
  loader: require("../assets/loader.json"),
};

export const ICONS = {};

const AppTheme = { SIZES, STYLES, COLORS, IMAGES, ICONS };

export default AppTheme;
