import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ProductScreen from "../screens/products";
import { COLORS } from "../constants/Theme";
import AddProductScreen from "../screens/products/AddProductScreen";
const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.green} style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
      </Stack.Navigator>
    </>
  );
};

export default ProductStack;
