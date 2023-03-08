import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import AppStack from "./AppStack";
import navigationTheme from "./navigationTheme";

const AppNav = () => {
  return (
    <>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar backgroundColor={"green"} style="light" />
        <AppStack />
      </NavigationContainer>
    </>
  );
};

export default AppNav;
