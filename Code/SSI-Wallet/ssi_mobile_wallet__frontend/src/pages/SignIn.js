import { View, Alert } from "react-native";
import React, { useState } from "react";
import { Button, TextInput, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ theme, navigation }) => {
  const [userEnteredUserName, setUserEnteredName] = useState("");
  const [userEnteredPassword, setUserEnteredPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  // style colour
  const outlineColor = "rgb(37, 139, 214)";

  // get values from the async storage
  const getValue = async () => {
      const userName = await AsyncStorage.getItem('@userName');
      const password = await AsyncStorage.getItem('@password');

      if (password === userEnteredPassword) {
        if (userName === userEnteredUserName) {
          setUserEnteredPassword("");
          setUserEnteredName("");
          navigation.navigate("Root");
          // navigation.push('Home', {name: 'Upeksha'});
        } else {
          Alert.alert("User name is incorrect. Check the user name correctly!");
        }
      } else {
        Alert.alert("password is incorrect. Check the password correctly!");
      }
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
              marginTop: 50,
              marginBottom: 15,
              fontWeight: "bold",
            }}
          >
            Sign In
          </Text>
        </View>
        <TextInput
          style={{ marginBottom: 10 }}
          outlineColor={outlineColor}
          activeOutlineColor={outlineColor}
          textColor={outlineColor}
          mode="outlined"
          placeholderTextColor={outlineColor}
          label="User Name"
          placeholder="Enter User Name"
          onChangeText={(userName) => setUserEnteredName(userName)}
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
              onPress={() => setPasswordVisibility(!passwordVisibility)}
            />
          }
          onChangeText={(pass) => {
            setUserEnteredPassword(pass);
          }}
        />
        <Button
          icon="login"
          onPress={getValue}
          style={{ marginTop: 10, fontWeight: "bold" }}
          buttonColor="rgb(37, 139, 214)"
          textColor="white"
        >
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default SignIn;
