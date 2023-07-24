import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  secureTextEntry,
  View,
} from "react-native";
import React, { useContext } from "react";
import { IMAGES, COLORS } from "../../constants/Theme";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


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
  }

  const [data, setData] = React.useState({
    secureTextEntry: true,
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

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../Sms-Inventory/assets/images/loginn.png")}
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
            style={{ width: "87%", paddingVertical: 0, color: "#337037", borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25, }}
            keyboardType="email-address"
          />
        </View>

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
          style={{borderBottomWidth: 1, borderBottomColor: "#ccc", paddingBottom: 8, flex: 1,  color: "#337037"}}
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

        <TouchableOpacity style={{ alignItems: "flex-end", marginTop: 15}} onPress={ForgotPassword}>
          <CustomText color="#337037" fw={"500"}>
            Forgot Password?
          </CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={HomeScreen}
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
            source={require("../../../Sms-Inventory/assets/images/icons8-google-48.png")}
            style={{ justifyContent: "center", marginRight: 70 }}
          />
          <Text style={{ color: "#000", textAlignVertical: "center" }}>
            Login with Google
          </Text>
        </TouchableOpacity>

        <View style={styles.Accounts}>
          <CustomText fontSize={15} fw={"normal"} color={"#666"} >
            New to Stocks?
          </CustomText>

          <TouchableOpacity style= {{marginLeft:5}}>
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
});
