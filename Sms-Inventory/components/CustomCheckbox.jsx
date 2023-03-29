import { View, Text, StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


const CustomCheckbox = () => {
    const [checked, setChecked] = useState(false);
  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => setChecked(!checked)}>
      {checked && <Ionicons name="checkmark" size={20} color="white" />}
    </Pressable>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
checkboxBase: {
    width: 30,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 1.3,
    borderColor: '#000000',
    backgroundColor: "#ffffff",
    marginRight: 5,
  },
  checkboxChecked: {
    backgroundColor: "#0096FF",
  }
});
