import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import CustomCard from "../../components/CustomCard";
import { COLORS } from "../../constants/Theme";
import { Feather } from "@expo/vector-icons";
import CustomText from "../../components/CustomText";
import PieChart from "react-native-expo-pie-chart";

const HomeScreen = () => {
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
          <TouchableOpacity style={{ flexDirection: "row" }}>
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

          <TouchableOpacity>
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
                  color: "red",
                },
                {
                  key: "Forth Data",
                  count: 35,
                  color: "orange",
                },
              ]}
              length={100}
            />
          </View>
          {/* ButtonContainer */}

          <View style={styles.leftButtonContainer}>
            <View style={styles.pieChate}>
              <View style={styles.buttonIn}></View>
              <CustomText style={{ left: 5, top: 4 }}>630 In</CustomText>
            </View>

            <View style={styles.pieChate}>
              <View style={styles.buttonout}></View>
              <CustomText style={{ left: 5, top: 15 }}>630 In</CustomText>
            </View>

            <View style={styles.pieChate}>
              <View style={styles.buttonInHand}></View>
              <CustomText style={{ left: 5, top: 15 }}>630 In</CustomText>
            </View>
          </View>
        </View>
      </CustomCard>
      <View style={{ top: -15 }}>
        <CustomText style={{ textAlign: "center" }}>
          list of 10 last Transaction
        </CustomText>
      </View>

      {/* Transactions */}

      <View>
        <View style={{ marginHorizontal: 15 }}>
          <View style={styles.transctContainer}>
            <View style={{ left: 40 }}>
              <CustomText style={{ fontWeight: "bold", left: 10 }}>
                70
              </CustomText>
              <CustomText style={{ fontWeight: "bold" }}>Ice Cream</CustomText>
            </View>

            <View>
              <CustomText>03/06/2023</CustomText>
            </View>
          </View>
          <View style={styles.taranctIn}>
            <CustomText style={{ color: "#fff" }}>OUT</CustomText>
          </View>
        </View>

        <View style={{ top: -115 }}>
          <View style={{ marginHorizontal: 15 }}>
            <View style={styles.transctContainerIn}>
              <View style={{ left: 40 }}>
                <CustomText style={{ fontWeight: "bold", left: 10 }}>
                  70
                </CustomText>
                <CustomText style={{ fontWeight: "bold" }}>
                  Ice Cream
                </CustomText>
              </View>

              <View>
                <CustomText>03/06/2023</CustomText>
              </View>
            </View>
            <View style={styles.taranctout}>
              <CustomText style={{ color: "#fff" }}>IN</CustomText>
            </View>
          </View>
        </View>
      </View>
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
    backgroundColor: "yellow",
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
    backgroundColor: "orange",
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
    height: "30%",
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
  taranctout: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: "red",
    position: "absolute",
    left: -10,
    top: 7,
    alignItems: "center",
    justifyContent: "center",
  },
});
