import React from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

const TempleDetailTicketScreen = ({ route }) => {
  // Get params for this screen
  const { name, location, imageUrl } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.templeImage} />
      <View style={styles.infoContainer}>{/* ... */}</View>
    </ScrollView>
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
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15, // Adjust the margin as needed
    margin: 15,
  },
  templeImage: {
    width: "100%",
    height: 200, // Set this to the desired value
  },
  infoContainer: {
    padding: 16,
  },
  templeName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  templeLocation: {
    fontSize: 16,
    color: "gray",
  },
  // Add more styles as needed for your layout
});

export default TempleDetailTicketScreen;
