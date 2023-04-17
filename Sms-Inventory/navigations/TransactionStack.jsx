import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import TransactionScreen from "../screens/transaction/transaction";
import { COLORS } from "../constants/Theme";


const Stack = createNativeStackNavigator();

const TransactionStack = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.green} style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Transaction" component={TransactionScreen} />
      </Stack.Navigator>
    </>
  );
};

export default TransactionStack;
