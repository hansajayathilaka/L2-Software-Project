import { View, Text } from "react-native";
import { React, useState, useEffect } from "react";
import axios from "axios";
import CredentialsCard from "../components/CredentialsCard";
import { Button } from "react-native-paper";

export default function Credentials() {
  const [credentials, setCredentials] = useState([]);
  const [last_credential_ex_id, setLast_credential_ex_id] = useState("");

  const loadCredentials = async () => {
    try {
    const response1 = await axios.get('https://holder-admin-agent.hansajayathilaka.com/issue-credential/records');
    const results = response1.data.results;
    const connectionIds = results.map((result) => { 
      if (result.connection_id == '')
      result.credential_exchange_id 
    });
    console.log(response1.data);
    setCredentials(connectionIds);
    console.log('Hi');
    console.log(connectionIds);
    setLast_credential_ex_id(connectionIds[1]);
    console.log(connectionIds[0]);

    const response2 = axios.post(`https://holder-admin-agent.hansajayathilaka.com/issue-credential/records/${last_credential_ex_id}/send-request`);
    console.log('Response 2:', response2.data);
    
  } catch (error) {
    console.error('Error:', error);
  }

    // axios.get('https://holder-admin-agent.hansajayathilaka.com/issue-credential/records')
    // .then(response => {
    //   // Handle the successful response
    //   const results = response.data.results;
    //   const connectionIds = results.map((result) => result.credential_exchange_id);
    //   setCredentials(connectionIds);
    //   console.log(connectionIds);
    //   let lengthOfCred_ex_id = connectionIds.length;
    //   setLast_credential_ex_id(connectionIds[lengthOfCred_ex_id - 1]);
    //   console.log(connectionIds[lengthOfCred_ex_id - 1]);
    // })
    // .catch(error => {
    //   // Handle the error
    //   console.error(error);
    // });
    
    // axios.post(`https://holder-admin-agent.hansajayathilaka.com/issue-credential/records/${last_credential_ex_id}/send-request`)
    // .then(response => {
    //   console.log(response.data);
    // })
    // .catch(error => {
    //   console.log(error);
    // });

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
