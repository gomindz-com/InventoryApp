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
  import { useNavigation } from "@react-navigation/native";

  
  const TransactionScreen = () => {
    const navigation = useNavigation()

    const moveAddTransaction = ()=> {
      navigation.navigate("Filter")
    }
    return(
        <View style={styles.conatinter}>
        <View style={styles.top}>
          <View style={styles.flexContainer}>
            <TouchableOpacity style={styles.left}>
              <AntDesign name="left" size={24} color="#fff" />
            </TouchableOpacity>
            <CustomText style={styles.transtitle} color="#fff">All Transaction</CustomText>
  
            <View style={styles.right}>
              <TouchableOpacity onPress={moveAddTransaction} style={{ left: 2 }}>
              <AntDesign name="filter" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={{ left: 10 }}>
              <Feather name="more-vertical" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
      
        </View>
        
       
        <CustomCard bc="black" mt={-30} mx={10}>

          <View style={{flexDirection:'row'}}>
          <View style={{
            height:20,
            width:20,
            backgroundColor:'red',
            }}>
        </View>

        <CustomText style={{top:2, left:4}}>630 In:</CustomText>

          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{
            height:20,
            width:20,
            backgroundColor:'green',
            marginTop:5,
        }}>
            
        </View>
        <CustomText style={{ marginTop:2, left:4 }}>630 Out:</CustomText>
          </View>
        
        <View style={{flexDirection:'row'}}>
        <View style={{
            height:20,
            width:20,
            backgroundColor:'yellow',
            marginTop:5,
        }}>
           
        </View> 
        <CustomText style={{  marginTop:2, left:4 }}>630 In-hand:</CustomText>
        </View>
         
          
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
      top:5,
    },
    flexContainer: {
      flexDirection: "row",
      marginHorizontal: 15,
      marginTop: 50,
      justifyContent: "space-between",
    },
    transtitle:{
      top:15,
      fontSize:23,
    },
  });