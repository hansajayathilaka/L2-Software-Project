import { View, Text } from "react-native";
import { React } from "react";
import axios from "axios";
import { Button } from "react-native-paper";

export default function Connections() {

  const loadConnectiones = () => {
    axios.get('http://172.104.61.240:3000/connections')
    .then(response => {
      // Handle the successful response
      console.log(response.data);
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });

  }

  return (
    <View>
      <Button
          icon="reload"
          onPress={loadConnectiones}
          style={{ margin: 10, fontWeight: "bold" }}
          buttonColor="rgb(37, 139, 214)"
          textColor="white"
        >
          Refresh
        </Button>
      <Text>Connections</Text>
    </View>
  )
}