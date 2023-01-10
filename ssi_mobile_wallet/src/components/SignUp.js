import React from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';

const SignUp = () => {
  const placeHoderTextColor = '#2196f3';

  const submitPassword = () => {
    
  };

  return (
    <View style={style.container}>
      <View>
        <Text style={style.title}>Sign Up</Text>
      </View>
      <TextInput
        placeholder="Password"
        placeholderTextColor={placeHoderTextColor}
        secureTextEntry={true}
        style={style.passwordField}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={placeHoderTextColor}
        secureTextEntry={true}
        style={style.passwordField}
      />
      <View style={style.buttonContailer}>
        <Button title="Sign Up" onPress={submitPassword} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    color: '#2196f3',
    fontWeight: 'bold',
    fontSize: 40,
    paddingBottom: 40,
  },
  passwordField: {
    borderBottomColor: '#2196f3',
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '70%',
    fontSize: 20,
    color: '#2196f3',
  },
  buttonContailer: {
    fontSize: 40,
    paddingTop: 40,
    maxWidth: '100%',
  },
});

export default SignUp;
