import { Platform } from "react-native";
import { colors, sizes } from "./assets";

const appStyles = {
  border: {
    borderWidth: 1,
    borderColor: "#ccc",
  },

  text: {
    fontSize: 13,
    // fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontFamily: "poppins",
    color: colors.text,
  },
  logo: {
    height: 80,
    width: 80,
    alignSelf: "center",
    // marginTop: 50,
    // marginBottom: 20,
  },
  alertButton: {
    height: 45,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  alertButtonText: {
    fontSize: 14,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: sizes.height,
    width: sizes.width,
    zIndex: 100,
    backgroundColor: "#fff",
  },
};

export default appStyles;
