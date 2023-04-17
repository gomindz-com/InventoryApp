import { StyleSheet, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { COLORS, IMAGES } from "../constants/Theme";

const Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.brown,
      }}
    >
      <LottieView source={IMAGES.loader} autoPlay={true} loop={true} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
