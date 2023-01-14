import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const placeHoderTextColor = '#2196f3'; // colour of text
  const [password, setPassword] = useState(''); // password field data
  const [confPassword, setConfPassword] = useState(''); // confpassword field data

  // store the password in the asynch storage
  const storeData = async value => {
    try {
      AsyncStorage.setItem('@password', value);
      resetForm();
      alert('SignUp successfull');
    } catch (e) {
      alert('Error occured while signup');
    }
  };

  // check the equality of the password and confPassword
  const isBothPasswordsEqual = () => {
    if (password === confPassword) {
      storeData(password);
    } else {
      alert('Passwords are not matching. Please check passwords wheter they are matching');
    }
  };

  // reset the signup form
  const resetForm = () => {
    setPassword('');
    setConfPassword('');
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
        onChangeText={newPassword => setPassword(newPassword)}
        maxLength={6}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={placeHoderTextColor}
        secureTextEntry={true}
        style={[style.singleInputTag, style.passwordField]}
        onChangeText={newConfPassword => setConfPassword(newConfPassword)}
        maxLength={6}
      />
      <View style={style.buttonContailer}>
        <Button title="Sign Up" onPress={isBothPasswordsEqual} />
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
    padding: 20,
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
  singleInputTag: {
    paddingTop: 40,
  },
});
export default SignUp;
