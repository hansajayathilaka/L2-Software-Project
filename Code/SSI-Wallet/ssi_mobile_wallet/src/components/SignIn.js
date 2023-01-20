import React, {useState} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}) => {
    const[userEnteredPassword, setUserEnteredPassword] = useState('');
    const placeHoderTextColor = '#2196f3'; // colour of text

    const signIn = () => {
        AsyncStorage.getItem('@password').then((value) => {
            if (value === userEnteredPassword) {
                console.log(value);
                setUserEnteredPassword('');
                console.log(value);
                navigation.navigate('Home', {name: 'Upeksha'});
            } else {
                console.log(value);
                alert('password is incorrect. Check the password correctly!');
            }
        })
    }

    return (
        <View style={style.container}>
      <View>
        <Text style={style.title}>Sign In</Text>
      </View>
      <TextInput
        placeholder="Password"
        placeholderTextColor={placeHoderTextColor}
        secureTextEntry={true}
        style={style.passwordField}
        onChangeText={newPassword => setUserEnteredPassword(newPassword)}
        maxLength={6}
      />
      <View style={style.buttonContailer}>
        <Button title="Sign In" onPress={signIn} />
      </View>
    </View>
    );
}

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

export default SignIn;