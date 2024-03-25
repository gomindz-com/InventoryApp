import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomText from "../../components/CustomText";
import axios from "axios";
import { registerUser } from "../apiService/authenticationApi";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HomeScreen = () => {
    navigation.navigate("Main");
  };

  const LoginScreen = () => {
    navigation.navigate("Login");
  };

  const [data, setData] = useState({
    secureTextEntry: true,
    email: "",
    password: "",
    fullName: "",
    lastName: "",
    userName: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    fullName: "",
    lastName: "",
    userName: "",
  });

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const registerSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    fullName: Yup.string().required("Full name is required"),
    lastName: Yup.string().required("Last name is required"),
    userName: Yup.string().required("User name is required"),
  });

  const handleRegister = async () => {
    registerSchema
      .validate(data, { abortEarly: false })
      .then(async () => {
        const userData = {
          email: data.email,
          password: data.password,
          first_name: data.fullName,
          last_name: data.lastName,
          username: data.userName,
          is_active: true,
        };

        await registerUser(userData)
          .then(async (res) => {
            if (res.status == 201) {
              Alert.alert("Successfully Registered");
              LoginScreen();
            } else {
              Alert.alert("User Could Not Be Registered");
            }
          })
          .catch((err) => {
            Alert.alert("Server Errror");
          });
      })
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/Signup.png")}
            style={styles.image}
          />
        </View>
        <Text style={{ fontSize: 30, fontWeight: "500", marginBottom: 30 }}>
          Sign up User
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="at-sharp"
            size={24}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email"
            style={{
              width: "86%",
              paddingVertical: 0,
              color: "#337037",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 10,
            }}
            keyboardType="email-address"
            onChangeText={(text) => {
              setData({ ...data, email: text.toLowerCase() });
              setErrors({ ...errors, email: "" }); // Clear email error when typing
            }}
          />
        </View>

        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="First name"
            style={{
              width: "86%",
              paddingVertical: 0,
              color: "#337037",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 10,
            }}
            onChangeText={(text) => {
              setData({ ...data, fullName: text });
              setErrors({ ...errors, fullName: "" }); // Clear full name error when typing
            }}
          />
        </View>

        {errors.fullName ? (
          <Text style={styles.error}>{errors.fullName}</Text>
        ) : null}

        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Last name"
            style={{
              width: "86%",
              paddingVertical: 0,
              color: "#337037",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 10,
            }}
            onChangeText={(text) => {
              setData({ ...data, lastName: text });
              setErrors({ ...errors, lastName: "" }); // Clear full name error when typing
            }}
          />
        </View>

        {errors.lastName ? (
          <Text style={styles.error}>{errors.lastName}</Text>
        ) : null}

        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="person-outline"
            size={24}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="user name"
            style={{
              width: "86%",
              paddingVertical: 0,
              color: "#337037",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 10,
            }}
            onChangeText={(text) => {
              setData({ ...data, userName: text });
              setErrors({ ...errors, userName: "" }); // Clear full name error when typing
            }}
          />
        </View>

        {errors.userName ? (
          <Text style={styles.error}>{errors.userName}</Text>
        ) : null}

        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="lock-outline"
            size={24}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingBottom: 8,
              flex: 1,
              color: "#337037",
            }}
            placeholder="Password"
            onChangeText={(val) => handlePasswordChange(val)}
            secureTextEntry={data.secureTextEntry ? true : false}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Ionicons name="ios-eye-off-outline" size={24} color="#666" />
            ) : (
              <Ionicons name="ios-eye-outline" size={24} color="#666" />
            )}
          </TouchableOpacity>
        </View>
        {errors.password ? (
          <Text style={styles.error}>{errors.password}</Text>
        ) : null}

        <View style={{ marginTop: 15, marginBottom: 20 }}>
          <Text style={{ color: "#666", fontSize: 15 }}>
            By signing up you've agree to our{" "}
            <Text style={{ color: "#337037" }}>Terms & Conditions</Text>{" "}
          </Text>
          <Text style={{ color: "#666", fontSize: 15 }}>
            and <Text style={{ color: "#337037" }}>Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          style={{
            backgroundColor: "#337037",
            padding: 15,
            borderRadius: 10,
            marginBottom: 30,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>

        <View style={styles.Accounts}>
          <CustomText fontSize={15} fw={"normal"} color={"#666"}>
            Joined us before?
          </CustomText>

          <TouchableOpacity style={{ marginLeft: 5 }}>
            <CustomText
              fw={"bold"}
              fontSize={15}
              onPress={LoginScreen}
              color={"#337037"}
            >
              Login
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
    marginHorizontal: 30,
  },

  Accounts: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
