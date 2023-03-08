import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";

import HomeStack from "./HomeStack";
import ProductScreen from "../screens/product/ProductScreen";
import LoginScreen from "../screens/signUpLogin/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppStack = () => {
  const [isLoginIn, setIsLogin] = useState(false);

  const handleLoing = () => {
    setIsLogin(true);
  };
  return (
    <>
      {isLoginIn ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              elevation: 20,
              alignItems: "center",
            },
            // tabBarItemStyle: { justifyContent: "center", alignItems: "center" },
            tabBarLabelStyle: {
              fontSize: 12,
            },
          }}
        >
          <Tab.Screen
            name="Dashbord"
            component={HomeStack}
            options={{
              tabBarLabel: "Dashbord",
              tabBarIcon: ({ size, color }) => (
                <AntDesign name="find" size={size} color="green" />
              ),
            }}
          />
          <Tab.Screen
            name="Products"
            component={ProductScreen}
            options={{
              tabBarLabel: "Products",
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="headset" size={size} color={"green"} />
              ),
            }}
          />
          <Tab.Screen
            name="Low Stock"
            component={HomeStack}
            options={{
              tabBarLabel: "Low Stock",
              tabBarIcon: ({ size, color }) => (
                <AntDesign name="linechart" size={size} color={"green"} />
              ),
            }}
          />
          <Tab.Screen
            name="All transaction"
            component={HomeStack}
            options={{
              tabBarLabel: "All transaction",
              tabBarIcon: ({ size, color }) => (
                <FontAwesome name="bar-chart" size={size} color="green" />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
            initialParams={{ handleLoing: handleLoing.toString() }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default AppStack;
