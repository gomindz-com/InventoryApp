import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../constants/Theme";
import { userDetails } from "../screens/apiService/authenticationApi";

const HeaderCom = ({ avatarAbbr, fullName, address, title }) => {
  const [userDetails, setUserDetails] = useState({});

  //   useEffect(() => {
  //     const userInfor = async () => {
  //       try {
  //         const response = await userDetails();
  //         console.log("Hello", response);

  //         // if (response.data.status) {
  //         //   setUserDetails(response.data.user);
  //         // } else {
  //         //   console.error("API returned false status:", response.data.message);
  //         // }
  //       } catch (error) {
  //         console.error("Error fetching product data:", error);
  //       }
  //     };

  //     userInfor();
  //   }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerUser}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SK</Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.fullName}>
            <Text style={{ color: "black" }}>Hello </Text>{" "}
            <Text style={{ color: "yellow" }}>Sundiata</Text>
          </Text>
          <Text style={styles.address}>Kanifing Layout</Text>
        </View>
      </View>
      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.headerBell}>
        <FontAwesome5 name="bell" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: COLORS.green,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    height: 150,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  headerUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#dddddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  userDetails: {
    justifyContent: "center",
  },
  fullName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "yellow",
  },
  address: {
    fontSize: 14,
    color: "#fff",
  },
  headerBell: {
    paddingHorizontal: 10,
  },
});

export default HeaderCom;
