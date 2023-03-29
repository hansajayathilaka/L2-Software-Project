import { View } from "react-native";
import React, { useState } from "react";
import { withTheme, Button, TextInput, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = ({ theme, navigation }) => {
  const [userEnteredUserName, setUserEnteredName] = useState("");
  const [userEnteredPassword, setUserEnteredPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  // const SignIn = () => {
  //   // if (userName == "Upeksha" && password == "abc") {
  //   //   navigation.navigate('Root');
  //   // } else {
  //   //   alert("Check the password and user name");
  //   // }
  //   navigation.navigate('Root');
  // };

  const signIn = () => {
    AsyncStorage.getItem('@password').then((value) => {
        if (value === userEnteredPassword) {
            console.log(value);
            setUserEnteredPassword('');
            console.log(value);
            navigation.navigate('Root');
            // navigation.push('Home', {name: 'Upeksha'});
        } else {
            console.log(value);
            alert('password is incorrect. Check the password correctly!');
        }
    })
}

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
          <Text variant="headlineMedium">Sign In</Text>
        </View>
        <TextInput
          mode="outlined"
          label="User Name"
          placeholder="Enter User Name"
          maxLength={20}
          right={<TextInput.Affix text="/20" />}
          onChangeText={(userName) => setUserEnteredName(userName)}
        />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry={passwordVisibility}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => {
                setPasswordVisibility(!passwordVisibility);
              }}
            />
          }
          onChangeText={(pass) => {
            setUserEnteredPassword(pass);
          }}
        />
        <Button icon="login" onPress={signIn} buttonColor="rgb(37, 139, 214)" textColor="white" >
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default SignIn;
