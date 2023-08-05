import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

const Dropdown = ({ data = [], value = { id: null }, onSelect = () => {} }) => {
  const [showOption, setShowOption] = useState(false);


  const onSelectedItem = (val) => {
    setShowOption(false);
    onSelect(val);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropDown}
        activeOpacity={0.9}
        onPress={() => setShowOption(!showOption)}
      >
        <Text>{!!value ? value?.name : `All`}</Text>
        <Feather
          name="chevron-down"
          size={24}
          color="black"
          style={{ transform: [{ rotate: showOption ? "180deg" : "0deg" }] }}
        />
      </TouchableOpacity>
      {showOption && (
        <View
          style={{
            backgroundColor: "white",
            padding: 2,
            borderRadius: 1,
            borderColor: "black",
            borderWidth: 1,
            marginTop: -1,
          }}
        >
          {data.map((val, i) => {
            return (
              <TouchableOpacity
                Key={String(i)}
                onPress={() => {
                  onSelectedItem(val);
                }}
                style={{
                  ...styles.selectedItemStyle,
                  backgroundColor:
                    value && value.id === val.id ? "pink" : "white",
                }}
              >
                <Text>{val.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    top: -55,
  },

  dropDown: {
    borderColor: "black",
    borderWidth: 1,
    padding: 8,
    borderRadius: 2,
    minHeight: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },

  selectedItemStyle: {
    paddingVertical: 8,
    borderRadius: 4,
    paddingHorizontal: 6,
    marginBottom: 0,
  },
});

export default Dropdown;
