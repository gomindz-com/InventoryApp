import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const CustomCard = ({
  title,
  bg = "#fff",
  bc = "#ccc",
  children,
  br = 20,
  py = 10,
  px = 20,
  width,
  elevation = 10,
  titleColor,
  titleStyle,
  titleSize = 25,
  height = 100,
  maxHeight = 2000,
  mx = 0,
  my = 0,
  mt,
  mb,
  style,
  isTouchable = false,
  topRadius = false,
  bottomRadius = false,
  ai = "stretch",
  jc = "flex-start",
  onPress = () => {},
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: bg,
          borderColor: bc,
          borderRadius: br,
          paddingVertical: py,
          paddingHorizontal: px,
          marginTop: mt || my,
          marginBottom: mb || my,
          marginHorizontal: mx,
          marginVertical: my,
          minHeight: height,
          width,
          maxHeight,
          elevation,
          borderTopRightRadius: topRadius ? 30 : br,
          borderTopLeftRadius: topRadius ? 30 : br,
          borderBottomRightRadius: bottomRadius ? 30 : br,
          borderBottomLeftRadius: bottomRadius ? 30 : br,
          alignItems: ai,
          justifyContent: jc,

          ...style,
        },
      ]}
      disabled={!isTouchable}
      {...rest}
    >
      {title && (
        <Text
          style={[
            styles.title,
            {
              color: titleColor || colors.black,
              fontSize: titleSize,
              ...titleStyle,
            },
          ]}
        >
          {title}
        </Text>
      )}

      {children}
    </TouchableOpacity>
  );
};

export default CustomCard;

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: "#ccc",
    },
    title: {
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 15,
    },
  });
