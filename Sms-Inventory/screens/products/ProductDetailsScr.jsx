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

const ProductDetailsScreen = ({ route }) => {
  const { item } = route.params;
  console.log(item);

  const myData = [
    {
      id: "1",
      name: "Earnest Green",
    },
    {
      id: "2",
      name: "Winston Orn",
    },
    {
      id: "3",
      name: "Carlton Collins",
    },
    {
      id: "4",
      name: "Malcolm Labadie",
    },
    {
      id: "5",
      name: "Michelle Dare",
    },
    {
      id: "6",
      name: "Carlton Zieme",
    },
    {
      id: "7",
      name: "Jessie Dickinson",
    },
    {
      id: "8",
      name: "Julian Gulgowski",
    },
    {
      id: "9",
      name: "Ellen Veum",
    },
    {
      id: "10",
      name: "Lorena Rice",
    },

    {
      id: "11",
      name: "Carlton Zieme",
    },
    {
      id: "12",
      name: "Jessie Dickinson",
    },
    {
      id: "13",
      name: "Julian Gulgowski",
    },
    {
      id: "14",
      name: "Ellen Veum",
    },
    {
      id: "15",
      name: "Lorena Rice",
    },
  ];

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Product Details pages</CustomText>
      <View style={styles.detailsContainer}>
        <CustomText style={styles.label}>ID:</CustomText>
        {/* <CustomText>{item.id}</CustomText> */}
      </View>
      <View style={styles.detailsContainer}>
        <CustomText style={styles.label}>Title:</CustomText>

        {myData.map((dummy) => {
          return (
            <View>
              <CustomText>{dummy.name}</CustomText>
            </View>
          );
        })}
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
    // flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default ProductDetailsScreen;
