import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import QRCode from "react-native-qrcode-svg";

const QRCodeScreen = ({ route }) => {
  const {
    item,
    serviceType,
    serviceName,
    userEmail,
    selectedSlot,
    numberOfPersons,
    service,
  } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Confirmation Details</Text>
      <Text style={styles.infoLabel}>User Email: {userEmail}</Text>
      <Text style={styles.infoLabel}>Temple: {item.templeName}</Text>
      <Text style={styles.infoLabel}>TempleID: {item.id}</Text>
      <Text style={styles.infoLabel}>Service Type: {serviceType}</Text>
      <Text style={styles.infoLabel}>Service Name: {serviceName}</Text>
      <Text style={styles.infoLabel}>
        Slot Time: {selectedSlot.dateTime.toDate().toLocaleString()}
      </Text>
      <Text style={styles.infoLabel}>Number of Persons: {numberOfPersons}</Text>
      {/* Display additional information as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 18,
    marginVertical: 5,
  },
  // Add more styles as needed
});

export default QRCodeScreen;
