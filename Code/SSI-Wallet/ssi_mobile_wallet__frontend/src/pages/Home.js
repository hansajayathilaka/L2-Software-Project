import React, { useEffect } from 'react';
import { View, Alert } from "react-native";
import { Button, FAB } from "react-native-paper";
import Scanner from "../components/Scanner";
import { ScannerPage } from "./ScannerPage";
import acceptCredentialOffer from "../service/send-request";
import axios from 'axios';

const Home = ({ navigation }) => {
  const [active, setActive] = React.useState("");

  useEffect(() => {
    let interval;
    (async() => {
      interval = setInterval(async () => {
        console.log("asdf");
        try {
          const response3 = await axios.get("https://holder-admin-agent.hansajayathilaka.com/issue-credential/records");
          console.log('storing response: ');
          console.log(response3.data);
          response3.data.results.forEach((result) => {
            console.log('storing response: ' + result.state);
            switch (result.state) {
            case 'offer_received':
              // Credential Offer Received
              acceptCredentialOffer(result.credential_exchange_id);
              // Alert.alert('Error in storing credentials');
              break;
            default:
              // Alert.alert('Error in storing credentials');
              break;
            }
          });
        } catch (error) {
          console.log(error);
          // Alert.alert('Try again');
        }
      }, 5000);
    })();
    return () => clearInterval(interval);
  }, []);


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        icon="qrcode-scan"
        mode="contained"
        onPress={() => navigation.navigate("ScannerPage")}
        style={{ marginTop: 10, fontWeight: "bold" }}
        buttonColor="rgb(37, 139, 214)"
        textColor="white"
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
