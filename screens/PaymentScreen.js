import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useUser } from "./components/UserContext";
import colors from "../Constants/Colors";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

const PaymentScreen = ({ route, navigation }) => {
  const { item, selectedSlot, numberOfPersons, service } = route.params;
  const ServiceName = service.darshanName || service.pujaName;
  const serviceType = service.darshanName ? "Darshan" : "Puja";
  const { userEmail } = useUser();

  // State to track the selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Function to handle payment finalization
  const handlePaymentFinalization = () => {
    navigation.navigate("QRCodeScreen", {
      item,
      serviceType,
      serviceName: ServiceName,
      userEmail,
      selectedSlot,
      numberOfPersons,
      service,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPaymentMethod === "Apple Pay" && styles.selectedPayment,
          ]}
          onPress={() => setSelectedPaymentMethod("Apple Pay")}
        >
          <FontAwesome5 name="apple-pay" size={28} color="black" />
          <Text style={styles.paymentText}>Apple Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPaymentMethod === "Google Pay" && styles.selectedPayment,
          ]}
          onPress={() => setSelectedPaymentMethod("Google Pay")}
        >
          <FontAwesome5 name="google-pay" size={28} color="black" />
          <Text style={styles.paymentText}>Google Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPaymentMethod === "Credit Card" && styles.selectedPayment,
          ]}
          onPress={() => setSelectedPaymentMethod("Credit Card")}
        >
          <MaterialCommunityIcons
            name="credit-card-plus"
            size={28}
            color="black"
          />
          <Text style={styles.paymentText}>Credit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPaymentMethod === "Blockchain" && styles.selectedPayment,
          ]}
          onPress={() => setSelectedPaymentMethod("Blockchain")}
        >
          <MaterialIcons name="enhanced-encryption" size={28} color="black" />
          <Text style={styles.paymentText}>Blockchain</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.finalizeButton}
        onPress={() => {
          navigation.navigate("QRCodeScreen", {
            item,
            serviceType,
            serviceName: ServiceName,
            userEmail,
            selectedSlot,
            numberOfPersons,
            service,
          });
        }}
      >
        <Text style={styles.finalizeButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",

    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paymentOption: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderBottomColor: "#d8d8d8",
    borderBottomWidth: 1,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    flexDirection: "row",
  },
  selectedPayment: {
    backgroundColor: "rgba(231, 139, 0, 0.2)",
  },
  paymentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  finalizeButton: {
    marginTop: 20,
    backgroundColor: colors.PrimaryButtonColor,
    padding: 15,
    borderRadius: 5,
    margin: 20,
    marginBottom: 40,
  },
  finalizeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PaymentScreen;
