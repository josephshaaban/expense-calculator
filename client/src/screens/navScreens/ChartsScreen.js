import { StatusBar, Text, View } from "react-native";

const ChartsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flex: 0.075, justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 30, fontWeight: "700" }}>
          Insights
        </Text>
      </View>
      <View
        style={{ flex: 0.25, alignItems: "center", justifyContent: "center" }}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "700" }}>
          UNDER CONSTRUCTING..
        </Text>
      </View>
    </View>
  );
};

export default ChartsScreen;
