import React from 'react';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text } from 'react-native';

const Home = () => {
  return (
    <View>
      <Text>Home page</Text>
      <Button
        icon={<Icon name="arrow-right" size={15} color="white" />}
        title="Button with icon component"
      />
    </View>
  );
};

export default Home;
