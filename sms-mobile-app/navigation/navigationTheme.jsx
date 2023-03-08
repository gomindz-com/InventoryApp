import { DefaultTheme } from "@react-navigation/native";
import { colors } from "../constants/assets";
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white,
  },
};
