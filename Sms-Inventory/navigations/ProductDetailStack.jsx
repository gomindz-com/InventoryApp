import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ProductDetails from "../screens/products/Productdetails";
import { COLORS } from "../constants/Theme";


const Stack = createNativeStackNavigator();

const ProductDetails = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.green} style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </>
  );
};

export default ProductDetails;
