import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SearchScreen from "./screens/SearchScreen";
import TicketsScreen from "./screens/TicketsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import colors from "./Constants/Colors";
import TempleDetailScreen from "./screens/TempleDetailScreen";
import WalletConnect from "./screens/WalletConnect";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Tickets") {
            iconName = focused ? "ticket" : "ticket-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black", // Active icon color
        tabBarInactiveTintColor: "gray", // Inactive icon color
        tabBarStyle: {
          paddingBottom: 15,
          paddingTop: 15,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Tickets"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={TicketsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TempleDetail"
          component={TempleDetailScreen}
          options={{ headerShown: false }} // Customize as needed for your header
        />
        <Stack.Screen
          name="WalletConnect"
          component={WalletConnect}
          options={{ headerShown: false }} // Customize as needed for your header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
