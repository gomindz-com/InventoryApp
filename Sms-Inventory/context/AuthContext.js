import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
    setIsLoading(true);
    setUserToken("touydv2772vc7w6");
    AsyncStorage.setItem("userToken", "touydv2772vc7w6");
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      let token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
    } catch (error) {
      console.log("IsLoggedIn Error: " + error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userToken, isLoading, login, logout, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
