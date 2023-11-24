import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/authScreens/SplashScreen";
import LoginScreen from "../screens/authScreens/LoginScreen";
import RegisterScreen from "../screens/authScreens/RegisterScreen";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerTitle: "", headerStyle: { backgroundColor: "black" } }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "", headerStyle: { backgroundColor: "black" } }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
