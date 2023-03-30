import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
// import React, { useContext } from "react";
// import { IMAGES, COLORS } from "../../constants/Theme";
import { useNavigation } from "@react-navigation/native";
// import { AuthContext } from "../../context/AuthContext";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomSearch from "../../components/CustomSearch";
import CustomText from "../../components/CustomText";
import CustomCheckbox from "../../components/CustomCheckbox";

const RegisterScreen = () => {

  const navigation = useNavigation();

  const LoginScreen = () => {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>

      <CustomText style={styles.signup}>SIGN UP</CustomText>
      <CustomInput placeholder={"Sign up with google"} mx={30} height={55} bc={"#000"} bg={"#FFFFFF"} mb={50} br={5} px={100}/>
      <CustomText style={styles.OR}>OR</CustomText>

      <CustomInput placeholder={"Name"} mx={30}
          mb={20}
          bc={"#000"}
          mt={10}
          height={60}
          bg={"#FFFFFF"}
          width={100}
          bw={1}
          px={20}
          br={5}/>
      <CustomInput placeholder={"Email"} mx={30}
          mb={20}
          bc={"#000"}
          mt={10}
          height={60}
          bg={"#FFFFFF"}
          width={100}
          bw={1}
          px={20}
          br={5}/>
      <CustomInput placeholder={"Password"} mx={30}
          mb={20}
          bc={"#000"}
          mt={10}
          height={60}
          bg={"#FFFFFF"}
          width={100}
          bw={1}
          px={20}
          br={5}/>

      <View style={styles.SignupBtn}>
          <CustomButton title={"SIGN UP"} titleSize={20} br={5} height={70} mt={30} color={"#FFFFFF"} mb={5} />
        </View>

      <View style={styles.Remembrance}>
          <View style={{ flexDirection: "row" }}>
            <CustomCheckbox/>
            <CustomText fontSize={13} fw={"normal"} color={"#000000"}>
              Remember
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

        <View style={styles.Accounts}>
        <CustomText fontSize={18} mx={3} fw={"bold"} color={"#565656"}>
          Already have an account?
        </CustomText>

        <TouchableOpacity>
          <CustomText mx={5} fw={"bold"} fontSize={18} onPress={LoginScreen} >
            Sign In
          </CustomText>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#EEEEEE",
    height: "100%",
},
  signup: {
    alignSelf: "center",
    justifyContent:  "center", 
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20
  },
  OR: {
    alignSelf: "center",
    justifyContent: "center",
    fontWeight: "normal",
    fontSize: 20,
    marginBottom: 5
  },

  SignupBtn: {
    marginHorizontal: 20
  },

  Remembrance: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 60,
    marginBottom: 20,
},
  Accounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginHorizontal: 30,
    height: "25%",
    marginTop: 10
}


});
