import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { IMAGES, SIZES } from "../constants/Theme";

const LogoHeading = () => {
  return (
    <View>
      <Image source={IMAGES.header} style={styles.image} />
    </View>
  );
};

export default LogoHeading;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: SIZES.width,
  },
});
