import React from "react";
import { View } from "react-native";
import { Button, FAB } from "react-native-paper";
import Scanner from "../components/Scanner";
import { ScannerPage } from "./ScannerPage";

const Home = ({ navigation }) => {
  const [active, setActive] = React.useState("");

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          icon="qrcode-scan"
          mode="contained"
          onPress={() => navigation.navigate("ScannerPage")}
        >
          QR Scanner
        </Button>
    </View>
  );

  const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });
};

export default Home;
