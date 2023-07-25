import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import CustomCard from "../../components/CustomCard";
import { COLORS } from "../../constants/Theme";
import { Feather } from "@expo/vector-icons";
import CustomText from "../../components/CustomText";
import PieChart from "react-native-expo-pie-chart";
import { BottomSheet } from "react-native-btr";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

const ProductData = [
  {
    id: 1,
    product: "orange",
    productType: "Fruite",
    currentStock: "44",
    quantity: "55",
    remark: "slay",
    date: "22/44/2033",
    status: "IN",
  },
  {
    id: 2,
    product: "Mango",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "Out",
  },
  {
    id: 3,
    product: "Chikend",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "IN",
  },

  {
    id: 4,
    product: "Alip",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "OUT",
  },

  {
    id: 5,
    product: "Bread",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "IN",
  },

  {
    id: 5,
    product: "Milk",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "OUT",
  },
  {
    id: 6,
    product: "Mango",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "IN",
  },
  {
    id: 7,
    product: "Jimbo",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "OUT",
  },
  {
    id: 8,
    product: "Tomato",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "IN",
  },
  {
    id: 9,
    product: "Mango",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "OUT",
  },
  {
    id: 10,
    product: "Water",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "OUT",
  },
  {
    id: 11,
    product: "Water",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "OUT",
  },
  {
    id: 12,
    product: "Bannana",
    productType: "Fruite",
    currentStock: "55",
    quantity: "45",
    remark: "sley",
    date: "22/64/2033",
    status: "IN",
  },
];

const HomeScreen = ({ route }) => {
  const { params } = route;
  const inputValues = params?.inputValues || [];
  console.log(inputValues);
  const navigation = useNavigation();
  const [bottomsheet, setButtomsheet] = useState(false);
  const [productDataValue, setProductDataValue] = useState(inputValues);

  const togoleButtomSheet = () => {
    setButtomsheet(!bottomsheet);
  };

  const AddNewTansact = () => {
    navigation.navigate("AddNewTransact");
  };

  const SettingScreen = () => {
    navigation.navigate("Setting");
  };

  return (
    <View>
      <View style={styles.top}>
        <View
          style={{
            marginTop: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={SettingScreen}
            style={{ flexDirection: "row" }}
          >
            <Feather name="settings" size={30} color="#fff" />
            <CustomText
              style={{
                color: "#fff",
                left: 10,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              DASHBOARD
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity onPress={AddNewTansact}>
            <Feather name="more-vertical" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <CustomCard mx={7} style={{ top: -30 }}>
        <View style={styles.flexContainer}>
          <View style={styles.piechatee}>
            <PieChart
              data={[
                {
                  key: "Second Data",
                  count: 25,
                  color: "yellow",
                },
                {
                  key: "Third Data",
                  count: 40,
                  color: "#70ff7e",
                },
                {
                  key: "Forth Data",
                  count: 35,
                  color: "#70ff7e",
                },
              ]}
              length={100}
            />
          </View>

          <View style={styles.leftButtonContainer}>
            <View style={styles.pieChate}>
              <View style={styles.buttonIn}></View>
              <CustomText style={{ left: 5, top: 4 }}>100 Out</CustomText>
            </View>

            <View style={styles.pieChate}>
              <View style={styles.buttonout}></View>
              <CustomText style={{ left: 5, top: 15 }}>630 In</CustomText>
            </View>

            <View style={styles.pieChate}>
              <View style={styles.buttonInHand}></View>
              <CustomText style={{ left: 5, top: 15 }}>530 In-Hand</CustomText>
            </View>
          </View>
        </View>
      </CustomCard>
      <View style={{ top: -15 }}>
        <CustomText style={{ textAlign: "center" }}>
          list of 10 last Transaction
        </CustomText>
      </View>

      <FlatList
        data={ProductData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetail", { item })}
          >
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
              <View style={styles.transctContainer}>
                <View style={{ left: 40 }}>
                  <CustomText style={{ fontWeight: "bold", left: 10 }}>
                    {item.currentStock}
                  </CustomText>
                  <CustomText style={{ fontWeight: "bold" }}>
                    {item.product}
                  </CustomText>
                </View>
                <View>
                  <CustomText>{item.date}</CustomText>
                </View>
              </View>
              <View
                style={[
                  styles.taranctIn,
                  item.status === "IN" ? { backgroundColor: "red" } : null,
                ]}
              >
                <CustomText style={{ color: "#fff" }}>{item.status}</CustomText>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 200 }} // Add spacing at the bottom
        keyboardShouldPersistTaps="always" // Ensure list items remain visible when keyboard is open
      />

      {/* <BottomSheet
        visible={bottomsheet}
        onBackButtonPress={togoleButtomSheet}
        onBackdropPress={togoleButtomSheet}
      >
        <View style={styles.buttomSheetContainer}>
          <View style={styles.addButtonSheet}>
            <CustomText style={styles.texTtransact}>Add Transaction</CustomText>
          </View>

          <View style={{}}>
            <CustomButton
              mt={20}
              width={400}
              height={200}
              title={"Product In"}
              titleSize={30}
              bg={"#fff"}
              bc={"black"}
              bw={1}
              onPress={AddNewTansact}
            />
            <CustomButton
              width={400}
              height={200}
              mt={20}
              title={"Product Out"}
              titleSize={30}
              bg={"#fff"}
              bc={"black"}
              bw={1}
            />
          </View>
        </View>
      </BottomSheet> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  top: {
    height: 150,
    backgroundColor: COLORS.green,
  },
  pieChate: {
    flexDirection: "row",
  },
  buttonIn: {
    height: 30,
    width: 30,
    backgroundColor: "#70ff7e",
    borderRadius: 6,
  },

  buttonout: {
    height: 30,
    width: 30,
    backgroundColor: "red",
    borderRadius: 6,
    marginTop: 10,
  },
  buttonInHand: {
    height: 30,
    width: 30,
    backgroundColor: "yellow",
    borderRadius: 6,
    marginTop: 10,
  },
  flexContainer: {
    flexDirection: "row",
  },
  leftButtonContainer: {
    left: 20,
  },
  transctContainer: {
    width: "100%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transctContainerIn: {
    width: "100%",
    height: "45%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taranctIn: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    position: "absolute",
    left: -10,
    top: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  buttomSheetContainer: {
    backgroundColor: "#fff",
    height: "40%",

    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  addButtonSheet: {
    backgroundColor: COLORS.green,
    width: "100%",
    height: 100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
  },
  texTtransact: {
    marginTop: 20,
    fontSize: 30,
    color: "#fff",
  },

  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#70ff7e",
  },
});
