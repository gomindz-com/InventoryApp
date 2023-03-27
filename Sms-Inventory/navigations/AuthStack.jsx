import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen component={OnboardingScreen} name="Onboarding" /> */}
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={AppStack} name="Main" />

      <Stack.Screen component={RegisterScreen} name="Register" />
    </Stack.Navigator>
  );
};

export default AuthStack;