import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import { headerColor } from "./constant";
import AddTask from "./screens/AddTask";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name="Home"
          options={{
            headerStyle: {
              backgroundColor: headerColor,
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          component={AddTask}
          name="AddTask"
          options={{
            headerStyle: {
              backgroundColor: headerColor,
            },
            
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
