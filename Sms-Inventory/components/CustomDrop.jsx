import React, { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DropdownSelect = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (itemValue) => {
    setSelectedValue(itemValue);
  };

  return (
    <View>
      <Picker selectedValue={selectedValue} onValueChange={handleValueChange}>
        <Picker.Item label="Product In" value="product-in" />
        <Picker.Item label="Product Out" value="product-out" />
      </Picker>
    </View>
  );
};

export default DropdownSelect;
