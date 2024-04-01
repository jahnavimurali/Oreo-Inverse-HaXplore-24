import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import db from "./components/firebaseconfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "./components/UserContext";
import colors from "../Constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BookingCard = ({ booking, type, navigation }) => {
  const formattedDate = getFormattedDate(
    booking.bookedSlot.seconds,
    booking.bookedSlot.nanoseconds
  );

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        {booking.Name || booking.serviceName}
      </Text>
      <Text style={{ fontWeight: "bold" }}>{booking.templeName}</Text>
      <Text style={{ fontWeight: "600" }}>{booking.templeLocation}</Text>
      <Text>{formattedDate}</Text>
      <Text style={styles.cardPrice}>₹{booking.paidAmount}</Text>
      <Text>{booking.noOfPersons} person(s)</Text>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate("BookingDetail", { booking })}
      >
        <MaterialCommunityIcons name="ticket-outline" size={24} color="white" />
        <Text style={styles.bookButtonText}>View ticket</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function TicketsScreen({ navigation }) {
  const { userEmail } = useUser();
  const [bookings, setBookings] = useState({
    darshanBookings: [],
    pujaBookings: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchUserByEmail = async () => {
        setIsLoading(true);
        if (!userEmail) return;
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("Email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userBookings = querySnapshot.docs[0].data();
          setBookings({
            darshanBookings: userBookings.darshanBookings || [],
            pujaBookings: userBookings.pujaBookings || [],
          });
        }
        setIsLoading(false);
      };
      fetchUserByEmail();
    }, [userEmail])
  );

  if (isLoading) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color={"blue"} />
      </View>
    );
  }

  const renderBookings = (bookings, type, navigation) => {
    if (bookings.length === 0) {
      return (
        <Text
          style={{ fontSize: 16, fontWeight: "500", color: "red", padding: 20 }}
        >
          No {type} Bookings
        </Text>
      );
    }
    return bookings.map((booking, index) => (
      <BookingCard
        key={index}
        booking={booking}
        type={type}
        navigation={navigation}
      />
    ));
  };

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "white" }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.sectionTitle}>Darshan Bookings</Text>
          <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
            {renderBookings(bookings.darshanBookings, "Darshan", navigation)}
          </View>

          <View></View>
          <Text style={styles.sectionTitle}>Puja Bookings</Text>
          <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
            {renderBookings(bookings.pujaBookings, "Puja", navigation)}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const getFormattedDate = (seconds, nanoseconds) => {
  const date = new Date(seconds * 1000);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

const styles = StyleSheet.create({
  centeredLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 40,
  },
  sectionTitle: {
    fontWeight: "900",
    fontSize: 20,
    marginTop: 30,
    marginHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    width: "100%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardPrice: {
    color: "green",
    fontWeight: "600",
    fontSize: 16,
  },
  cardDescription: {
    marginTop: 14,
    color: "gray",
    marginVertical: 8,
    fontWeight: "500",
  },
  fullButton: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  fullButtonText: {
    color: "white",
    marginLeft: 8,
  },
  bookButton: {
    backgroundColor: colors.PrimaryButtonColor,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: "row",
  },
  bookButtonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "500",
  },
});
