import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";







const SettingScreen = () => {
    const navigation = useNavigation()
    const goBackScreen = () => {
        navigation.goBack()
    }
    return(
        <View>
            <View style={styles.top} >
            <TouchableOpacity onPress={goBackScreen} style={styles.backtouch}>
          <AntDesign name="left" size={40} color="#fff" />
         
        </TouchableOpacity>


        

            </View>

            <CustomButton height={200} titleSize={20} mt={20} title={"Set Low Stock"}/>
        </View>
    )
}



export default SettingScreen;
const styles = StyleSheet.create({
    top: {
        height: 150,
        backgroundColor: COLORS.green,
      },
      backtouch: {
        marginTop: 50,
        left: 20

      },
      buttonContainer:{
        height: 40,
        backgroundColor: "#fff"  

      }

})