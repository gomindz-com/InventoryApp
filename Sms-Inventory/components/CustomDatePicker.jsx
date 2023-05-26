import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  DatePickerIOS,
  DatePickerAndroid,
  Platform,
  TouchableOpacity,
} from "react-native";
import { DatePicker } from "react-native-datepicker";

const CustomDatePicker = ({ selectedDate, onDateChange }) => {
  const [internalDate, setInternalDate] = useState(selectedDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    setInternalDate(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setInternalDate(date);
    onDateChange(date);
    if (Platform.OS === "ios") {
      setShowDatePicker(false);
    }
  };

  const openDatePicker = () => {
    if (Platform.OS === "android") {
      DatePickerAndroid.open({
        date: internalDate,
      }).then((result) => {
        if (result.action !== DatePickerAndroid.dismissedAction) {
          const { day, month, year } = result;
          const newDate = new Date(year, month, day);
          setInternalDate(newDate);
          onDateChange(newDate);
        }
      });
    } else {
      setShowDatePicker(true);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={openDatePicker} style={styles.container}>
        <Text style={styles.text}>
          {internalDate ? internalDate.toDateString() : "Select Date"}
        </Text>
      </TouchableOpacity>
      {showDatePicker && Platform.OS === "ios" && (
        <View style={styles.datePickerContainer}>
          <DatePickerIOS
            date={internalDate || new Date()}
            onDateChange={handleDateChange}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 45,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  datePickerContainer: {
    marginTop: 10,
  },
});

export default CustomDatePicker;
