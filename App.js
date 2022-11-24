import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-native/native-stack";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
// import CreateScreen from "./screens/CreateScreen";
// import EditScreen from './screens/EditScreen';
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Create" component={CreateScreen} /> */}
        {/* <Stack.Screen name="Edit" component={EditScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
