// TempleDetailScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // Make sure you import Ionicons
import TempleDetailHistoryScreen from "./TempleDetailHistoryScreen";
import TempleDetailTicketScreen from "./TempleDetailTicketScreen";
import TempleDetailAIMerchScreen from "./TempleDetailAIMerchScreen";
import TempleDetailDonateScreen from "./TempleDetailDonateScreen";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

// Top tabs navigator component
const TempleDetailsTopTabs = ({ screenProps }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#000", // Active label color
        tabBarInactiveTintColor: "gray", // Inactive label color
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: "none", // This prevents uppercase styling
          fontWeight: "bold", // Default weight for inactive tabs
        },
        tabBarIndicatorStyle: { backgroundColor: "#000" },
        tabBarPressColor: "#ddd",
        tabBarStyle: { backgroundColor: "white" },
        tabBarIndicatorContainerStyle: { backgroundColor: "white" },
        tabBarActiveLabelStyle: { fontWeight: "bold" }, // Custom property, not provided by library
      })}
    >
      <Tab.Screen
        name="Book Tickets"
        component={TempleDetailTicketScreen}
        initialParams={{
          name: screenProps.name,
          location: screenProps.location,
          imageUrl: screenProps.imageUrl,
        }}
      />
      <Tab.Screen
        name="History"
        component={TempleDetailHistoryScreen}
        initialParams={{
          name: screenProps.name,
          location: screenProps.location,
          imageUrl: screenProps.imageUrl,
        }}
      />
      <Tab.Screen
        name="AI Merch"
        component={TempleDetailAIMerchScreen}
        initialParams={{
          name: screenProps.name,
          location: screenProps.location,
          imageUrl: screenProps.imageUrl,
        }}
      />
      <Tab.Screen
        name="Donate"
        component={TempleDetailDonateScreen}
        initialParams={{
          name: screenProps.name,
          location: screenProps.location,
          imageUrl: screenProps.imageUrl,
        }}
      />
    </Tab.Navigator>
  );
};

const TempleDetailScreen = ({ route, navigation }) => {
  const { name, location, imageUrl } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Explore</Text>
      <View style={styles.tempnameloc}>
        <Text style={styles.templeName}>{name}</Text>
        <Text style={styles.templeLocation}>{location}</Text>
      </View>
      <TempleDetailsTopTabs
        screenProps={{
          name: name,
          location: location,
          imageUrl: imageUrl,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingTop: 20, // Adjust the padding as needed
    paddingHorizontal: 10,
    // You can set your own height, background color, etc.
  },
  backButton: {
    // Styles for the back button container if needed
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginLeft: 20, // Adjust the margin as needed
    margin: 10,
  },

  templeName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  templeLocation: {
    fontSize: 16,
    color: "gray",
  },

  tempnameloc: {
    marginLeft: 20,
  },
});

export default TempleDetailScreen;
