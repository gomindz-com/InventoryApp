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
  import { Feather } from '@expo/vector-icons';

  
  const TransactionScreen = () => {
    return(
        <View style={styles.conatinter}>
        <View style={styles.top}>
          <View style={styles.flexContainer}>
            <TouchableOpacity style={styles.left}>
              <AntDesign name="left" size={24} color="#fff" />
              <CustomText color="#fff">All Transaction</CustomText>
            </TouchableOpacity>
  
            <View style={styles.right}>
              <TouchableOpacity style={{ left: 2 }}>
              <AntDesign name="filter" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={{ left: 10 }}>
              <Feather name="more-vertical" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
      
        </View>
  
        <CustomCard bc="black" mt={-30} mx={10}>
          
          
          <CustomText style={{ marginTop: 5 }}>630 In:</CustomText>
          <CustomText style={{ marginTop: 5 }}>630 Out:</CustomText>
          <CustomText style={{ marginTop: 5 }}>630 In-hand:</CustomText>
        </CustomCard>
        
       
      </View>
    )
  }

  export default TransactionScreen;

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
  });