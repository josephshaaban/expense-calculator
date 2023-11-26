import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import TypeCategoryPicker from "../../components/typeCategoryPicker";
import Colors from "../../constants/Colors";
import Config from "../../constants/Config";

const AddTransactionScreen = () => {
  const ADD_TRANSACTION_URL = `${Config.API_URL}/transactions/`;

  const navigation = useNavigation();

  const [name, setName] = useState("new Food");
  const [amount, setAmount] = useState();
  const [note, setNote] = useState("Yummyyyyy!");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const addTransaction = async () => {
    if (name.trim() == "" || amount == null) {
      Alert.alert("Error!", "Inputs cannot be empty");
    } else if (type == "type") {
      Alert.alert("Error!", "Please select your transaction type");
    } else if (category == "category") {
      Alert.alert("Error!", "Please select your transaction category");
    } else {
      setLoading(true);
      try {
        const userToken = await AsyncStorage.getItem("userToken");

        var updatedAmount = amount;
        if (updatedAmount < 0) updatedAmount = updatedAmount * -1;

        const { data } = await axios
          .post(
            ADD_TRANSACTION_URL,
            {
              name: name.trim(),
              notes: note.trim(),
              amount: updatedAmount,
              transactionType: type,
              category: category,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${userToken}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            return res;
          })
          .catch((err) => {
            if (err.response) {
              Alert.alert(
                `Error! ${err.response.status}`,
                err.response?.data.message
              );
            } else if (err.request) {
              console.log(err.request);
            }

            return {
              data: {
                success: false,
                message: err.message,
                data: [],
                error: err,
              },
            };
          });
        if (data && data.success) {
          navigation.goBack();
          return data;
        }
        return [];
      } catch (err) {
        console.log(err);
        Alert.alert("Error!", err.response.data.message);
        return [];
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, paddingBottom: 25 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          textColor={Colors.WHITISH}
          mode="flat"
          placeholder="Label*"
          placeholderTextColor={Colors.DARK_GRAY}
          outlineColor={Colors.DARK_GRAY}
          activeUnderlineColor={Colors.BLUE}
          theme={{ colors: { text: "white" } }}
          left={
            <TextInput.Icon
              icon="label-variant"
              color={(isTextInputFocused) =>
                isTextInputFocused ? Colors.WHITISH : Colors.DARK_GRAY
              }
            />
          }
          maxLength={64}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.innerMargin} />
        <TextInput
          style={styles.textInput}
          textColor={Colors.WHITISH}
          mode="flat"
          placeholder="Amount*"
          placeholderTextColor={Colors.DARK_GRAY}
          outlineColor={Colors.DARK_GRAY}
          activeUnderlineColor={Colors.BLUE}
          theme={{ colors: { text: "white" } }}
          keyboardType="numeric"
          left={
            <TextInput.Icon
              icon="numeric"
              color={(isTextInputFocused) =>
                isTextInputFocused ? Colors.WHITISH : Colors.DARK_GRAY
              }
            />
          }
          maxLength={8}
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <View style={styles.innerMargin} />
        <TextInput
          style={[styles.textInput, { maxHeight: 180 }]}
          textColor={Colors.WHITISH}
          placeholder="Note"
          placeholderTextColor={Colors.DARK_GRAY}
          outlineColor={Colors.DARK_GRAY}
          activeUnderlineColor={Colors.BLUE}
          theme={{ colors: { text: "white" } }}
          multiline={true}
          numberOfLines={5}
          maxLength={128}
          mode="flat"
          left={
            <TextInput.Icon
              icon="note-edit"
              color={(isTextInputFocused) =>
                isTextInputFocused ? Colors.WHITISH : Colors.DARK_GRAY
              }
            />
          }
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <View style={styles.innerMargin} />
        <View style={styles.innerMargin} />
        <TypeCategoryPicker
          setTypeCallback={setType}
          setCategoryCallback={setCategory}
        />
        <TouchableOpacity
          style={styles.btnSave}
          onPress={() =>
            requestAnimationFrame(() => {
              addTransaction();
            })
          }
        >
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={{ fontSize: 16, fontWeight: "700", color: "white" }}>
              Save
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingVertical: 10, borderRadius: 8 },
  textInput: {
    width: "100%",
    backgroundColor: Colors.DARK,
    borderRadius: 8,
  },
  innerMargin: {
    height: 20,
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: Colors.DARK,
  },
  pickerItem: {
    backgroundColor: Colors.DARK,
    color: "white",
  },
  btnSave: {
    height: 50,
    width: "100%",
    backgroundColor: Colors.BLUE,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    flexDirection: "row",
  },
});
