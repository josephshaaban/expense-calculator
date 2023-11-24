import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { DarkTheme } from "@react-navigation/native";
import Colors from "../constants/Colors";
import ProfileScreen from "../screens/navScreens/ProfileScreen";

const BottomTabs = createMaterialBottomTabNavigator();

function BottomNavigator() {
  return (
    <BottomTabs.Navigator
      initialRouteName="ChartsScreen"
      activeColor={Colors.BLUE}
      inactiveColor={Colors.DARK_GRAY}
      barStyle={{ backgroundColor: "black" }}
      labeled={false}
      shifting={false}
      theme={DarkTheme}
    >
      <BottomTabs.Screen
        name="ChartsScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-box" color={color} size={26} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default BottomNavigator;
