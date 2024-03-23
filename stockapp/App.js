import { StyleSheet, Text, View, StatusBar } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import AppNav from "./navigations/AppNav";

export default function App() {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </>
  );
}
