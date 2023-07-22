import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPassword from "../screens/auth/ForgotPassword";
import ResetPassword  from "../screens/auth/Resetpassword";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen component={OnboardingScreen} name="Onboarding" /> */}
      <Stack.Screen component={SplashScreen} name="Splash" />
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={AppStack} name="Main" />
      <Stack.Screen component={RegisterScreen} name="Register" />
      <Stack.Screen component={ForgotPassword} name="Forgot" />
      <Stack.Screen component={ResetPassword} name="Reset" />
    </Stack.Navigator>
  );
};

export default AuthStack;
