import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
// import { Ionicons, Icon } from "@expo/vector-icons";
import { Icon } from "react-native-elements/";

import HomeScreen from "../screens/HomeScreen";
import GroupScreen from "../screens/GroupScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatScreen from "../screens/ChatScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "My Group") {
            iconName = focused ? "groups" : "groups";
          } else if (route.name === "Profile") {
            iconName = focused ? "tv" : "tv";
          } else if (route.name === "Chat") {
            iconName = focused ? "chatbox" : "chatbox";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Group" component={GroupScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}
