import React from "react";
import { View, Text, Button } from "react-native";
import Scanner from "../components/Scanner";

const ScannerPage = ({ navigation }) => {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Scanner />
    </View>
  )
};

export default ScannerPage;
