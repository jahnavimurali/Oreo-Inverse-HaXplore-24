// PaymentScreen.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PaymentScreen = ({ route }) => {
  const { item, selectedSlot, numberOfPersons, service } = route.params;
  const displayServiceName = service.darshanName || service.pujaName;
  const serviceType = service.darshanName ? "Darshan" : "Puja";

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Details</Text>
      <Text>Temple: {item.templeName}</Text>
      <Text>
        Service: {service.darshanName} ({serviceType})
      </Text>

      <Text>Slot Time: {selectedSlot.dateTime.toDate().toString()}</Text>
      <Text>Number of Persons: {numberOfPersons}</Text>
      <Text>Current Bookings: {selectedSlot.currentBookings}</Text>
      <Text>Max Bookings: {selectedSlot.maxBookings}</Text>
      {/* Add payment form or details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  // ... (add more styles if necessary)
});

export default PaymentScreen;
