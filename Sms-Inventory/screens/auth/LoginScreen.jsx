import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { IMAGES, COLORS } from "../../constants/Theme";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomSearch from "../../components/CustomSearch";
const LoginScreen = () => {
  const navigation = useNavigation();

  const HomeScreen = () => {
    navigation.navigate("Main");
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}></View>
      <CustomInput />
      <CustomButton />
      <CustomSearch />

      <TouchableOpacity onPress={HomeScreen}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  top: {
    height: 200,
  },
  // titleContainer: { marginHorizontal: 15, marginBottom: 30 },
  // title: {
  //   fontSize: 30,
  //   fontWeight: "800",
  //   color: COLORS.secondary,
  // },

  // icon: { marginRight: 5 },

  // link: {},
  // linkText: { color: COLORS.link, fontWeight: "700" },

  // bottom: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginBottom: 30,
  // },
});
