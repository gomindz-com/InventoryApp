import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import { AntDesign } from '@expo/vector-icons';


const SplashScreen = () => {
  const navigation = useNavigation();

  const HomeScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
        animation="bounceIn"
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View 
      animation="fadeInUpBig"
      style={styles.footer}>
        <Text style={styles.title}>Stay connected with everyone!</Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
        <TouchableOpacity style={styles.signIn} onPress={HomeScreen}>
            <Text style={styles.textSign}>Get Started</Text>
            <AntDesign name="right" size={15} color="#fff" style={{left: 3}} />
        </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#337037",
  },

  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },

  logo: {
    width: height_logo,
    height: height_logo,
  },

  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold'
},
text: {
    color: "#565656",
    marginTop:5,
    fontSize: 15
},

button: {
    alignItems: 'flex-end',
    marginTop: 30
},
signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: "#337037"
},
    
textSign: {
    color: 'white',
    fontWeight: 'bold',
    right: 5
}
});
