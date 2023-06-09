import { View, Text } from "react-native";
import { React, useState, useEffect } from "react";
import axios from "axios";
import CredentialsCard from "../components/CredentialsCard";
import { Button } from "react-native-paper";


export default function Credentials() {

  const loadCredentials = () => {
    axios.get('http://172.104.61.240:3000/credentials')
    .then(response => {
      // Handle the successful response
      console.log(response.data);
    })
    .catch(error => {
      // Handle the error
      console.log(error);
    });
  }
  
  return (
    <View>
      <Button
          icon="reload"
          onPress={loadCredentials}
          style={{ margin: 10, fontWeight: "bold" }}
          buttonColor="rgb(37, 139, 214)"
          textColor="white"
        >
          Refresh
        </Button>
      <CredentialsCard />
    </View>
  );
}
