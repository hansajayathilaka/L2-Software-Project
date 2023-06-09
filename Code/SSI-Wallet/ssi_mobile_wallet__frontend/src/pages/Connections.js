import { View, FlatList, Text } from "react-native";
import { React, useState } from "react";
import axios from "axios";
import { Button } from "react-native-paper";
import { Avatar, Card, IconButton } from 'react-native-paper';

export default function Connections() {
  const [connections, setConnections] = useState([]);

  const loadConnectiones = () => {
    axios.get('http://172.104.61.240:3000/connections')
    .then(response => {
      // Handle the successful response
      const results = response.data.results;
      setConnections(results);
      console.log(results);
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });

  }

  const renderItem = ({ item }) => (
    <Card style={{ margin: 10, fontWeight: "bold" }}>
          <Card.Content>
          <Card.Title
              title={item.their_label }
              subtitle={item.created_at}
              left={(props) => <Avatar.Icon {...props} icon="card" />}
              right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
            />
            </Card.Content>
          </Card>
  );

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
      <FlatList
      data={connections}
      keyExtractor={(item) => item.connection_id}
      renderItem={renderItem}
    />
    </View>
  )
}