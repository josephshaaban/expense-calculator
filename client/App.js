import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";

import AuthNavigator from "./src/navigators/AuthNavigator";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainNavigator from "./src/navigators/MainNavigator";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useState("");

  const fetchCurrentUser = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("userToken");
      if (token && user) {
        setUserToken(token);
        setCurrentUser(user);
      } else {
        throw Error("No logged user!");
      }
    } catch (err) {
      Alert.alert("Error!", err.message);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [userToken, currentUser]);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      {userToken ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
