import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import colors from "../Constants/Colors";
import CryptoJS from "crypto-js";

const BookingDetailScreen = ({ route, navigation }) => {
  const { booking } = route.params;
  console.log("Bookings : ", booking);

  const [qrCodeData, setQRCodeData] = useState(null);
  const SECRET_KEY = "00112233445566778899aabbccddeeff";

  useEffect(() => {
    const qrData = JSON.stringify({
      bookedSlot: booking.bookedSlot.toDate().toISOString(),
      bookingID: booking.bookingID,
      serviceName: booking.serviceName,
      templeID: booking.templeID,
      noOfPersons: booking.noOfPersons,
      templeLocation: booking.templeLocation,
      templeName: booking.templeName,
      userEmail: booking.userEmail,
    });

    console.log(qrData);
    const encryptedData = CryptoJS.AES.encrypt(qrData, SECRET_KEY).toString();
    setQRCodeData(encryptedData);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    // Options to format the time
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={styles.serviceName}>{booking.serviceName}</Text>
            <Text
              style={styles.ticketCount}
            >{`${booking.noOfPersons} ticket(s)`}</Text>
          </View>
          <View style={styles.qrCodeContainer}>
            {qrCodeData && <QRCode value={qrCodeData} size={200} />}
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.userName}>{booking.userEmail}</Text>
            <Text style={{ fontWeight: "bold" }}>{booking.templeName}</Text>
            <Text style={{ fontWeight: "bold" }}>{booking.templeLocation}</Text>
            <Text style={styles.bookingDetails}>{`${formatDate(
              booking.bookedSlot.toDate()
            )} | ${formatTime(booking.bookedSlot.toDate())}`}</Text>
          </View>
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>
              Please show this QR code during your entry
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  qrCodeContainer: {
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
  },
  card: {
    marginVertical: 70,
    paddingVertical: 70,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 1,
  },

  detailsContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  serviceName: {
    fontWeight: "bold",
    color: colors.PrimaryButtonColor,
    fontSize: 18,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.PrimaryButtonColor,
    borderRadius: 10,
    padding: 10,
  },
  ticketCount: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    padding: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 8,
  },
  userDetails: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: "500",
  },
  bookingDetails: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: "500",
  },
  instructionsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 20,
    fontWeight: "500",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "900",
  },
  homeButton: {
    backgroundColor: colors.PrimaryButtonColor,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
  homeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default BookingDetailScreen;
