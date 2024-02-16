import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/Theme";
import CustomText from "../../components/CustomText";
import CustomInput from "../../components/CustomInput";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.flexContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.left}>
            <AntDesign name="left" size={24} color="#fff" />
          </TouchableOpacity>
          <CustomText style={styles.ProductDetailText} color="#fff">
            {item.title}
          </CustomText>
          <View style={styles.right}>
            <TouchableOpacity onPress={handleBack} style={{ left: 5 }}>
              <AntDesign name="closecircleo" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.input}>
        {/* <View style={{ marginTop: 10 }}>
          <CustomText style={styles.itemId}>Product ID:</CustomText>
          <CustomInput mx={10} mt={10} value={item.id.toString()} />
        </View> */}
        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>Product:</CustomText>
          <CustomText style={styles.h4}>{item.id}</CustomText>
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomText style={styles.itemField}>Buy Rate:</CustomText>
          <CustomInput mx={10} mt={10} value={item.BuyRate.toString()} />
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomText style={styles.itemField}>Total In:</CustomText>
          <CustomInput mx={10} mt={10} value={item.TotalIn.toString()} />
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomText style={styles.itemField}>In Hand:</CustomText>
          <CustomInput mx={10} mt={10} value={item.InHand.toString()} />
        </View>
        <View style={{ marginTop: 10 }}>
          <CustomText style={styles.itemField}>Stock Price:</CustomText>
          <CustomInput mx={10} mt={10} value={item.stockPrice.toString()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  top: {
    height: 150,
    backgroundColor: COLORS.green,
  },
  right: {
    top: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    marginTop: 20,
  },
  left: {
    top: 3,
    flexDirection: "row",
  },
  flexContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 50,
    justifyContent: "space-between",
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
  ProductDetailText: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 100,
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  itemId: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemField: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ProductDetailsScreen;
