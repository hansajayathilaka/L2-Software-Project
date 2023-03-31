import { View, Text } from "react-native";
import {React, useState} from "react";
import axios from "axios";
const baseUrl = "http://localhost:8000/";

export default function Credentials() {
  const data = useState('');

  axios.get(`${baseUrl}default`)
  .then(response => {
    var data = response.data;
    console.log(data);
  })
  .catch(error => {
    console.log('Error: ', error.message);
  })
  .finally(() => {
    console.log('Request is completed');
  });

  return (
    <View>
      <Text>Credentials</Text>
    </View>
  );
}

