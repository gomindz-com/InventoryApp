import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Lowstock from "../screens/lowStock/Lowstock";
import NewTransactionScreen from "../screens/lowStock/NewTransactionScreen";
const Stack = createNativeStackNavigator();

const LowstockStack = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.green} style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LowStock" component={Lowstock} />
        <Stack.Screen name="NewTransactionScreen" component={NewTransactionScreen} />
      </Stack.Navigator>
    </>
  );
};

export default LowstockStack;
