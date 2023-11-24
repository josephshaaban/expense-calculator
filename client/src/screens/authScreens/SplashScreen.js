import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {

  const navigation = useNavigation()

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 0.75, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          style={{ width: 300, height: 300 }}
          source={require("../../../assets/budget-calculator.png")}
        />
      </View>
      <View
        style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
          EXPENSE CALCULATOR
        </Text>
        <TouchableOpacity
          style={styles.btnStarted}
          onPress={() =>
            requestAnimationFrame(() => {
              navigation.navigate("RegisterScreen");
            })
          }
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "white",
              marginRight: 8,
            }}
          >
            Get Started
          </Text>
          <AntDesign name="arrowright" color={"white"} size={17} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  btnStarted: {
    height: 55,
    width: "90%",
    backgroundColor: Colors.BLUE,
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flexDirection: "row",
  },
});
