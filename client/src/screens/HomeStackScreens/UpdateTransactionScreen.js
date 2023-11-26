import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Config from "../../constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UpdateTransactionScreen = () => {
  const UPDATE_TRANSACTION_URL = `${Config.API_URL}/transactions/`;
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
        UpdateTransactionScreen is under constructing..
        </Text>
      </View>
    </View>
  );
};

export default UpdateTransactionScreen;
