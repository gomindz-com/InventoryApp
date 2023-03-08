import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomInput from "./CustomInput";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const Search = ({
  br = 10,
  bc = "#ccc",
  bw = 2,
  mx = 0,
  bg = "transparent",
  ...rest
}) => {
  return (
    <CustomInput
      height={35}
      placeholder="Search"
      mb={10}
      leftIcon={<Ionicons name="ios-search-outline" size={15} color="#333" />}
      px={10}
      br={br}
      bc={bc}
      bw={bw}
      mx={mx}
      bg={bg}
      {...rest}
    />
  );
};

export default Search;

const styles = StyleSheet.create({});
