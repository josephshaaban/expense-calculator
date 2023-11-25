import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import NoResults from "../../components/NoResults";
import TransactionItem from "../../components/TransactionItem";
import Colors from "../../constants/Colors";

const HomeScreen = () => {
  const focused = useIsFocused();
  const navigation = useNavigation();

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchBalance = async () => {
    setBalance(777);
    setRefresh(false);
    setBalanceLoading(false);
    // const userId = await AsyncStorage.getItem("userId");
    // try {
    //   setBalanceLoading(true);
    //   await axios
    //     .get(`${Config.API_URL}/user/${userId}/balance`)
    //     .then((response) => {
    //       setBalance(response.data.balance);
    //     });
    //   return true;
    // } catch (e) {
    //   Alert.alert("Error!", "Cannot fetch balance");
    //   return false;
    // } finally {
    //   setRefresh(false);
    //   setBalanceLoading(false);
    // }
  };

  const fetchTransactions = async () => {
    setTransactions([
      {
        _id: 1,
        amount: 14,
        transactionType: "Expenses",
        name: "Hashtag lunch",
        category: "Food",
        notes: "Yummy",
        timestamp: 1700916040,
      },
      {
        _id: 2,
        amount: 28,
        transactionType: "Income",
        name: "CodeGuru first salary",
        category: "Salary",
        notes: "Wow, good job! good salary!",
        timestamp: 1700916040,
      },
    ]);
    setRefresh(false);
    setLoading(false);
    // const userId = await AsyncStorage.getItem("userId");
    // try {
    //   setLoading(true);
    //   await axios
    //     .get(`${Config.API_URL}/user/${userId}`)
    //     .then((response) => {
    //       var json = response.data.transactions.transactions;
    //       setTransactions([...json.reverse()]);
    //     });
    //   return true;
    // } catch (e) {
    //   Alert.alert(
    //     "Error!",
    //     "Cannot load transactions! Please check your internet connection"
    //   );
    //   return false;
    // } finally {
    //   setRefresh(false);
    //   setLoading(false);
    // }
  };

  const onRefresh = () => {
    setRefresh(true);
    fetchTransactions();
    fetchBalance();
  };

  useEffect(() => {
    focused && fetchBalance() && fetchTransactions();
  }, [focused]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10,
      }}
    >
      <View style={{ flex: 0.075, justifyContent: "center" }}>
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "700",
            paddingRight: 20,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Home
        </Text>
      </View>
      <View style={{ flex: 0.3, justifyContent: "center" }}>
        <TouchableOpacity style={{ elevation: 8 }}>
          <LinearGradient
            style={styles.card}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#0082c8", "#007AFF", "#007AFF", "#0082c8"]}
          >
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={require("../../../assets/chip.png")}
                />
              </View>
              <View style={{ paddingBottom: 10 }}>
                {balanceLoading ? (
                  <ProgressBar indeterminate color={"coral"} />
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Colors.WHITISH,
                        marginBottom: 4,
                      }}
                    >
                      MY BALANCE
                    </Text>
                    <Text
                      style={{
                        fontSize: 28,
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      ${Math.round((balance + Number.EPSILON) * 100) / 100}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 17, color: Colors.WHITISH }}>
          Recent Transactions
        </Text>
      </View>
      <View style={{ flex: 0.625, marginTop: 15, minHeight: 2 }}>
        {loading ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <LottieView
              style={{ width: 100, height: 100 }}
              source={require("../../../assets/loading.json")}
              autoPlay
              loop
            />
          </View>
        ) : (
          <FlatList
            data={transactions.slice(0, 10)}
            keyExtractor={({ _id }) => _id}
            refreshing={refresh}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={NoResults}
            renderItem={({ item }) => <TransactionItem item={item} />}
          />
        )}
        <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            requestAnimationFrame(() => {
              navigation.navigate("AddTransactionScreen");
            })
          }
        >
          <Feather name="plus" size={26} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  card: {
    height: "95%",
    backgroundColor: "black",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  fab: {
    alignItems: "center",
    justifyContent: "center",
    width: 63,
    height: 63,
    position: "absolute",
    bottom: 40,
    right: 28,
    backgroundColor: Colors.BLUE,
    borderRadius: 100,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
});
