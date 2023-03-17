import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SIZES } from "../constants/Theme";
import { useTheme } from "@react-navigation/native";

const CustomButton = ({
  title,
  style,
  textStyle,
  titleSize = 14,
  width = "95%",
  bg,
  bw = 2,
  bc,
  color,
  radius,
  br = 20,
  mb,
  mt,
  mx = 0,
  my = 0,
  height = 60,
  p = 10,

  onPress = () => {},
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: bg || colors.primary,
          shadowColor: colors.primary,
          width,
          borderRadius: radius || br,
          marginBottom: mb || my,
          marginTop: mt || my,
          marginHorizontal: mx,
          marginVertical: my,
          borderWidth: bw,
          borderColor: bc || colors.primary,
          maxHeight: height,
          padding: p,
          ...style,
        },
      ]}
      onPress={onPress}
      {...props}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color: color || colors.white,
            fontSize: titleSize,
            ...textStyle,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    // width: SIZES.width - 30,
    // width: "95%",
    alignSelf: "center",
    elevation: 8,
  },
  buttonText: {
    textAlign: "center",
  },
});
