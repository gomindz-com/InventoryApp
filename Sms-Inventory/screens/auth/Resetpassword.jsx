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
  
  
  const ResetPassword = () => {
    const navigation = useNavigation();
  
    const HomeScreen = () => {
      navigation.navigate("Main");
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
              source={require("../../../Sms-Inventory/assets/images/Resetpassword.png")}
              style={styles.image}
            />
          </View>

          <View style={{ marginBottom: 30 }}>
          <Text style={{fontSize: 30, fontWeight: "500"}}>Reset</Text>
          <Text style={{fontSize: 30, fontWeight: "500"}}>Password</Text>
          </View>

          <View
          style={{
            flexDirection: "row",
            marginBottom: 30
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

        <View
          style={{
            flexDirection: "row",
            marginBottom: 20
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
            Submit
          </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default ResetPassword;
  
  const styles = StyleSheet.create({
    image: {
      height: 300,
      width: 300,
      marginHorizontal: 30,
    },
  });
