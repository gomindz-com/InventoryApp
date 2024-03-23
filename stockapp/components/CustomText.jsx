import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text } from "react-native";

const CustomText = ({
  children,
  color = "#333",
  fontSize = 14,
  fw = "500",
  light = false,
  ta = "left",
  my = 0,
  mx = 0,
  style,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = makeStyles({ colors, fontSize, color, light, fw, mx, my, ta });
  return (
    <Text style={[styles.text, { ...style }]} {...rest}>
      {children}
    </Text>
  );
};

const makeStyles = ({ colors, fontSize, color, light, fw, mx, my, ta }) =>
  StyleSheet.create({
    text: {
      fontSize,
      color: light ? "#999" : color,
      fontWeight: fw,
      marginHorizontal: mx,
      marginVertical: my,
      textAlign: ta,
    },
  });

export default CustomText;
