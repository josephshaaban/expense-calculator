import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Config from "../constants/Config";
import Colors from "../constants/Colors";

const TransactionItem = (props) => {
  const { item } = props;
  const { _id, name, notes, amount, transactionType, category, timestamp } =
    item;
  const navigation = useNavigation();

  const iso = new Date(timestamp);
  const ist = iso.toLocaleDateString();

  const getCategoryImageSource = (category) => {
    return category === "Food"
      ? require("../../assets/food.png")
      : category === "Transportation"
      ? require("../../assets/transportation.png")
      : category === "Entertainment"
      ? require("../../assets/entertainment.png")
      : category === "Bills"
      ? require("../../assets/bills.png")
      : category === "Salary"
      ? require("../../assets/salary.png")
      : require("../../assets/miscellaneous.png");
  };

  const deleteTransaction = async () => {
    await axios
      .delete(`${Config.API_URL}/${_id}`)
      .then(() =>
        Platform.OS == "android"
          ? ToastAndroid.show(
              "Transaction deleted!",
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM
            )
          : Platform.OS == "ios"
          ? Alert.alert("Success!", "Transaction deleted")
          : null
      )
      .catch(() => Alert.alert("Error!", "Cannot delete transaction"));
  };

  const deleteAlert = () => {
    Alert.alert(
      "Confirmation",
      "Do you want to delete this transaction?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => deleteTransaction(),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => deleteAlert()}
      onPress={() =>
        requestAnimationFrame(() => {
          navigation.navigate("UpdateTransactionScreen", {
            _id: _id,
            name: name,
            notes: notes,
            amount: amount,
            transactionType: transactionType,
            category: category,
          });
        })
      }
    >
      <View style={{ flex: 0.2 }}>
        <Image
          style={{ height: 45, width: 45, marginLeft: 4 }}
          source={getCategoryImageSource(category)}
          defaultSource={require("../../assets/miscellaneous.png")} // Uncategorized
        />
      </View>
      <View style={{ flex: 0.6 }}>
        <Text
          style={{ color: "white", fontSize: 18 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        <Text
          style={{ color: Colors.DARK_GRAY, fontSize: 14, marginTop: 6 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {ist}
        </Text>
      </View>
      <View style={{ flex: 0.2, alignItems: "flex-end" }}>
        <Text
          style={{
            color:
              transactionType === "Income"
                ? Colors.NIGHT_GREEN
                : Colors.NIGHT_RED,
            fontSize: 18,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          ${amount.toString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: Colors.DARK,
    marginBottom: 16,
    alignItems: "center",
    elevation: 4,
  },
});
