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
        <CustomText style={styles.title} color="#fff">Add Product</CustomText>
        </View>

        <View style={styles.right}>

        <TouchableOpacity style={{ right: 15 }}>
          <AntDesign name="export" size={24} color="white" />
          </TouchableOpacity>
         
          <TouchableOpacity style={{ right: 2 }}>
          <AntDesign name="check" size={24} color="white" />
          </TouchableOpacity>
          
        
        </View>
      </View>
     
    </View>

    <View style={{ marginTop: 2 }}>
        <CustomInput placeholder={"Product Name"} mx={10} mt={10} />
      </View>
    <View style={{ marginTop: 2 }}>
  
        <CustomInput placeholder={"Product ID"} mx={10} mt={10} />
      </View>
    <View style={{ marginTop: 2 }}>
        <CustomInput placeholder={"Buy Rate"} mx={10} mt={10} />
      </View>
    <View style={{ marginTop: 2 }}>
        <CustomInput placeholder={"Product escription"} mx={10} mt={10} />
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
    fontSize:30,
    fontWeight:"bold",
    
  }

  
});







export default AdProductScreen;


