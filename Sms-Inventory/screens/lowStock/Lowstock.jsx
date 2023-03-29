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

  
  
  const Lowstock = () => {
    return (
      <View style={styles.conatinter}>
        <View style={styles.top}>
          <View style={styles.flexContainer}>
            <TouchableOpacity style={styles.left}>
              <AntDesign name="left" size={24} color="#fff" />
              <CustomText color="#fff">Low Stock</CustomText>
            </TouchableOpacity>
  
            <View style={styles.right}>
             
              <TouchableOpacity style={{ left: 2 }}>
                <AntDesign name="dropbox" size={24} color="#fff" />
              </TouchableOpacity>
            
            </View>
          </View>
          <View style={{ marginTop: 35 }}>
            <CustomSearch mx={10} />
          </View>
        </View>
  
        <CustomCard bc="black" mt={10} mx={5} style={{flexDirection:"row"}}>
            <View>
            <CustomText style={{ marginTop: 5 }}>chocolate =1kg</CustomText>
            <CustomText style={{ marginTop: 5 }}>IN 200 OUT 190 = 4</CustomText>
            </View>
         
          <View style={{
            marginLeft:200,
            marginTop:20
            }}>
          <AntDesign name="pluscircleo" size={24} color="black" />
          </View>
        </CustomCard>
  
      </View>
    );
  };
  
  export default Lowstock;
  
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