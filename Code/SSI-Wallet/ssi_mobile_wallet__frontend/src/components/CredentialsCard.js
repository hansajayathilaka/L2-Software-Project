import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';

const CredentialsCard = () => (
  <Card.Title
    title="Card Title"
    subtitle="Card Subtitle"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
  />
);

export default CredentialsCard;