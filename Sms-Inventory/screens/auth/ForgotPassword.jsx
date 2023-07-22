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
import ResetPassword from "./Resetpassword";
  
  
  const ForgotPassword = () => {
    const navigation = useNavigation();
  
    const HomeScreen = () => {
      navigation.navigate("Main");
    };

    const ResetPassword = () => {
      navigation.navigate("Reset");
      };
  
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../Sms-Inventory/assets/images/Forgotpassword.png")}
              style={styles.image}
            />
          </View>

          <View style={{ marginBottom: 30 }}>
          <Text style={{fontSize: 30, fontWeight: "500"}}>Forgot</Text>
          <Text style={{fontSize: 30, fontWeight: "500"}}>Password?</Text>
          </View>

          <View style={{marginBottom: 30}}>
            <Text style={{fontSize: 15, color: "#666"}}>Don't worry! It happens. Please enter the</Text>
            <Text  style={{fontSize: 15, color: "#666"}}>address associated with your account.</Text>
          </View>

          <View
          style={{
            flexDirection: "row",
            marginBottom: 30
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
            style={{ flex: 1, paddingVertical: 0, color: "#337037", borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25, }}
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity
          onPress={ResetPassword}
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
            Submit
          </Text>
        </TouchableOpacity>

         
        </View>
      </SafeAreaView>
    );
  };
  
  export default ForgotPassword;
  
  const styles = StyleSheet.create({
    image: {
      height: 300,
      width: 300,
      marginHorizontal: 30,
    },
  });
  