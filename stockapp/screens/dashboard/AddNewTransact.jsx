import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup"; // Import Yup
import ModalDropdown from "react-native-modal-dropdown";
import { COLORS } from "../../constants/Theme";
import CustomCard from "../../components/CustomCard";
import { AddTransaction } from "../apiService/transationApi";

const AddNewTransact = () => {
  const navigation = useNavigation();

  const goBackScreen = () => {
    navigation.goBack();
  };

  const [product, setProduct] = useState("");
  const [productType, setProductType] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [quantity, setQuantity] = useState("");
  const [remark, setRemark] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [errors, setErrors] = useState({
    product: "",
    productType: "",
    currentStock: "",
    quantity: "",
    remark: "",
    selectedValue: "",
  });

  // Define validation schema
  const schema = Yup.object().shape({
    product: Yup.string().required("Product is required"),
    productType: Yup.string().required("Product Type is required"),
    currentStock: Yup.string().required("Current Stock is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be positive"),
    remark: Yup.string(),
    selectedValue: Yup.string().required("Status is required"),
  });

  const handleSubmit = async () => {
    const productData = {
      quantity,
      remark,
      products: product,
      type: selectedValue === "Product In" ? "in" : "out",
    };

    try {
      const response = await AddTransaction(productData);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error Adding Transaction:", error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.top}>
        <View style={styles.topButton}>
          <TouchableOpacity onPress={goBackScreen}>
            <AntDesign name="left" size={25} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit}>
            <AntDesign name="check" size={25} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.textTitle}>Add New Transaction</Text>
      </View>

      <CustomCard
        style={{
          marginHorizontal: 30,
          alignSelf: "center",
          width: "95%",
          top: 20,
        }}
      >
        <TextInput
          style={styles.inputfiles}
          placeholder={"Product"}
          value={product}
          onChangeText={setProduct}
        />
        {errors.product ? (
          <Text style={styles.error}>{errors.product}</Text>
        ) : null}

        <TextInput
          style={styles.inputfiles}
          placeholder={"Quantity"}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        {errors.quantity ? (
          <Text style={styles.error}>{errors.quantity}</Text>
        ) : null}

        <TextInput
          style={styles.inputfiles}
          placeholder={"Remark"}
          value={remark}
          onChangeText={setRemark}
        />
        {errors.remark ? (
          <Text style={styles.error}>{errors.remark}</Text>
        ) : null}

        <ModalDropdown
          defaultValue={"Select Status"}
          animated={true}
          dropdownTextStyle={{ fontSize: 20, fontWeight: "bold" }}
          dropdownStyle={{ height: 100 }}
          isFullWidth={true}
          textStyle={{ fontSize: 20, fontWeight: "bold" }}
          style={{
            marginTop: 10,
            height: 50,
            width: "100%",
            backgroundColor: "#f5faf8",
            justifyContent: "center",
            borderRadius: 10,
            elevation: 12,
          }}
          options={["Product In", "Product Out"]}
          onSelect={(value) => setSelectedValue(value)}
        />
        {errors.selectedValue ? (
          <Text style={styles.error}>{errors.selectedValue}</Text>
        ) : null}
      </CustomCard>
    </View>
  );
};

export default AddNewTransact;

const styles = StyleSheet.create({
  top: {
    height: 150,
    backgroundColor: COLORS.green,
  },
  topButton: {
    marginTop: 50,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 10,
  },
  textTitle: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 23,
    color: "#fff",
  },
  inputesStylesConatiner: {
    marginHorizontal: 10,
  },
  mainContainer: {
    flex: 1,
  },
  inputfiles: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    borderWidth: 0.5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 5,
    marginLeft: 10,
  },
});
