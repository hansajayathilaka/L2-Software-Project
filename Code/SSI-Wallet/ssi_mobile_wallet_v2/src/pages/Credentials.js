import { View, Text } from "react-native";
import { React, useState, useEffect } from "react";
import axios from "axios";
import CredentialsCard from "../components/CredentialsCard";
// const baseUrl = "http://10.0.2.2:8000/";

export default function Credentials() {
  // axios
  //   .get("http://10.0.2.2:8000/default")
  //   .then((response) => {
  //     var data = response.data;
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.log("Error: ", error.message);
  //   })
  //   .finally(() => {
  //     console.log("Request is completed");
  //   });

  return (
    <View>
      <CredentialsCard />
    </View>
  );
}
