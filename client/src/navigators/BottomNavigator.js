import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import ChartsScreen from "../screens/navScreens/ChartsScreen";
import HomeScreen from "../screens/navScreens/HomeScreen";
import ProfileScreen from "../screens/navScreens/ProfileScreen";
import UpdateTransactionScreen from "../screens/HomeStackScreens/UpdateTransactionScreen";
import AddTransactionScreen from "../screens/HomeStackScreens/AddTransactionScreen";
import TransactionsScreen from "../screens/navScreens/TransactionsScreen";

const Stack = createStackNavigator();
const BottomTabs = createMaterialBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTransactionScreen"
        component={AddTransactionScreen}
        options={{
          headerShown: true,
          headerTitle: "Add Transaction",
          headerStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name="UpdateTransactionScreen"
        component={UpdateTransactionScreen}
        options={{
          headerShown: true,
          headerTitle: "Update Transaction",
          headerStyle: { backgroundColor: "black" },
        }}
      />
    </Stack.Navigator>
  );
}

function TransactionStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="TransactionsScreen">
      <Stack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateTransactionScreen"
        component={UpdateTransactionScreen}
        options={{
          headerShown: true,
          headerTitle: "Update Transaction",
          headerStyle: { backgroundColor: "black" },
        }}
      />
    </Stack.Navigator>
  );
}

function BottomNavigator() {
  return (
    <BottomTabs.Navigator
      initialRouteName="HomeScreen"
      activeColor={Colors.BLUE}
      inactiveColor={Colors.DARK_GRAY}
      barStyle={{ backgroundColor: "black" }}
      labeled={false}
      shifting={false}
      theme={DarkTheme}
    >
      <BottomTabs.Screen
        name="HomeStackNavigator"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={26} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="TransactionStackNavigator"
        component={TransactionStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ChartsScreen"
        component={ChartsScreen}
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
