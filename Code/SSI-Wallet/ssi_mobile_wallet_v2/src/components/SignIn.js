import { View } from "react-native";
import React, { useState } from "react";
import { withTheme, Button, TextInput, Text } from "react-native-paper";

const SignIn = ({ theme, navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const signIn = () => {
    navigation.navigate("Home");
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
          <Text variant="headlineMedium">Sign In</Text>
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
        <Button icon="login" onPress={signIn}>
          Sign In
        </Button>
      </View>
    </View>
  );
};

export default withTheme(SignIn);
