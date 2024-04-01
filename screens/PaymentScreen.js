import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useUser } from "./components/UserContext";
import colors from "../Constants/Colors";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";

import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { mainnet, polygon, arbitrum } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
  W3mButton,
} from "@web3modal/wagmi-react-native";

const projectId = "218331fa4d1a3a8c30bfe055daf394df";

const metadata = {
  name: "Web3Modal RN",
  description: "Web3Modal RN Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [mainnet, polygon, arbitrum];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true,
});

const PaymentScreen = ({ route, navigation }) => {
  const { item, selectedSlot, numberOfPersons, service } = route.params;
  const ServiceName = service.darshanName || service.pujaName;
  const serviceType = service.darshanName ? "Darshan" : "Puja";
  const serviceFee = service.darshanFee || service.pujaFee;
  const { userEmail } = useUser();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const getFormattedDate = (seconds, nanoseconds) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

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

  const formattedDateTime = getFormattedDate(
    selectedSlot.dateTime.seconds,
    selectedSlot.dateTime.nanoseconds
  );

  return (
    <WagmiConfig config={wagmiConfig}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.summaryContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.summaryTitle}>Summary</Text>
              <Text style={styles.summaryItem}>
                {ServiceName} x{numberOfPersons}
              </Text>
              <Text style={styles.summaryDate}>{item.templeName}</Text>
              <Text style={styles.summaryDate}>{item.location}</Text>
              {console.log(selectedSlot)}
              <Text style={styles.summaryDate}>{formattedDateTime}</Text>
            </View>
            <Text style={styles.summaryPrice}>₹ {serviceFee}</Text>
          </View>
          <View style={styles.paymentMethodContainer}>
            <Text style={styles.addPaymentMethod}>Add payment method</Text>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentMethod === "Apple Pay" && styles.selectedPayment,
              ]}
              onPress={() => setSelectedPaymentMethod("Apple Pay")}
            >
              <FontAwesome5 name="apple-pay" size={24} color="black" />
              <Text style={{ fontSize: 17, paddingLeft: 15 }}>Apple Pay</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#000"
                style={{ paddingLeft: 200 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentMethod === "Google Pay" &&
                  styles.selectedPayment,
              ]}
              onPress={() => setSelectedPaymentMethod("Google Pay")}
            >
              <FontAwesome5 name="google-pay" size={24} color="black" />
              <Text style={{ fontSize: 17, paddingLeft: 15 }}>Google Pay</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#000"
                style={{ paddingLeft: 189 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentMethod === "Credit Card" &&
                  styles.selectedPayment,
              ]}
              onPress={() => setSelectedPaymentMethod("Credit Card")}
            >
              <Ionicons name="card-outline" size={24} />
              <Text style={styles.paymentText}>Credit Card</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#000"
                style={{ paddingLeft: 190 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentMethod === "Debit Card" &&
                  styles.selectedPayment,
              ]}
              onPress={() => setSelectedPaymentMethod("Debit Card")}
            >
              <Ionicons name="card-outline" size={24} />
              <Text style={styles.paymentText}>Debit Card</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={18}
                color="#000"
                style={{ paddingLeft: 193 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.secureGatewaysContainer}>
            <Text style={styles.secureGatewaysText}>More secure gateways</Text>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPaymentMethod === "Blockchain" &&
                  styles.selectedPayment,
              ]}
              onPress={() => setSelectedPaymentMethod("Blockchain")}
            >
              <MaterialIcons
                name="enhanced-encryption"
                size={24}
                color="black"
              />
              <Text style={styles.blockChainText}>Wallet Connect</Text>
            </TouchableOpacity>
            <W3mButton />
          </View>

          <TouchableOpacity
            style={styles.finalizeButton}
            onPress={handlePaymentFinalization}
          >
            <Text style={styles.finalizeButtonText}>Confirm Payment</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Web3Modal />
    </WagmiConfig>
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
    fontWeight: "900",
    textAlign: "left",
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
    fontSize: 17,
    paddingLeft: 20,
  },
  blockChainText: {
    fontSize: 17,
    paddingLeft: 20,
    paddingRight: 100,
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
  summaryContainer: {
    padding: 16,
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 30,
    margin: 16,
    borderColor: "#e7e7e7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  summaryItem: {
    fontSize: 17,
    marginBottom: 5,
  },
  summaryDate: {
    fontSize: 15,
    color: "#777",
    marginBottom: 3,
  },
  summaryPrice: {
    fontSize: 17,
    fontWeight: "bold",
  },
  paymentMethodContainer: {
    padding: 16,
  },
  addPaymentMethod: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  secureGatewaysContainer: {
    padding: 16,
  },
  secureGatewaysText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default PaymentScreen;
