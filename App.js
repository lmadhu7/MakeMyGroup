import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgetPasswordScree from "./screens/ForgetPasswordScree";
import AppStack from "./navigation/AppStack";
import GroupDetails from "./screens/GroupDetails";
import NotificationScreen from "./screens/NotificationScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={"Login"} component={LoginScreen} />
        <Stack.Screen name={"Signup"} component={SignUpScreen} />
        <Stack.Screen name={"Forgetpassword"} component={ForgetPasswordScree} />
        <Stack.Screen name={"Appstack"} component={AppStack} />
        <Stack.Screen name={"Groupdetails"} component={GroupDetails} />
        <Stack.Screen name={"Notifications"} component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
