import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS } from "../../constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import CustomCard from "../../components/CustomCard";
import CustomButton from "../../components/CustomButton";

const DeatailScreen = ({ route }) => {
  const { params } = route;
  const productData = params.item;

  const navigation = useNavigation();

  const goBackScreen = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.top}>
        <TouchableOpacity style={styles.goBackButton} onPress={goBackScreen}>
          <AntDesign name="left" size={35} color="white" />
        </TouchableOpacity>

        <CustomText style={styles.title}>{productData.product}</CustomText>
      </View>

      <ScrollView style={{ marginHorizontal: 20 }}>
        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>Product ID:</CustomText>
          <CustomText style={styles.h4}>{productData.product}</CustomText>
        </View>

        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>Type:</CustomText>
          <CustomText style={styles.h4}>{productData.status}</CustomText>
        </View>

        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>Product Type:</CustomText>
          <CustomText style={styles.h4}>{productData.productType}</CustomText>
        </View>

        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>Quantity:</CustomText>
          <CustomText style={styles.h4}>{productData.quantity}</CustomText>
        </View>

        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>CurrentStock:</CustomText>
          <CustomText style={styles.h4}>{productData.currentStock}</CustomText>
        </View>

        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>Remark:</CustomText>
          <CustomText style={styles.h4}>{productData.remark}</CustomText>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 40,
          }}
        >
          <CustomButton
            width={100}
            height={45}
            titleSize={20}
            title={"Delete"}
            br={10}
            bg={"#fff"}
            bc={"#2e9a90"}
          />

          <CustomButton
            br={10}
            height={45}
            titleSize={20}
            width={100}
            title={"Edit"}
            bg={"#fff"}
            bc={"#2e9a90"}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DeatailScreen;

const styles = StyleSheet.create({
  top: {
    height: 150,
    backgroundColor: COLORS.green,
  },
  goBackButton: {
    marginTop: 50,
    left: 30,
  },
  title: {
    alignSelf: "center",
    marginTop: 10,
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },

  singleButton: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    elevation: 5,
    backgroundColor: "#f5faf8",
    borderRadius: 10,
    marginTop: 10,
  },
  h4: {
    marginLeft: 10,
    alignSelf: "center",
    color: "#2e9a90",
    fontWeight: "bold",
    fontSize: 20,
    left: 10,
  },
  h1: {
    alignSelf: "center",
    color: "#2e9a90",
    fontWeight: "bold",
    fontSize: 20,
    left: 10,
  },
  card: {
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
  },
});
