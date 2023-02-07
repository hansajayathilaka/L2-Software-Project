import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2196f3',
        padding: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    Text: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
    },
});

export default Header;
