import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AppRegistry,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants/Theme";
import CustomText from "../../components/CustomText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomSearch from "../../components/CustomSearch";
import CustomCard from "../../components/CustomCard";
import CustomInput from "../../components/CustomInput";


const AdProductScreen = () => {
  return (
    <View style={styles.conatinter}>
    <View style={styles.top}>
      <View style={styles.flexContainer}>
        <TouchableOpacity style={styles.left}>
          <AntDesign name="left" size={24} color="#fff" />
         
        </TouchableOpacity>
        <View >
        <CustomText style={styles.title} color="#fff">ADD PRODUCT</CustomText>
        </View>

        <View style={styles.right}>
         
          <TouchableOpacity style={{ left: 2 }}>
            <AntDesign name="dropbox" size={24} color="#fff" />
          </TouchableOpacity>
        
        </View>
      </View>
     
    </View>

    <View style={{ marginTop: 2 }}>
        <CustomInput placeholder={"Product Name"} mx={10} mt={10} />
      </View>

  </View>
  );
};


const styles = StyleSheet.create({
  conatinter: {},
  top: {
    height: 150,
    backgroundColor: COLORS.green,
  },
  right: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
  },
  flexContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 50,
    justifyContent: "space-between",
  },
  title:{
    marginTop:40,
    fontSize:25
    
  }

  
});







export default AdProductScreen;


