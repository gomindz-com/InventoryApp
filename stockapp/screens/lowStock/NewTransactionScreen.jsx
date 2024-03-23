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
  import { useNavigation } from "@react-navigation/native";
  import Lowstock from "./Lowstock";

  
  
  const NewTransactionScreen = () => {
    const navigation = useNavigation()

    const handleBack = () => {
        navigation.goBack()
    }
 

  
  
  
    return (
      <View style={styles.conatinter}>
      <View style={styles.top}>
        <View style={styles.flexContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.left}>
            <AntDesign name="left" size={24} color="#fff" />
           
          </TouchableOpacity>
          <View >
          <CustomText style={styles.title} color="#fff">Add Product</CustomText>
          </View>
  
          {/* <View style={styles.right}>
  
          <TouchableOpacity onPress={backScreen} style={{ right: 15 }}>
            <AntDesign name="export" size={24} color="white" />
            </TouchableOpacity>
           
            <TouchableOpacity onPress={backScreen} style={{ right: 2 }}>
            <AntDesign name="check" size={24} color="white" />
            </TouchableOpacity>
            
          
          </View> */}
        </View>
       
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
  
  
  
  
  
  
  
  export default NewTransactionScreen;
  
  
  