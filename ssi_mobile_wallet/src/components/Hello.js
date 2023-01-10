import React from "react";
import {Text, StyleSheet} from "react-native";


const Hello = () => {
    return (
        <Text style={style.textDeco}>
            Hello World !!
        </Text>
    );
}

const style = StyleSheet.create({
    textDeco: {
        flex: 1,
        backgroundColor: 'black',
        color: 'white', 
    }
});

export default Hello;