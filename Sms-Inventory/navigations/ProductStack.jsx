import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ProductScreen from "../screens/products";
import { COLORS } from "../constants/Theme";
import AdProductScreen from "../screens/products/AdProductScreen";
// import ProductDetails from "../screens/products/Productdetails";
import NewTransactions from "../screens/lowStock/NewTransactions";
import ProductDetailsScreen from "../screens/products/ProductDetailsScr";
const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.green} style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="addProduct" component={AdProductScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="NewTransactions" component={NewTransactions} />
      </Stack.Navigator>
    </>
  );
};

export default ProductStack;