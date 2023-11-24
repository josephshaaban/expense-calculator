import { Text, View } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
          ProfileScreen..
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
