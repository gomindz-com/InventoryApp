import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../constants/Theme";
import moment from "moment";

const CustomDatePicker = ({
  date = new Date(Date.now()),
  setDate = () => {},
  label,
  bg = "#fff",
  bw = 2,
  bbw = 2,
  bc = "#ccc",
  mt = 0,
  mb = 10,
  mx = 0,
  my = 0,
  ml = 0,
  mr = 0,
  px = 5,
  br = 10,
  flex = 1,
  elevation = 0,
  color = COLORS.primary,
  height = 40,
  fs = 14,
  iconSize = 24,
  gap = 5,
  leftIcon,
  style,
  ...rest
}) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [dateText, setDateText] = useState(moment(date).format("MM/DD/YYYY"));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    setDateText(moment(currentDate).format("MM/DD/YYYY"));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View
      style={{
        marginBottom: mb,
        marginTop: mt,
        marginLeft: ml,
        marginRight: mr,
        marginHorizontal: mx,
        marginVertical: my,
        flex,
      }}
    >
      {label && (
        <Text style={{ marginBottom: gap, color: color, fontSize: fs }}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => showMode("date")}
        style={[
          styles.buttonInput,
          {
            backgroundColor: bg,
            borderWidth: bw,
            borderBottomWidth: bbw,
            borderColor: bc,
            paddingHorizontal: px,
            borderRadius: br,
            elevation: elevation,
            height: height,
          },
        ]}
      >
        {leftIcon && leftIcon}
        <View style={{ marginRight: 10 }}>
          <Fontisto name="date" size={iconSize} color={color} />
        </View>

        <Text
          style={{
            marginRight: 1,
            color: color,
            flex: 1,
            fontSize: fs,
          }}
        >
          {dateText}
        </Text>

        <View style={{}}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={color} />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonInput: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default CustomDatePicker;
