import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { AppRegistry } from "react-native";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { name as appName } from "./app.json";
import SignUp from "./src/pages/SignUp";
import SignIn from "./src/pages/SignIn";
import ScannerPage from "./src/pages/ScannerPage";
import Home from "./src/pages/Home";
import Connections from "./src/pages/Connections";
import Credentials from "./src/pages/Credentials";
import Settings from "./src/pages/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(102, 234, 255)',
    secondary: 'black',
    background: 'white',
  },
};

function Root() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Connections" component={Connections} />
      <Drawer.Screen name="Credentials" component={Credentials} />
      <Drawer.Screen name="QR Scanner" component={ScannerPage} />
      <Drawer.Screen name="Settings" component={Settings} />
      {/* <DrawerItem
        label="Help"
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
      /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="ScannerPage" component={ScannerPage} />
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
