import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { STYLES, COLORS } from "../constants/Theme";
import { AuthContext } from "../context/AuthContext";

const Searchbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity style={styles.circle} onPress={logout}>
          <Ionicons name="person" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TextInput placeholder="What can we get you?" style={styles.input} />
        <TouchableOpacity style={styles.square}>
          <Ionicons name="search-outline" size={30} color={COLORS.brown} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: { flex: 1 },
  right: {
    flex: 4,
    backgroundColor: COLORS.brown,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 10,
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.brown,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    backgroundColor: "#fff",
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 17,
    paddingHorizontal: 5,
  },
});
