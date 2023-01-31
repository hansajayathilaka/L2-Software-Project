import * as React from 'react';
import SignUp from './src/components/SignUp';
import SignIn from './src/components/SignIn';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Credentials from './src/components/Credentials';
import Header from './src/components/Header';
import Conections from './src/components/Connections';
import FetchingData from './src/components/FetchingData';
import ItemCard from './src/components/Card';
import Home from './src/components/Home';
import ScannerButton from './src/components/ScannerButton';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: '#2196f3',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
