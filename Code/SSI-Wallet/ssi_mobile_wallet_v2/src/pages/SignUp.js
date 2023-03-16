import { View } from "react-native";
import React, { useState } from "react";
import { withTheme, Button, TextInput, Text } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confPasswordVisibility, setconfPasswordVisibility] = useState(true);

  // store the password in the asynch storage
  const storeData = async value => {
    try {
      AsyncStorage.setItem('@password', value);
      resetForm();
      navigation.navigate('SignIn', {name: 'Upeksha'});

    } catch (e) {
      alert('Error occured while signup');
    }
  };

  // check the equality of the password and confPassword and store the password in the storage
  const isBothPasswordsEqual = () => {
    if (password === confPassword) {
      storeData(userName);
      storeData(password);
      navigation.navigate('SignIn', {name: 'upeksha'});
    } else {
      alert('Passwords are not matching. Please check passwords wheter they are matching');
    }
  };

  // reset the signup form
  const resetForm = () => {
    setPassword('');
    setConfPassword('');
  };


  const signUp = () => {
    isBothPasswordsEqual();
    console.log(`${userName} ${password} ${confPassword}`);
    navigation.navigate("SignIn");
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
          <Text variant="headlineMedium">Sign Up</Text>
        </View>
        <TextInput
          mode="outlined"
          label="User Name"
          placeholder="Enter User Name"
          maxLength={20}
          right={<TextInput.Affix text="/20" />}
          onChangeText={(userName) => setUserName(userName)}
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
            setPassword(pass);
          }}
        />
        <TextInput
          mode="outlined"
          label="Confirm Password"
          secureTextEntry={confPasswordVisibility}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setconfPasswordVisibility(!confPasswordVisibility)}
            />
          }
          onChangeText={(confPass) => {
            setConfPassword(confPass);
          }}
        />
        <Button icon="account-arrow-right" onPress={signUp}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

export default SignUp;
