import { View, FlatList,  Alert } from "react-native";
import { React, useState } from "react";
import axios from "axios";
import { Button, Card, Avatar } from "react-native-paper";
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Credentials() {
  const [credentials, setCredentials] = useState([]);
  const [last_credential_ex_id, setLast_credential_ex_id] = useState("");
  const { ConnectionID } = useSelector(state => {
    return state
  });
  const [responseCheck, setResponseCheck] = useState({});

  // store the password in the asynch storage
  const setConnectionID = async (key, value) => {
    try {
      AsyncStorage.setItem(key , value);
      console.log("saved the data" + value);
      // resetForm();
      // navigation.navigate("SignIn", { name: "Upeksha" });
    } catch (e) {
      alert("Error occured while signup");
    }
  };

  // to load the credentials
  const loadCredentials = async () => {
    try {
      console.log('==========================================================');
      const response1 = await axios.get('https://holder-admin-agent.hansajayathilaka.com/issue-credential/records');
      const results = response1.data.results;
      console.warn('Response1 :', response1.data.state);
      console.warn('Topic'+ response1.data.topic);
      for (let i of results) {
        // console.log(i.connection_id.toLowerCase());
        if (i.connection_id.toLowerCase() === ConnectionID.toLowerCase()) {
          // console.log("credential exchange ID : " + i.credential_exchange_id + ' Connection ID : ' + i.connection_id);
          setLast_credential_ex_id(i.credential_exchange_id);
        }
      }

      const connectionIds = results.map((result) => result.credential_exchange_id);

      try {
        const response2 = await axios.post(`https://holder-admin-agent.hansajayathilaka.com/issue-credential/records/${last_credential_ex_id}/send-request`);
        console.warn('Response2 :', response2.data.state);
        console.warn('Topic2'+ response2.data.topic);
      } catch (error) {
        console.error('First request not working');
        Alert.alert('Try to let new credentials in again');
        Alert.alert(
          'Accept new Credentials',
          'Try to let new credentials in again',
          [
            {
              text: 'Ok',
              style: 'cancel',
            },
          ]
        );
      }
        
      // try {
      //     const response3 = await axios.post(`https://holder-admin-agent.hansajayathilaka.com/issue-credential/records/${last_credential_ex_id}/store`, {});
      //     console.log('Response3: ' + response3.data.state);
      //     console.log('Topic3: ' + response3.data.topic);
      // } catch (error) {
      //   console.error('Third request not working');
      // }
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // to get the new credentials
  const letNewCredentialsIn = async () => {
    try {
      const credentials = await axios.get("https://holder-admin-agent.hansajayathilaka.com/credentials");
      setCredentials(credentials.data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const renderItem = ({ item }) => (
    <Card style={{ margin: 10, fontWeight: "bold" }}>
          <Card.Content>
          <Card.Title
              title={item.their_label}
              subtitle={item.created_at}
              left={(props) => <Avatar.Icon {...props} icon="card" />}
          />
          </Card.Content>
    </Card>
  );
  
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
        <Button
          icon="reload"
          onPress={letNewCredentialsIn}
          style={{ margin: 10, fontWeight: "bold" }}
          buttonColor="rgb(37, 139, 214)"
          textColor="white"
        >
          Let New Credentials In
        </Button>
        <Button
          icon="reload"
          onPress={finalRequest}
          style={{ margin: 10, fontWeight: "bold" }}
          buttonColor="rgb(37, 139, 214)"
          textColor="white"
        >
          finalRequest
        </Button>
        <FlatList
          data={credentials}
          keyExtractor={(item) => item.referent}
          renderItem={renderItem}
        />
    </View>
  );
}
