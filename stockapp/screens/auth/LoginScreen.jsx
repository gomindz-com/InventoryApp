import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { IMAGES, COLORS } from "../../constants/Theme";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../apiService/authenticationApi";

const LoginScreen = () => {
  const navigation = useNavigation();

  const HomeScreen = () => {
    navigation.navigate("Main");
  };

  const RegisterScreen = () => {
    navigation.navigate("Register");
  };

  const ForgotPassword = () => {
    navigation.navigate("Forgot");
  };

  const [data, setData] = useState({
    secureTextEntry: true,
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleLogin = async () => {
    try {
      // Validate data using the loginSchema
      await loginSchema.validate(data, { abortEarly: false });

      // Prepare user data for login
      const userData = {
        email: data.email,
        password: data.password,
      };

      setLoading(true);

      loginUser(userData)
        .then(async (res) => {
          setLoading(false);
          console.log("response", res.data);

          const token = res.data.token;

          await AsyncStorage.setItem("token", token);

          HomeScreen();
        })
        .catch((error) => {
          console.error("API Error:", error);
          Alert.alert("An error occurred. Please try again later.");
        });
    } catch (error) {
      console.error("Validation Error:", error);

      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     // Validate data
  //     await loginSchema.validate(data, { abortEarly: false });

  //     // Call the login API function with user data
  //     const userData = {
  //       email: data.email,
  //       password: data.password,
  //     };
  //     setLoading(true);
  //     const res = await authApi.login(userData);
  //     setLoading(false);
  //     console.log("response", res.data);

  //     const token = res.data.token;

  //     // Store the token in AsyncStorage
  //     await AsyncStorage.setItem("token", token);

  //     // Navigate to the home screen or perform any other necessary actions
  //     HomeScreen();
  //   } catch (error) {
  //     // Handle validation errors or API errors
  //     console.error(error);
  //     if (error.inner) {
  //       const newErrors = {};
  //       error.inner.forEach((err) => {
  //         newErrors[err.path] = err.message;
  //       });
  //       setErrors(newErrors);
  //     } else {
  //       // Handle other types of errors
  //     }
  //   }
  // };

  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#337037"
            style={{ marginTop: 20 }}
          />
        )}

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/loginn.png")}
            style={styles.image}
          />
        </View>
        <Text style={{ fontSize: 30, fontWeight: "500", marginBottom: 30 }}>
          Login
        </Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Ionicons
            name="at-sharp"
            size={24}
            color="#666"
            style={{ marginRight: 5 }}
          />
          <TextInput
            placeholder="Email"
            style={{
              width: "87%",
              paddingVertical: 0,
              color: "#337037",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 15,
            }}
            keyboardType="email-address"
            onChangeText={(text) => {
              setData({ ...data, email: text.toLowerCase() });
              setErrors({ ...errors, email: "" });
            }}
          />
        </View>

        {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

        <View
          style={{
            flexDirection: "row",
          }}
        >
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

        <TouchableOpacity
          style={{ alignItems: "flex-end", marginTop: 15 }}
          onPress={ForgotPassword}
        >
          <CustomText color="#337037" fw={"500"}>
            Forgot Password?
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
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
            Login
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              borderBottomWidth: 1.5,
              width: "40%",
              height: "50%",
              marginRight: 15,
              borderColor: "#ccc",
            }}
          ></View>
          <Text
            style={{
              textAlign: "center",
              justifyContent: "center",
              color: "gray",
              fontWeight: "bold",
            }}
          >
            OR
          </Text>
          <View
            style={{
              borderBottomWidth: 1.5,
              width: "40%",
              justifyContent: "center",
              height: "50%",
              marginLeft: 15,
              borderColor: "#ccc",
            }}
          ></View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#ddd",
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 5,
            marginBottom: 35,
            marginTop: 20,
            borderColor: "white",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../assets/images/icons8-google-48.png")}
            style={{ justifyContent: "center", marginRight: 70 }}
          />
          <Text
            style={{
              color: "#000",
              textAlignVertical: "center",
              alignSelf: "center",
            }}
          >
            Login with Google
          </Text>
        </TouchableOpacity>

        <View style={styles.Accounts}>
          <CustomText fontSize={15} fw={"normal"} color={"#666"}>
            New to Stocks?
          </CustomText>

          <TouchableOpacity style={{ marginLeft: 5 }}>
            <CustomText
              fw={"bold"}
              fontSize={15}
              onPress={RegisterScreen}
              color={"#337037"}
            >
              Register
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    marginTop: 10,
    marginBottom: 10,
  },
});
