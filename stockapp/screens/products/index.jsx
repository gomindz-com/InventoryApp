import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { COLORS } from "../../constants/Theme";
import CustomText from "../../components/CustomText";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomSearch from "../../components/CustomSearch";
import CustomCard from "../../components/CustomCard";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../apiService/tokenConfig";
const endPoint = "/mobile/mobileProducts";
import apis from "../apiService/api";
import axios from "axios";
import { getAddProduct } from "../apiService/productApi";

import addProductApi from "../apiService/productApi";
import { useState, useEffect } from "react";

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
    title: "Banana",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
  {
    id: 3,
    title: "Apple",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
  {
    id: 4,
    title: "Mango",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
  {
    id: 5,
    title: "Lemon",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
  {
    id: 6,
    title: "Watermelon",
    BuyRate: 10,
    TotalIn: 10,
    InHand: 5,
    stockPrice: 5,
  },
];

const ProductScreen = () => {
  const [productData, setProductData] = useState([]);
  console.log("here  we gogg", productData);
  const navigation = useNavigation();
  const addproductscreen = () => {
    navigation.navigate("addProduct");
  };

  const navigateToDetails = (item) => {
    navigation.navigate("ProductDetails", { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToDetails(item)}
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
      <CustomText style={styles.title}>{item.name}</CustomText>
      <AntDesign name="right" size={24} color="black" />
    </TouchableOpacity>
  );

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await getAddProduct();
        if (response.data.status) {
          setProductData(response.data.products); // Set product data in state
        } else {
          console.error("API returned false status:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.flexContainer}>
          <TouchableOpacity style={styles.left}>
            <AntDesign name="left" size={24} color="#fff" />
          </TouchableOpacity>
          <CustomText style={styles.producttitle} color="#fff">
            PRODUCTS
          </CustomText>

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

      {/* {productData.map((item, key) => (
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
          <CustomText style={styles.title}>{item.name}</CustomText>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      ))} */}

      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // or use a unique identifier from your data, like item.id
      />
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
    top: 5,
  },
  flexContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 50,
    justifyContent: "space-between",
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
  },
  producttitle: {
    top: 15,
    fontSize: 20,
  },
});

export default ProductScreen;
