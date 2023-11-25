import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { AppStateContext } from "./AppStateContext";
import AuthNavigator from "./src/navigators/AuthNavigator";
import MainNavigator from "./src/navigators/MainNavigator";
import { deleteAllData } from "./developmentHelpers";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useState("");

  const fetchCurrentUser = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const token = await AsyncStorage.getItem("userToken");
      if (user && token) {
        setCurrentUser(user);
        setUserToken(token);
      }
    } catch (err) {
      Alert.alert("Error!", err.message);
    }
  };

  // deleteAllData();

  useEffect(() => {
    fetchCurrentUser();
  }, [userToken, currentUser]);

  return (
    <AppStateContext.Provider
      value={{ currentUser, userToken, setCurrentUser, setUserToken }}
    >
      <NavigationContainer theme={DarkTheme}>
        <StatusBar style="light" />
        {(currentUser && userToken) ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AppStateContext.Provider>
  );
}
