import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

const CustomDropdownCore = ({ options, selectedValue, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleValueChange = (value) => {
    onValueChange(value);
    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.dropdown}
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        mode={Platform.OS === "ios" ? "modal" : "dropdown"}
      >
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f5faf8",
    paddingHorizontal: 10,
    ...(Platform.OS === "android" && { elevation: 1 }), // Add elevation for Android
  },
  dropdown: {
    height: 40,
    ...(Platform.OS === "android" && { color: "#000" }), // Set text color for Android
  },
});

export default CustomDropdownCore;
