import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const CustomInput = ({
  label,
  placeholder,
  keyboardType = "default",
  password = false,
  showPassword = false,
  bw = 1,
  bbw = 1,
  bc = "#ccc",
  br = 10,
  color = "#000",
  height = 45,
  setShowPassword = () => {},
  onChangeText = () => {},
  rightIcon,
  leftIcon,
  bg = "transparent",
  mb,
  mt,
  my = 0,
  mx = 0,
  ml,
  mr,
  flex = 0,
  px = 5,
  py = 0,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View
      style={[
        styles.container,
        {
          marginTop: mt || my,
          marginBottom: mb || my,
          marginHorizontal: mx,
          marginVertical: my,
          marginLeft: ml || mx,
          marginRight: mr || mx,
          flex,
        },
      ]}
    >
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: bg,
            borderWidth: bw,
            borderBottomWidth: bbw,
            borderColor: bc,
            borderRadius: br,
            minHeight: height,
            paddingHorizontal: px,
            paddingVertical: py,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, { color: color }]}
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={showPassword}
          {...rest}
        />
        {password && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Ionicons name="eye-off-outline" size={24} color="black" />
            ) : (
              <Ionicons name="eye-outline" size={24} color="black" />
            )}
          </TouchableOpacity>
        )}
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {},
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
    },
    input: {
      flex: 1,
      height: "100%",
      fontSize: 14,
    },
    label: {
      marginVertical: 3,
      fontSize: 15,
      color: "#777",
    },
    iconContainer: {},
    leftIcon: {
      marginRight: 10,
    },
    rightIcon: {
      marginLeft: 10,
      // backgroundColor:"red"
    },
  });

export default CustomInput;
