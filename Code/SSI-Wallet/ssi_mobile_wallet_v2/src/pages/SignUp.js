import { View } from "react-native";
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
          alert(
            "Passwords are not matching. Please check passwords wheter they are matching"
          );
        }
      } else {
        alert("Password can't be empty");
      }
    } else {
      alert("User Name can't be empty");
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

export default SignUp;
