import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/signUpLogin/LoginScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <StatusBar backgroundColor={"green"} style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
