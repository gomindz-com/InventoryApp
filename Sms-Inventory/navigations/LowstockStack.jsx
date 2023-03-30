import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Lowstock from "../screens/lowStock/Lowstock";
import { COLORS } from "../constants/Theme";


const Stack = createNativeStackNavigator();

const LowstockStack = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.green} style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Low Stock" component={Lowstock} />
      </Stack.Navigator>
    </>
  );
};

export default LowstockStack;
