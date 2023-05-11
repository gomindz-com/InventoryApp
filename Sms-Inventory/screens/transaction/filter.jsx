import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import CustomCard from "../../components/CustomCard";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../components/CustomText";
import { COLORS } from "../../constants/Theme";
import Dropdown from "../../components/Dropdown";
import ToggleSwitch from "toggle-switch-react-native";

const days = [
  { id: 1, name: "Today:" },
  { id: 2, name: "Yesterday:" },
  { id: 3, name: "Last Week:" },
  { id: 4, name: "This Month:" },
];

const FilterScreen = () => {
  const navigation = useNavigation();

  const transaction = () => {
    navigation.navigate("Transaction");
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const onSelect = (item) => {
    setSelectedItem(item);
  };

  
  const [isOn, setIsOn] = useState(false);

    const handleToggle = (isOn) => {
      setIsOn(isOn);
    };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.flexContainer}>
          <View style={styles.left}>
            <TouchableOpacity onPress={transaction}>
              <AntDesign mx={50} name="left" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <CustomText
              mx={40}
              fontSize={25}
              alignSelf={"center"}
              color={"#fff"}
              fw={"bold"}
            >
              FILTER
            </CustomText>
          </View>

          <View style={styles.right}>
            <TouchableOpacity style={{ right: 10 }}>
              <MaterialIcons name="done" size={30} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={{ left: 5 }}>
              <FontAwesome name="refresh" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <CustomCard bc={"black"} mt={80} mx={10}>
            <CustomText style={{fontSize:15}}>Quick Access </CustomText>
          </CustomCard>

          <Dropdown value={selectedItem} data={days} onSelect={onSelect} />
        </View>

        <View>
          <CustomCard bc={"black"} mx={10} style={styles.filterDates}>
            <View>
              <Text style={{ marginBottom: 20, marginTop: 10, fontSize: 15}}>Between Dates:</Text>
              <Text style={{fontSize: 15}}>Apply filters between 2 dates</Text>
            </View>
            <View style={{ justifyContent: "center" }}>
              <ToggleSwitch
              isOn={isOn}
                onColor="green"
                offColor="red"
                labelStyle={{ color: "black", fontWeight: "100" }}
                size="small"
                onToggle={handleToggle}
              />
            </View>
          </CustomCard>
        </View>

        <View style={styles.transac}>
          <Text style={{fontSize: 12, justifyContent: "center", fontWeight: "normal"}}> Transaction Type</Text>
        </View>

        <View style={styles.transacType}>
          <TouchableOpacity style={styles.button1}>
            <Text style={styles.buttonText}>ALL</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button2}>
            <Text style={styles.buttonText}>IN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button3}>
            <Text style={styles.buttonText}>OUT</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {},

  top: {
    height: 150,
    backgroundColor: COLORS.green,
  },

  flexContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    top: 50,
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    marginTop: 8,
  },

  header: {
    alignSelf: "center",
    left: 30,
  },

  right: {
    flexDirection: "row",
    marginHorizontal: 20,
  },

  filterDates: {
    padding: 8,
    justifyContent: "space-between",
    marginBottom: 0,
    flexDirection: "row",
  },

  transac: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 2,
    height: 20,
    alignItems: "center",
    marginBottom: 0,
    marginTop: 40,
    marginHorizontal: 10,
    backgroundColor: "white"
  },

  transacType: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    borderColor: "transparent"
  },

  button1: {
    width: 115,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  button2: {
    width: 180,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  button3: {
    width: 115,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  }

});
