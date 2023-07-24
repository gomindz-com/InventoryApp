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


const RegisterScreen = () => {
  const navigation = useNavigation();

  const HomeScreen = () => {
    navigation.navigate("Main");
  };

  const RegisterScreen = () => {
    navigation.navigate("Register");
  };

  const LoginScreen = () => {
    navigation.navigate("Login");
  };

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
            source={require("../../../Sms-Inventory/assets/images/Signup.png")}
            style={styles.image}
          />
        </View>
        <Text style={{ fontSize: 30, fontWeight: "500", marginBottom: 30 }}>
          Sign up
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
            style={{ width: "86%", paddingVertical: 0, color: "#337037", borderBottomColor: "#ccc",
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
          <Ionicons name="person-outline" size={24} color="#666" style={{ marginRight: 5 }} />
          <TextInput
            placeholder="Full name"
            style={{ width: "86%", paddingVertical: 0, color: "#337037", borderBottomColor: "#ccc",
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

        <View style={{marginTop: 15, marginBottom: 20,}}>
        <Text style={{color: "#666", fontSize: 15}}>By signing up you've agree to our <Text style={{color: "#337037"}}>Terms & Conditions</Text> </Text>
        <Text style={{color: "#666", fontSize: 15}}>and <Text style={{color: "#337037"}}>Privacy Policy</Text></Text>
        </View>


        <TouchableOpacity
          onPress={() => {}}
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
          <CustomText fontSize={15} fw={"normal"} color={"#666"} >
            Joined us before?
          </CustomText>

          <TouchableOpacity style= {{marginLeft:5}}>
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
  }
});
