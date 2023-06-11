import "react-native-gesture-handler";
import {StyleSheet, Text} from "react-native";
import {AppRegistry} from "react-native";
import {MD3LightTheme as DefaultTheme} from "react-native-paper";
import {name as appName} from "./app.json";
import {createStore} from 'redux';
import {Provider, useDispatch} from 'react-redux';

import SignUp from "./src/pages/SignUp";
import SignIn from "./src/pages/SignIn";
import ScannerPage from "./src/pages/ScannerPage";
import Home from "./src/pages/Home";
import Connections from "./src/pages/Connections";
import Credentials from "./src/pages/Credentials";
import Settings from "./src/pages/Settings";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {reducer} from './src/reducers/reducers';
import {useEffect} from "react";
import {UPDATE_CONNECTION_ID} from "./src/reducers/actions";
import {getConnectionID} from "./src/utils/connectionIdManage";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const store = createStore(reducer);

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "rgb(102, 234, 255)",
        secondary: "black",
        background: "white",
    },
};

function Root() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    title: "Home",
                    headerStyle: {
                        backgroundColor: "rgb(37, 139, 214)",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <Drawer.Screen
                name="Connectiones"
                component={Connections}
                options={{
                    title: "Connectiones",
                    headerStyle: {
                        backgroundColor: "rgb(37, 139, 214)",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <Drawer.Screen
                name="Credentials"
                component={Credentials}
                options={{
                    title: "Credentials",
                    headerStyle: {
                        backgroundColor: "rgb(37, 139, 214)",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <Drawer.Screen
                name="Scan Credentials"
                component={ScannerPage}
                options={{
                    title: "Scan Credentials",
                    headerStyle: {
                        backgroundColor: "rgb(37, 139, 214)",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={Settings}
                options={{
                    title: "Settings",
                    headerStyle: {
                        backgroundColor: "rgb(37, 139, 214)",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator theme={styles.container}>
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
                    <Stack.Screen name="ScannerPage" component={ScannerPage}/>
                    <Stack.Screen
                        name="Root"
                        component={Root}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

AppRegistry.registerComponent(appName, () => Main);
