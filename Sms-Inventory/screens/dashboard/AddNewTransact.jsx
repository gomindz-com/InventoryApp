import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import CustomInput from "../../components/CustomInput";
import CustomCard from "../../components/CustomCard";
import CustomDatePickerFine from "../../components/CustomDatePicker";
import SelectDropdown from "react-native-select-dropdown";
import ModalDropdown from "react-native-modal-dropdown";

const countries = ["Product In", "Product Out"];

const options = [
  { label: "Product IN", value: "IN" },
  { label: "Product OUT", value: "OUT" },
];

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

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleSubmit = () => {

    navigation.navigate("Home");
  };

  return (
    // <>
    //   <CustomText>Hello</CustomText>
    // </>
    <View style={styles.mainContainer}>
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

      <CustomCard
        style={{
          marginHorizontal: 30,
          alignSelf: "center",
          width: "95%",
          height: "65%",
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomDatePickerFine />

          <CustomInput mt={10} placeholder={"Product"} bg="#f5faf8" bw={0} />

          <CustomInput
            mt={10}
            placeholder={"Product Type"}
            bg="#f5faf8"
            bw={0}
          />

          <CustomInput
            mt={10}
            placeholder={"Current Stock"}
            bg="#f5faf8"
            bw={0}
          />

          <CustomInput mt={10} placeholder={"Quantity"} bg="#f5faf8" bw={0} />

          <CustomInput mt={10} placeholder={"remark"} bg="#f5faf8" bw={0} />

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
          />

          {/* <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {}}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          /> */}
        </ScrollView>
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
  mainContainer: {
    backgroundColor: COLORS.green,
    flex: 1,
  },
});
