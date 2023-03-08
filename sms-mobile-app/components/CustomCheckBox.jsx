import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomCheckBox = ({
  label,
  isChecked = false,
  setIsChecked = () => {},
  mx = 0,
}) => {
  const iconName = isChecked ? "checkbox-marked" : "checkbox-blank-outline";

  return (
    <View style={[styles.container, { marginHorizontal: mx }]}>
      <Pressable onPress={() => setIsChecked(false)}>
        <MaterialCommunityIcons name={iconName} size={18} color="#000" />
      </Pressable>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    // width: 80,
  },
  label: {
    fontSize: 12,
    // color: "#fff",
    marginLeft: 5,
  },
});
