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
  
  
  const ProductDetails = ({ route }) => {
    // Extracting the item details from the route params
    const { item } = route.params;
  
  
    return (
        <View style={styles.container}>
          <CustomText style={styles.title}>Product Details pages</CustomText>
          <View style={styles.detailsContainer}>
            <CustomText style={styles.label}>ID:</CustomText>
            <CustomText>{item.id}</CustomText>
          </View>
          <View style={styles.detailsContainer}>
            <CustomText style={styles.label}>Title:</CustomText>
            <CustomText>{item.title}</CustomText>
          </View>
          {/* Add more details as needed */}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
      detailsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      },
      label: {
        fontWeight: "bold",
        marginRight: 10,
      },
    });
    
  
  export default ProductDetails;
  
  
  