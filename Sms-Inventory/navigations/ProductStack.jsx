import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ProductScreen from "../screens/products";
import { COLORS } from "../constants/Theme";
import Addproduct from "../screens/products/addProduct";

const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.green} style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="add" component={Addproduct} />
      </Stack.Navigator>
    </>
  );
};

export default ProductStack;
