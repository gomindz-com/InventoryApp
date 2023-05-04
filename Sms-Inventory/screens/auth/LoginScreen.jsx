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
import CustomText from "../../components/CustomText";
import CustomCheckbox from "../../components/CustomCheckbox";

const LoginScreen = () => {
  const navigation = useNavigation();

  const HomeScreen = () => {
    navigation.navigate("Main");
  };

  const RegisterScreen = () => {
    navigation.navigate("Register");
  }


  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <CustomText
          style={styles.GoText}
        >
          SONEYA
        </CustomText>
        <CustomText
          style={styles.GoLogin}
        >
          LOGIN
        </CustomText>
      </View>

      <View style={{ height: "50%" }}>
        <CustomInput
          placeholder={"Email"}
          mx={30}
          mb={30}
          bc={"#000"}
          mt={40}
          height={60}
          bg={"#FFF"}
          width={100}
          bw={1}
          px={20}
          br={5}
        />
        <CustomInput
          placeholder={"Password"}
          mx={30}
          mb={20}
          bc={"#000"}
          mt={30}
          height={60}
          bg={"#FFF"}
          width={100}
          bw={1}
          px={20}
          br={5}
        />

        <View style={styles.LoginBtn}>
          <CustomButton title={"LOGIN"} titleSize={20} onPress={HomeScreen} br={5} height={70} mt={40} color={"#FFFFFF"} mb={5} />
        </View>

        <View style={styles.Remembrance}>
          <View style={{ flexDirection: "row" }}>
            <CustomCheckbox/>
            <CustomText fontSize={13} fw={"normal"} color={"#000000"}>
              Remember me
            </CustomText>
          </View>

          <TouchableOpacity>
            <CustomText
              style={{ textDecorationLine: "underline", left: 5}}
              fontSize={13}
              fw={"normal"}
              color={"#000000"}
            >
              Forgot Password
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.Accounts}>
        <CustomText fontSize={18} mx={3} fw={"bold"} color={"#565656"}>
          You do not have an account yet?
        </CustomText>

        <TouchableOpacity>
          <CustomText mx={5} fw={"bold"} fontSize={18} onPress={RegisterScreen} >
            Sign Up
          </CustomText>
        </TouchableOpacity>
      </View>


    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    height: "100%"
  },

  top: {
    height: "25%",
    marginTop: 70,
  },

  GoText: {
    alignSelf: "center",
    marginHorizontal: 30,
    fontSize: 40,
    fontWeight: "normal",
  }, 

  GoLogin:{
    alignSelf: "center",
    marginTop: 70,
    fontSize: 50,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginBottom: 30,
  },
  
  LoginBtn: {
    marginHorizontal: 20, 
  },

  Remembrance: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 35,
      marginHorizontal: 60,
      marginBottom: 55,
  },

  Accounts: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignSelf: "center",
      marginHorizontal: 30,
      height: "25%",
      marginTop: 50
  }
});
