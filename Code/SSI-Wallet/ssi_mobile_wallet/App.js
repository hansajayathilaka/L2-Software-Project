import * as React from 'react';
import SignUp from './src/components/SignUp';
import SignIn from './src/components/SignIn';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Credentials from './src/components/Credentials';
import Header from './src/components/Header';
import Conections from './src/components/Connections';
import FetchingData from './src/components/FetchingData';
import ItemCard from './src/components/ItemCard';

const App = () => {
  return (
    <ItemCard />
  );
}

export default App;
