import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "../screens/dashboard/HomeScreen";
import { COLORS } from "../constants/Theme";
import SettingScreen from "../screens/dashboard/SettingScreen";
import DeatailScreen from "../screens/dashboard/DeatailScreen";
import AddNewTransact from "../screens/dashboard/AddNewTransact";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.green} style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="ProductDetail" component={DeatailScreen} />
        <Stack.Screen name="AddNewTransact" component={AddNewTransact} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
