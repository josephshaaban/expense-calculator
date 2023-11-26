import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";

const TypeCategoryPicker = (props) => {
  const { setTypeCallback, setCategoryCallback } = props;
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

  return (
    <View>
      <Picker
        style={styles.picker}
        mode="dropdown"
        dropdownIconColor={Colors.DARK_GRAY}
        selectedValue={type}
        onValueChange={(val) => {setTypeCallback(val); setType(val)}}
      >
        <Picker.Item
          label="Select Type"
          value="type"
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
          onValueChange={(val) => {
            setCategoryCallback(val);
            setCategory(val);
          }}
        >
          <Picker.Item
            label="Select Income Category"
            value="category"
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
          onValueChange={(val) => {
            setCategoryCallback(val);
            setCategory(val);
          }}
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
    </View>
  );
};

export default TypeCategoryPicker;

const styles = StyleSheet.create({
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
});
