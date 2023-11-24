import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";

import AuthNavigator from "./src/navigators/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="auto" />
      <AuthNavigator />
    </NavigationContainer>
  );
}
