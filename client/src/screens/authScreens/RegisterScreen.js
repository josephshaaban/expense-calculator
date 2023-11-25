import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";

import Colors from "../../constants/Colors";
import Config from "../../constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("test.user@gmail.com");
  const [fullname, setFullName] = useState("Test User");
  const [password, setPassword] = useState("User@1234");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const register = async () => {
    const REGISTER_URL = `${Config.API_USERS_URL}/register`;

    if (email.trim() == "" || fullname.trim() == "" || password.trim() == "") {
      Alert.alert("Error!", "Inputs cannot be empty");
    } else if (password.trim().length < 8) {
      Alert.alert("Error!", "Password must be atleast 8 characters");
    } else {
      setLoading(true);
      try {
        console.log(REGISTER_URL);
        const { data } = await axios
          .post(
            REGISTER_URL,
            {
              fullname: fullname.trim(),
              email: email.trim(),
              password: password.trim(),
              passwordCheck: password.trim(),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            return res;
          })
          .catch((err) => {
            if (err.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              Alert.alert(
                `Error! ${err.response.status}`,
                err.response.data.msg
              );
            } else if (err.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(err.request);
            }
            return {
              data: {
                success: false,
                message: err.message,
                user: null,
                error: err,
              },
            };
          });
        if (data && data.success) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
          await AsyncStorage.setItem("userId", data.user._id);

          setEmail("");
          setFullName("");
          setPassword("");

          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
          return true;
        }
        return false;
      } catch (err) {
        Alert.alert("Error!", err.response.data.message);
        return false;
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.1, alignItems: "center" }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "white" }}>
          Create your account
        </Text>
      </View>
      <View
        style={{ flex: 0.8, alignItems: "center", justifyContent: "center" }}
      >
        <TextInput
          style={styles.textInput}
          textColor={Colors.WHITISH}
          mode="outlined"
          placeholder="Enter Email"
          placeholderTextColor={Colors.DARK_GRAY}
          keyboardType="email-address"
          outlineColor={Colors.DARK_GRAY}
          activeOutlineColor={Colors.BLUE}
          left={
            <TextInput.Icon
              icon="email"
              color={(isTextInputFocused) =>
                isTextInputFocused ? Colors.WHITISH : Colors.DARK_GRAY
              }
            />
          }
          theme={{ colors: { text: "white" } }}
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <View style={styles.innerMargin} />
        <TextInput
          style={styles.textInput}
          textColor={Colors.WHITISH}
          mode="outlined"
          placeholder="Enter Your Name"
          placeholderTextColor={Colors.DARK_GRAY}
          maxLength={100}
          outlineColor={Colors.DARK_GRAY}
          activeOutlineColor={Colors.BLUE}
          left={
            <TextInput.Icon
              icon="account"
              color={(isTextInputFocused) =>
                isTextInputFocused ? Colors.WHITISH : Colors.DARK_GRAY
              }
            />
          }
          theme={{ colors: { text: "white" } }}
          value={fullname}
          onChangeText={(fullname) => setFullName(fullname)}
        />
        <View style={styles.innerMargin} />
        <TextInput
          style={styles.textInput}
          textColor={Colors.WHITISH}
          mode="outlined"
          placeholder="Set Password"
          placeholderTextColor={Colors.DARK_GRAY}
          secureTextEntry={isPasswordSecure}
          maxLength={24}
          outlineColor={Colors.DARK_GRAY}
          activeOutlineColor={Colors.BLUE}
          selectionColor={Colors.WHITISH}
          left={
            <TextInput.Icon
              icon="lock"
              color={(isTextInputFocused) =>
                isTextInputFocused ? Colors.WHITISH : Colors.DARK_GRAY
              }
            />
          }
          right={
            <TextInput.Icon
              icon={isPasswordSecure ? "eye-off" : "eye"}
              color={(isTextInputFocused) =>
                isTextInputFocused ? Colors.WHITISH : Colors.DARK_GRAY
              }
              onPress={() => {
                isPasswordSecure
                  ? setIsPasswordSecure(false)
                  : setIsPasswordSecure(true);
              }}
            />
          }
          theme={{ colors: { text: "white" } }}
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity
          style={styles.buttonSubmit}
          disabled={loading ? true : false}
          onPress={() => register()}
        >
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={styles.btnText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: Colors.DARK_GRAY }}>
          Have an account already?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text
            style={{ marginStart: 4, color: Colors.BLUE, fontWeight: "500" }}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  textInput: {
    width: "90%",
    borderRadius: 4,
    backgroundColor: "black",
    color: "white",
  },
  innerMargin: {
    height: 15,
  },
  buttonSubmit: {
    height: 45,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.BLUE,
    borderRadius: 4,
    elevation: 4,
    marginTop: 30,
  },
  btnText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "500",
  },
});
