import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AppStateContext } from "../../../AppStateContext";
import Colors from "../../constants/Colors";
import Config from "../../constants/Config";

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { currentUser } = useContext(AppStateContext);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [transactions, setTransactions] = useState();

  const fetchUserTransactions = async () => {
    setTransactions([1, 2]);
    setRefresh(false);
    // try {
    //   await AsyncStorage.getItem("userId")
    //     .then(async (userId) => {
    //       await axios
    //         .get(`${Config.API_URL}/transactions/${userId}`)
    //         .then((response) => {
    //           console.log(response.data);
    //           setTransactions([1, 2]);
    //         })
    //         .catch((e) => {
    //           Alert.alert("", "Error!");
    //         });
    //     })
    //     .catch((e) => {
    //       Alert.alert("", "Error!");
    //     });
    // } catch (err) {
    //   Alert.alert("Error!", "Cannot load profile details");
    // } finally {
    //   setRefresh(false);
    // }
  };

  const onRefresh = () => {
    setRefresh(true);
    fetchUserTransactions();
  };

  useEffect(() => {
    isFocused && fetchUserTransactions();
  }, [isFocused]);

  const logout = async () => {
    setLoading(true);
    const keys = ["user", "userId"];
    try {
      await AsyncStorage.multiRemove(keys).then(async () => {
        navigation.reset({
          index: 0,
          routes: [{ name: "AuthNavigator" }],
        });
        return true;
      });
    } catch (err) {
      Alert.alert("Error!", "");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logoutAlert = () => {
    Alert.alert(
      "Confirmation",
      "Do you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => logout(),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flex: 0.075,
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text style={{ color: "white", fontSize: 30, fontWeight: "700" }}>
          My Profile
        </Text>
        <TouchableOpacity
          disabled={loading ? true : false}
          onPress={() => logoutAlert()}
        >
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={styles.btnText}>Logout</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={{ height: 10 }} />
      <ScrollView
        style={{ flex: 0.925 }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={Colors.DARK_GRAY}
            />
            <Text style={{ fontSize: 17, marginStart: 10, color: "white" }}>
              {currentUser ? currentUser.fullname : "loading..."}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <MaterialCommunityIcons
              name="email"
              size={24}
              color={Colors.DARK_GRAY}
            />
            <Text style={{ fontSize: 17, marginStart: 10, color: "white" }}>
              {currentUser ? currentUser.email : "loading..."}
            </Text>
          </View>
        </View>
        <View style={{ height: 15 }} />
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="format-list-bulleted"
              size={24}
              color={Colors.DARK_GRAY}
            />
            <Text style={{ fontSize: 17, marginStart: 10, color: "white" }}>
              {transactions
                ? transactions.length.toString() + " Transactions"
                : "loading..."}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: Colors.DARK,
    padding: 10,
    borderRadius: 4,
    elevation: 4,
  },
  btnText: {
    alignSelf: "flex-end",
    color: Colors.NIGHT_RED,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 4,
  },
});
