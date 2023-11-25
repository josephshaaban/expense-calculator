import { Picker } from "@react-native-picker/picker";
import { DarkTheme, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import TransactionItem from "../../components/TransactionItem";
import NoResults from "../../components/NoResults";
import Config from "../../constants/Config";
import { Searchbar } from "react-native-paper";

const TransactionsScreen = () => {
  const isFocused = useIsFocused();
  const [transactions, setTransactions] = useState([]);
  const [typeFilter, setTypeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const fetchTransactions = async (query) => {
    if (query)
      setTransactions([
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
    else
      setTransactions([
        {
          _id: 1,
          amount: 14,
          transactionType: "Expense",
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
    //     .get(`${Config.API_URL}/transactions`)
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
  };

  useEffect(() => {
    isFocused && fetchTransactions(searchQuery);
  }, [isFocused, searchQuery]);

  const pickerItems = [
    "All",
    "Transaction Type - Income",
    "Transaction Type - Expense",
    "Category - Food",
    "Category - Transportation",
    "Category - Entertainment",
    "Category - Shopping",
    "Category - Utilities",
    "Category - Health",
    "Category - Travel",
    "Category - Education",
    "Category - Personal",
    "Category - Groceries",
    "Category - Bills",
    "Category - Salary",
    "Category - Uncategorized",
  ];
  const getFilteredTransactions = () => {
    return typeFilter == "Transaction Type - Income"
      ? transactions.filter((it) => it.transactionType == "Income")
      : typeFilter == "Transaction Type - Expense"
      ? transactions.filter((it) => it.transactionType == "Expense")
      : typeFilter == "Category - Food"
      ? transactions.filter((it) => it.category == "Food")
      : typeFilter == "Category - Transportation"
      ? transactions.filter((it) => it.category == "Transportation")
      : typeFilter == "Category - Entertainment"
      ? transactions.filter((it) => it.category == "Entertainment")
      : typeFilter == "Category - Shopping"
      ? transactions.filter((it) => it.category == "Shopping")
      : typeFilter == "Category - Utilities"
      ? transactions.filter((it) => it.category == "Utilities")
      : typeFilter == "Category - Health"
      ? transactions.filter((it) => it.category == "Health")
      : typeFilter == "Category - Travel"
      ? transactions.filter((it) => it.category == "Travel")
      : typeFilter == "Category - Education"
      ? transactions.filter((it) => it.category == "Education")
      : typeFilter == "Category - Personal"
      ? transactions.filter((it) => it.category == "Personal")
      : typeFilter == "Category - Groceries"
      ? transactions.filter((it) => it.category == "Groceries")
      : typeFilter == "Category - Bills"
      ? transactions.filter((it) => it.category == "Bills")
      : typeFilter == "Category - Salary"
      ? transactions.filter((it) => it.category == "Salary")
      : typeFilter == "Category - Uncategorized"
      ? transactions.filter((it) => it.category == "Uncategorized")
      : transactions;
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

      <Picker
        style={styles.picker}
        mode="dropdown"
        dropdownIconColor={Colors.DARK_GRAY}
        selectedValue={typeFilter}
        onValueChange={(val) => setTypeFilter(val)}
      >
        {pickerItems.map((item, index) => {
          return (
            <Picker.Item
              label={item}
              value={item}
              key={index}
              style={styles.pickerItem}
            />
          );
        })}
      </Picker>
      <View style={{ height: 20 }} />
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
