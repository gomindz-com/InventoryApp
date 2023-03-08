import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text } from "react-native";

const CustomText = ({
  children,
  color = "#000",
  fontSize = 20,
  fw = "normal",
  light = false,
  ta = "left",
  my = 0,
  mx = 0,
  mt = 0,
  mb,

  style,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = makeStyles({
    colors,
    fontSize,
    color,
    light,
    fw,
    mx,
    my,
    ta,
    mb,
    mt,
  });
  return (
    <Text style={[styles.text, { ...style }]} {...rest}>
      {children}
    </Text>
  );
};

const makeStyles = ({ colors, fontSize, color, light, fw, mx, my, ta, mb }) =>
  StyleSheet.create({
    text: {
      fontSize,
      color: light ? "#999" : color,
      fontWeight: fw,
      marginHorizontal: mx,
      marginVertical: my,
      textAlign: ta,
      marginBottom: mb || my,
    },
  });

export default CustomText;
