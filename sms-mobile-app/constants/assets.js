import { Dimensions } from "react-native";
import Constants from "expo-constants";

const { height, width } = Dimensions.get("window");
export const sizes = { width, height, statusbar: Constants.statusBarHeight };

export const colors = {
  primary: "green",
  secondary: "#F2F2F2",
  danger: "#ff5252",
  yellow: "#A3A300",
  green: "#00A300",
  red: "#D10000",
  text: "#333",
  black: "#000000",
  white: "#FFF",
  background: "rgb(242, 242, 242)",
  card: "rgb(255, 255, 255)",
  light: "#f8f4f4",
  medium: "#6e6969",
  dark: "#090000",
  grey: "#ccc",
};

export const images = {};

const assets = {
  sizes,
  colors,
  images,
};
export default assets;
