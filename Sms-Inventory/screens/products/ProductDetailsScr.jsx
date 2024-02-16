import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/Theme";
import CustomText from "../../components/CustomText";
import CustomInput from "../../components/CustomInput";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";

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
          <CustomText style={styles.h1}>Product ID:</CustomText>
          <CustomText style={styles.h4}>{item.id}</CustomText>
        </View>
        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>Buy Rate:</CustomText>
          <CustomText style={styles.h4}>{item.BuyRate}</CustomText>
        </View>
        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>Total In:</CustomText>
          <CustomText style={styles.h4}>{item.BuyRate}</CustomText>
        </View>
        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>In Hand:</CustomText>
          <CustomText style={styles.h4}>{item.BuyRate}</CustomText>
        </View>
        <View style={styles.singleButton}>
          <CustomText style={styles.h1}>Stock Price:</CustomText>
          <CustomText style={styles.h4}>{item.BuyRate}</CustomText>
        </View>
        {/* <View style={{ marginTop: 10 }}>
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
        </View> */}
      </View>

      {/* <View style={styles.buttonContainer}>
        <CustomButton title={"Delete"} onPress={() => {}} />
        <CustomButton title={"Edit"} onPress={() => {}} />
        <CustomButton title={"Transactions"} onPress={() => {}} />
      </View> */}


      <View
          style={{
            flexDirection: "row",
            marginTop: 60,
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 25,
          }}
        >
          <CustomButton
            width={100}
            height={45}
            titleSize={12}
            title={"Delete"}
            br={15}
            bg={"#fff"}
            bc={"#2e9a90"}
            // mx={10}
          />

          <CustomButton
            br={15}
            height={45}
            titleSize={12}
            width={100}
            title={"Edit"}
            bg={"#fff"}
            bc={"#2e9a90"}
            mx={10}
          />
          <CustomButton
            br={15}
            height={45}
            titleSize={12}
            width={120}
            title={"Transactions"}
            bg={"#fff"}
            bc={"#2e9a90"}
          />
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
    width: "95%",
    height: 60,
    elevation: 5,
    backgroundColor: "#f5faf8",
    borderRadius: 10,
    marginTop: 10,
    marginLeft:10,
    marginRight:100,
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
  h1: {
    alignSelf: "center",
    color: "#2e9a90",
    fontWeight: "bold",
    fontSize: 20,
    left: 10,
  },
  h4: {
    marginLeft: 10,
    alignSelf: "center",
    color: "#2e9a90",
    fontWeight: "bold",
    fontSize: 20,
    left: 10,
  },
  itemField: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 60,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 25,
  },
  buttoncustom:{
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "transparent", // No fill color
      },

       buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black", // Text color
  },
});

export default ProductDetailsScreen;
