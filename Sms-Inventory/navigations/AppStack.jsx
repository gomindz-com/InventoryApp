import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";

import HomeScreen from "../screens/dashboard/HomeScreen";

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
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
          component={HomeScreen}
          options={{
            tabBarLabel: "Dashbord",
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="find" size={size} color="green" />
            ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={HomeScreen}
          options={{
            tabBarLabel: "Products",
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="headset" size={size} color={"green"} />
            ),
          }}
        />
        <Tab.Screen
          name="Low Stock"
          component={HomeScreen}
          options={{
            tabBarLabel: "Low Stock",
            tabBarIcon: ({ size, color }) => (
              <AntDesign name="linechart" size={size} color={"green"} />
            ),
          }}
        />
        <Tab.Screen
          name="All transaction"
          component={HomeScreen}
          options={{
            tabBarLabel: "All transaction",
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name="bar-chart" size={size} color="green" />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default AppStack;
