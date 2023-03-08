import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

import CustomCard from "../../components/CustomCard";
import CustomCheckBox from "../../components/CustomCheckBox";
import CustomInput from "../../components/CustomInput";
import Search from "../../components/CustomSearch";
import CustomText from "../../components/CustomText";

const LoginScreen = ({ route }) => {
  const { handleLoing } = route.params;

  return (
    <View style={styles.container}>
      <CustomButton title={"login"} onPress={() => handleLoing()} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});
