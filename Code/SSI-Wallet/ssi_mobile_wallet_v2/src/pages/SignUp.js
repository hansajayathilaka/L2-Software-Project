import { View, Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { withTheme, Button, TextInput, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confPasswordVisibility, setconfPasswordVisibility] = useState(true);

  // style colour
  const outlineColor = "rgb(37, 139, 214)";

  // store the password in the asynch storage
  const storeData = async (value) => {
    try {
      AsyncStorage.setItem("@password", value);
      console.log("saved the data");
      resetForm();
      navigation.navigate("SignIn", { name: "Upeksha" });
    } catch (e) {
      alert("Error occured while signup");
    }
  };

  // check the equality of the password and confPassword and store the password in the storage
  const isBothPasswordsEqual = () => {
    if (userName != "") {
      if (password != "") {
        if (password === confPassword) {
          storeData(userName);
          storeData(password);
          resetForm();
          navigation.navigate("SignIn", { name: "upeksha" });
        } else {
          // Alert.alert(
          //   "Passwords do not match"
          // );
          Alert.alert(
            "Bad Inputs",
            "Passwords do not match",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => console.log("OK pressed"),
                style: "default",
              },
            ]
            // {
            //   cancelable: false,
            //   onDismiss: () => console.log("Alert dismissed"),
            //   style: styles.alertContainer,
            //   titleStyle: styles.titleText,
            //   messageStyle: styles.messageText,
            //   buttonStyle: styles.button,
            //   buttonContainerStyle: styles.buttonContainer,
            // }
          );
        }
      } else {
        Alert.alert("Password can't be empty");
      }
    } else {
      Alert.alert("User Name can't be empty");
    }
  };

  // reset the signup form
  const resetForm = () => {
    setPassword("");
    setConfPassword("");
  };

  const signUp = () => {
    isBothPasswordsEqual();
    console.log(`${userName} ${password} ${confPassword}`);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          padding: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            variant="headlineMedium"
            style={{
              color: "rgb(37, 139, 214)",
              marginTop: 30,
              marginBottom: 15,
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Text>
        </View>

        <TextInput
          style={{ marginBottom: 10 }}
          outlineColor={outlineColor}
          activeOutlineColor={outlineColor}
          textColor={outlineColor}
          mode="outlined"
          placeholder="Enter User Name"
          placeholderTextColor={outlineColor}
          label="User Name"
          onChangeText={(userName) => setUserName(userName)}
        />

        <TextInput
          style={{ marginBottom: 10 }}
          outlineColor={outlineColor}
          activeOutlineColor={outlineColor}
          textColor={outlineColor}
          mode="outlined"
          placeholder="Enter Password"
          placeholderTextColor={outlineColor}
          label="Password"
          secureTextEntry={passwordVisibility}
          right={
            <TextInput.Icon
              icon={passwordVisibility ? "eye" : "eye-off"}
              onPress={() => {
                setPasswordVisibility(!passwordVisibility);
              }}
            />
          }
          onChangeText={(pass) => {
            setPassword(pass);
          }}
        />

        <TextInput
          style={{ marginBottom: 10 }}
          outlineColor={outlineColor}
          activeOutlineColor={outlineColor}
          textColor={outlineColor}
          mode="outlined"
          placeholder="Enter Confirm Password"
          placeholderTextColor={outlineColor}
          label="Confirm Password"
          secureTextEntry={confPasswordVisibility}
          right={
            <TextInput.Icon
              icon={confPasswordVisibility ? "eye" : "eye-off"}
              onPress={() => setconfPasswordVisibility(!confPasswordVisibility)}
            />
          }
          onChangeText={(confPass) => {
            setConfPassword(confPass);
          }}
        />

        <Button
          icon="account-arrow-right"
          onPress={signUp}
          style={{ marginTop: 10, fontWeight: "bold" }}
          buttonColor="rgb(37, 139, 214)"
          textColor="white"
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    backgroundColor: "black",
    borderRadius: 8,
    padding: 16,
    borderWidth: 4,
    borderColor: "blue",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "blue",
  },
  messageText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
});

export default SignUp;
