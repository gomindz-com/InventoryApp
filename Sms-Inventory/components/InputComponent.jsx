import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/Theme";

const InputComponent = ({
  label,
  icon,
  inputType,
  keyboardType,
  fielsButtonLabel,
  firldButtonFunction,
}) => {
  return (
    <View style={styles.inputContainer}>
      {icon}
      {inputType === "password" ? (
        <TextInput
          style={styles.input}
          placeholder={label}
          keyboardType={keyboardType}
          secureTextEntry
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder={label}
          keyboardType={keyboardType}
        />
      )}
      <TouchableOpacity style={styles.link} onPress={firldButtonFunction}>
        <Text style={styles.linkText}>{fielsButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: COLORS.light,
    borderBottomWidth: 1,
    marginBottom: 25,
    // flex: 1,
    marginHorizontal: 5,
  },
  icon: { marginRight: 5 },
  input: {
    // backgroundColor: '#444',
    flex: 1,
    paddingVertical: 0, //for android
  },
  link: {},
  linkText: { color: COLORS.link, fontWeight: "700" },
});
