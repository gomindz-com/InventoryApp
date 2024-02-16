import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants/Theme";
import CustomText from "../../components/CustomText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomSearch from "../../components/CustomSearch";
import CustomCard from "../../components/CustomCard";
import { useNavigation } from "@react-navigation/native";

const prductData = [
  {
    id: 1,
    title: "Orange",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
  {
    id: 2,
    title: "Orange",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
  {
    id: 3,
    title: "Orange",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
  {
    id: 4,
    title: "Orange",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
  {
    id: 5,
    title: "Orange",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
  {
    id: 6,
    title: "Orange",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
];

const ProductScreen = () => {
  const navigation = useNavigation() 
  const addproductscreen = () =>{
    navigation.navigate("addProduct")
  }

  const navigateToDetails = (item) => {
    // Navigate to the screen where you want to show details of the product
    navigation.navigate("ProductDetails", { item });
    // Replace "ProductDetails" with your actual screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.flexContainer}>
          <TouchableOpacity style={styles.left}>
            <AntDesign name="left" size={24} color="#fff" />
            <CustomText color="#fff">PRODUCTS</CustomText>
          </TouchableOpacity>

          <View style={styles.right}>
            <TouchableOpacity onPress={addproductscreen} style={{ right: 10 }}>
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ left: 2 }}>
              <AntDesign name="dropbox" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ left: 10 }}>
              <AntDesign name="folderopen" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 35 }}>
          <CustomSearch mx={10} />
        </View>
      </View>

      <CustomCard bc="black" mt={10} mx={10}>
        <CustomText>Total Product:</CustomText>
        <CustomText style={{ marginTop: 5 }}>Total Product:</CustomText>
        <CustomText style={{ marginTop: 5 }}>Total Product:</CustomText>
      </CustomCard>

      {prductData.map((item , key ) => (
        <TouchableOpacity
        key={key}
        onPress={() => navigateToDetails(item)} // Pass the item to the navigateToDetails function
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 390,
          height: 50,
          borderColor: "black",
          borderWidth: 1,
          marginHorizontal: 10,
          marginTop: 10,
          alignItems: "center",
          borderRadius: 10,
          }}
        >
          <CustomText>{item.title}</CustomText>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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

export default ProductScreen;