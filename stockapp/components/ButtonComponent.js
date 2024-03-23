import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/Theme";

const ButtonComponent = ({ title, onPress = () => {} }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.brown,
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: COLORS.yellow,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
