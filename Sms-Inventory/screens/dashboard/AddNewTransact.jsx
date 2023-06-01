import { StyleSheet, Text, View, TouchableOpacity, Picker } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomInput from "../../components/CustomInput";
import DropdownSelect from "../../components/CustomDrop";

// const { params } = route;
// const inputValues = params?.inputValues || [];
// console.log(inputValues);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = () => {
    setCurrentStock("");
    setProduct("");
    setQuantity("");
    setRemark("");
    setProductType("");

    const inputValues = [
      selectedDate,
      product,
      productType,
      currentStock,
      quantity,
      remark,
    ];
    console.log(inputValues);
    navigation.navigate("Home", { inputValues: inputValues });
  };

  return (
    <View>
      <View style={styles.top}>
        <View style={styles.topButton}>
          <TouchableOpacity onPress={goBackScreen}>
            <AntDesign name="left" size={35} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit}>
            <AntDesign name="check" size={40} color="white" />
          </TouchableOpacity>
        </View>

        <CustomText style={styles.textTitle}>Add New Transaction</CustomText>
      </View>
      <View style={styles.inputesStylesConatiner}>
        <CustomDatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <CustomInput
          value={product}
          onChangeText={setProduct}
          mt={10}
          placeholder={"Product"}
        />
        <CustomInput
          value={productType}
          onChangeText={setProductType}
          mt={10}
          placeholder={"Product Type"}
        />
        <CustomInput
          value={currentStock}
          onChangeText={setCurrentStock}
          mt={10}
          placeholder={"Current Stock"}
        />
        <CustomInput
          value={quantity}
          onChangeText={setQuantity}
          mt={10}
          placeholder={"Quantity"}
        />
        <CustomInput
          value={remark}
          onChangeText={setRemark}
          mt={10}
          placeholder={"Remark"}
        />
      </View>

      <View style={{ top: -50 }}>
        <DropdownSelect />
      </View>
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
  },
  textTitle: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 30,
    color: "#fff",
  },
  inputesStylesConatiner: {
    marginHorizontal: 10,
  },
});
