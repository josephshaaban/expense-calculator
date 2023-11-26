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
    setType("");
    setCategory("");
    setRefresh(true);
    fetchTransactions();
  };

  useEffect(() => {
    isFocused && fetchTransactions(searchQuery);
  }, [isFocused, searchQuery]);

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const incomePickerItems = [
    "Salary",
    "Allowance",
    "Commission",
    "Gifts",
    "Interests",
    "Investments",
    "Selling",
    "Uncategorized",
  ];
  const expensePickerItems = [
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Utilities",
    "Health",
    "Travel",
    "Education",
    "Personal",
    "Groceries",
    "Bills",
    "Uncategorized",
  ];

  const getFilteredTransactions = () => {
    console.log(type !== "" && category !== "", category);
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

      <Picker
        style={styles.picker}
        mode="dropdown"
        dropdownIconColor={Colors.DARK_GRAY}
        selectedValue={type}
        onValueChange={(val) => setType(val)}
      >
        <Picker.Item
          label="Select Type"
          value=""
          style={{ backgroundColor: Colors.DARK, color: Colors.DARK_GRAY }}
        />
        <Picker.Item label="Income" value="Income" style={styles.pickerItem} />
        <Picker.Item
          label="Expense"
          value="Expense"
          style={styles.pickerItem}
        />
      </Picker>
      <View style={styles.innerMargin} />
      {type == "Income" ? (
        <Picker
          style={styles.picker}
          mode="dropdown"
          dropdownIconColor={Colors.DARK_GRAY}
          selectedValue={category}
          onValueChange={(val) => setCategory(val)}
        >
          <Picker.Item
            label="Select Income Category"
            value=""
            style={{ backgroundColor: Colors.DARK, color: Colors.DARK_GRAY }}
          />
          {incomePickerItems.map((item, index) => {
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
      ) : type == "Expense" ? (
        <Picker
          style={styles.picker}
          mode="dropdown"
          dropdownIconColor={Colors.DARK_GRAY}
          selectedValue={category}
          onValueChange={(val) => setCategory(val)}
        >
          <Picker.Item
            label="Select Expense Category"
            value="category"
            style={{ backgroundColor: Colors.DARK, color: Colors.DARK_GRAY }}
          />
          {expensePickerItems.map((item, index) => {
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
      ) : null}
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
