import { View } from "react-native";
import React, { useState } from "react";
import { withTheme, Button, TextInput, Text } from "react-native-paper";

const SignUp = ({ theme, navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confPasswordVisibility, setconfPasswordVisibility] = useState(true);

  const signUp = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.secondary,
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

export default withTheme(SignUp);
