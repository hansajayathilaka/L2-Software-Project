import React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Scanner from "./Scanner";

const Home = () => {
  const [active, setActive] = React.useState("");

  return (
    <View>
      <Scanner />
    </View>
  );
};

export default Home;
