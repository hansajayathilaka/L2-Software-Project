import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';

const ConnectionsCard = (connection_title, date) => (
  <Card.Title
    title= {connection_title}
    subtitle={date}
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
  />
);

export default ConnectionsCard;