import React from "react";
import { View, Text, Button } from "react-native";
import Scanner from "../components/Scanner";

const ScannerPage = ({ navigation }) => {
  return (
    <View>
      <Text>Scanner Page</Text>
      <Scanner />
      {/* <Button title="pressMe" onPress={() => {navigation.navigate('Root')}} /> */}
    </View>
  )
};

export default ScannerPage;
