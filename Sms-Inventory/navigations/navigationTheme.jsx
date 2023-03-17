import { DefaultTheme } from "@react-navigation/native";
import { COLORS } from "../constants/Theme";
export default {
  ...DefaultTheme,
  COLORS: {
    ...DefaultTheme.colors,
    primary: COLORS.green,
    background: COLORS.white,
  },
};
