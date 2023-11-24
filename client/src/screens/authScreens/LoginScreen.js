import { View, Text } from "react-native";

const LoginScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
          LoginScreen..
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
