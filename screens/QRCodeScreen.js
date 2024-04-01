import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import db from "./components/firebaseconfig";
import { ActivityIndicator } from "react-native";
import colors from "../Constants/Colors";
import CryptoJS from "crypto-js";

const QRCodeScreen = ({ route, navigation }) => {
  const {
    item,
    serviceType,
    serviceName,
    userEmail,
    selectedSlot,
    numberOfPersons,
    service,
  } = route.params;

  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQRCodeData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const bookingID = Math.random().toString(36).substring(2, 10);

  useEffect(() => {
    setLoading(true);
    updateCurrentBookings()
      .then(() => {
        return updateUserBookings(
          userEmail,
          serviceType,
          serviceName,
          selectedSlot,
          numberOfPersons,
          item,
          service
        );
      })
      .then(generateQRCodeData)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to update bookings:", error);
        setLoading(false);
      });
  }, []);

  const updateCurrentBookings = async () => {
    // Determine the correct service array name and service name field based on serviceType
    const serviceArrayName = serviceType === "Darshan" ? "Darshan" : "Puja";
    const serviceNameField =
      serviceType === "Darshan" ? "darshanName" : "pujaName";

    // Reference to the specific temple document
    const templeDocRef = doc(db, "Temples", item.id);

    try {
      // Fetch the current state of the document
      const docSnap = await getDoc(templeDocRef);
      if (!docSnap.exists()) {
        throw new Error("Document does not exist!");
      }

      const templeData = docSnap.data();
      const services = templeData[serviceArrayName];

      // Find the index of the specific service
      const serviceIndex = services.findIndex(
        (service) => service[serviceNameField] === serviceName
      );
      if (serviceIndex === -1) {
        throw new Error("Service not found!");
      }

      // Extract the slots for the service
      const slots = services[serviceIndex].Slots;

      // Find the index of the specific slot
      const slotIndex = slots.findIndex(
        (slot) =>
          slot.dateTime.toDate().getTime() ===
          selectedSlot.dateTime.toDate().getTime()
      );
      if (slotIndex === -1) {
        throw new Error("Slot not found!");
      }

      // Increment the currentBookings by numberOfPersons
      slots[slotIndex].currentBookings =
        Number(slots[slotIndex].currentBookings) + Number(numberOfPersons);

      // Prepare the updated slots array to write back
      const updatedSlots = [...slots];

      // Prepare the updated service object
      const updatedService = { ...services[serviceIndex], Slots: updatedSlots };

      // Replace the old service object with the updated one in the services array
      const updatedServices = [...services];
      updatedServices[serviceIndex] = updatedService;

      // Writ the update back to Firestore
      await updateDoc(templeDocRef, {
        [serviceArrayName]: updatedServices,
      });

      console.log("Slot booking updated successfully.");
    } catch (error) {
      console.error("Failed to update slot booking:", error);
    }
  };

  const updateUserBookings = async (
    userEmail,
    serviceType,
    serviceName,
    selectedSlot,
    numberOfPersons,
    item,
    service
  ) => {
    // Query for the user's document based on the email
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("Email", "==", userEmail));
    const querySnapshot = await getDocs(q);
    console.log(q);

    if (querySnapshot.empty) {
      console.error("User not found!");
      return;
    }

    // Get the first matching user document
    const userDocRef = querySnapshot.docs[0].ref;

    const booking = {
      bookedSlot: Timestamp.fromDate(selectedSlot.dateTime.toDate()),
      bookingID: bookingID,
      serviceName: serviceName,
      templeID: item.id,
      noOfPersons: numberOfPersons,
      paidAmount:
        Number(service[serviceType.toLowerCase() + "Fee"]) *
        Number(numberOfPersons),
      templeLocation: item.location,
      templeName: item.templeName,
      userEmail: userEmail,
    };

    try {
      const userData = (await getDoc(userDocRef)).data();
      setUserDetails({
        name: userData.Uname,
        gender: userData.Gender,
        Age: userData.Age,
        email: userData.Email,
      });

      const bookingFieldName =
        serviceType === "Darshan" ? "darshanBookings" : "pujaBookings";

      const existingBookings = userData[bookingFieldName]
        ? userData[bookingFieldName]
        : [];

      existingBookings.push(booking);

      await updateDoc(userDocRef, {
        [bookingFieldName]: existingBookings,
      });

      console.log("User booking updated successfully.");
    } catch (error) {
      console.error("Error updating user booking: ", error);
    }
  };

  const SECRET_KEY = "00112233445566778899aabbccddeeff";

  const generateQRCodeData = () => {
    const qrData = {
      bookedSlot: selectedSlot.dateTime.toDate().toISOString(),
      bookingID: bookingID,
      serviceName: serviceName,
      templeID: item.id,
      noOfPersons: numberOfPersons,
      templeLocation: item.location,
      templeName: item.templeName,
      userEmail: userEmail,
    };
    const qrDataString = JSON.stringify(qrData);
    const encryptedData = CryptoJS.AES.encrypt(
      qrDataString,
      SECRET_KEY
    ).toString();
    setQRCodeData(encryptedData);
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    };

    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };

    return date.toLocaleTimeString(undefined, options);
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Booking confirmed!</Text>
        </View>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text style={styles.serviceName}>{serviceName}</Text>
            <Text
              style={styles.ticketCount}
            >{`${numberOfPersons} ticket(s)`}</Text>
          </View>
          <View style={styles.qrCodeContainer}>
            {qrCodeData && <QRCode value={qrCodeData} size={200} />}
          </View>
          {userDetails && (
            <>
              <View style={styles.detailsContainer}>
                <Text style={styles.userName}>{userDetails?.name}</Text>
                <Text
                  style={styles.userDetails}
                >{`${userDetails.Age} | ${userDetails.gender}`}</Text>

                <Text style={styles.bookingDetails}>{`${formatDate(
                  selectedSlot.dateTime.toDate()
                )} | ${formatTime(selectedSlot.dateTime.toDate())}`}</Text>
              </View>
            </>
          )}
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>
              Please show this QR code during your entry
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("HomeTabs")}
      >
        <Text style={styles.homeButtonText}>Go back home</Text>
      </TouchableOpacity>
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
  },
  card: {
    paddingVertical: 30,
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
    marginBottom: 8,
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
export default QRCodeScreen;
