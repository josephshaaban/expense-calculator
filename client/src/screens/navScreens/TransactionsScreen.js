import { Picker } from "@react-native-picker/picker";
import { DarkTheme, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import TransactionItem from "../../components/TransactionItem";
import NoResults from "../../components/NoResults";
import Config from "../../constants/Config";
import { Searchbar } from "react-native-paper";
import TypeCategoryPicker from "../../components/typeCategoryPicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const TransactionsScreen = () => {
  const GET_TRANSACTIONS_URL = `${Config.API_URL}/transactions/`;
  const SEARCH_TRANSACTIONS_URL = `${Config.API_URL}/transactions/search`;
  const isFocused = useIsFocused();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const fetchTransactions = async (query) => {
    let url = query
      ? `${SEARCH_TRANSACTIONS_URL}/${query}`
      : GET_TRANSACTIONS_URL;
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      setLoading(true);
      await axios
        .get(url, {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        })
        .then((response) => {
          var json = response.data.data;
          setTransactions([...json.reverse()]);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
            Alert.alert(
              `Error! ${err.response.status}`,
              err.response?.data.message
            );
          } else if (err.request) {
            console.log(err.request);
          }

          setTransactions([]);
          return false;
        });
      return true;
    } catch (e) {
      Alert.alert(
        "Error!",
        "Cannot load transactions! Please check your internet connection"
      );
      return false;
    } finally {
      setRefresh(false);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setType("");
    setCategory("");
    setRefresh(true);
    fetchTransactions(searchQuery);
  };

  useEffect(() => {
    isFocused && fetchTransactions(searchQuery);
  }, [isFocused, searchQuery]);

  const getFilteredTransactions = () => {
    if (type !== "" && category == "")
      return transactions.filter((item) => item.transactionType === type);
    if (type !== "" && category !== "")
      return transactions.filter(
        (item) => item.transactionType === type && item.category === category
      );
    return transactions;
  };

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
          Transactions
        </Text>
      </View>
      <View style={{ height: 15 }} />

      <Searchbar
        placeholderTextColor={Colors.DARK_GRAY}
        textColor={Colors.WHITISH}
        mode="view"
        style={styles.search}
        inputStyle={{ color: Colors.WHITISH }}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <View style={{ height: 20 }} />

      <TypeCategoryPicker
        setTypeCallback={setType}
        setCategoryCallback={setCategory}
      />
      <View style={styles.innerMargin} />
      <View style={styles.innerMargin} />
      <View style={{ flex: 0.9 }}>
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
            data={getFilteredTransactions()}
            keyExtractor={({ _id }) => _id}
            refreshing={refresh}
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={NoResults}
            initialNumToRender={20}
            removeClippedSubviews={false}
            renderItem={({ item }) => <TransactionItem item={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default TransactionsScreen;

const styles = StyleSheet.create({
  innerMargin: {
    height: 20,
  },
  search: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: Colors.DARK,
    color: Colors.WHITISH,
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: Colors.DARK,
    color: Colors.WHITISH,
  },
  pickerItem: {
    backgroundColor: Colors.DARK,
    color: Colors.WHITISH,
  },
});
