import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";

import AuthNavigator from "./src/navigators/AuthNavigator";

export default function App() {
  const currentUser = false;
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      {currentUser ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
