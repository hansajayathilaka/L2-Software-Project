import "react-native-gesture-handler";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AppRegistry } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  Drawer as PaperDrawer,
} from "react-native-paper";
import { name as appName } from "./app.json";
import SignUp from "./src/components/SignUp";
import SignIn from "./src/components/SignIn";
import Home from "./src/components/Home";
import Connections from "./src/components/Connections";
import Settings from "./src/components/Settings";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyComponent from "./src/components/MyComponent";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "blue",
    secondary: "white",
  },
};

function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Connections" component={Connections} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
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
