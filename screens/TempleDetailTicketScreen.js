import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../Constants/Colors";

// Component to represent a single darshan/sewa card
const DarshanCard = ({ darshan, navigation, item }) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.cardTitle}>{darshan.darshanName}</Text>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.cardPrice}>₹{darshan.darshanFee}</Text>
          <Text>per head</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{darshan.darshanDesc}</Text>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() =>
          navigation.navigate("BookingSlots", {
            item: item, // Assume 'item.templeName' is the name of the temple
            service: darshan, // Or puja.pujaName for PujaCard
          })
        }
      >
        <MaterialCommunityIcons name="ticket-outline" size={24} color="white" />
        <Text style={styles.bookButtonText}>Book now</Text>
      </TouchableOpacity>
    </View>
  );
};

const PujaCard = ({ puja, navigation, item }) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.cardTitle}>{puja.pujaName}</Text>
        <View style={{ alignItems: "center", paddingLeft: 20 }}>
          <Text style={styles.cardPrice}>₹{puja.pujaFee}</Text>
          <Text>per head</Text>
        </View>
      </View>
      <Text style={styles.cardDescription}>{puja.pujaDesc}</Text>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() =>
          navigation.navigate("BookingSlots", {
            item: item,
            service: puja,
          })
        }
      >
        <MaterialCommunityIcons name="ticket-outline" size={24} color="white" />
        <Text style={styles.bookButtonText}>Book now</Text>
      </TouchableOpacity>
    </View>
  );
};

const TempleDetailTicketScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const alerts = item.alerts || ["No current alerts"];
  const [totalFreeSlots, setTotalFreeSlots] = useState(0);

  const calculateFreeSlots = () => {
    const currentDateTime = new Date();
    let freeSlots = 0;

    const allSlots = [
      ...item.Darshan.flatMap((d) => d.Slots),
      ...item.Puja.flatMap((p) => p.Slots),
    ];

    allSlots.forEach((slot) => {
      const slotDateTime = slot.dateTime.toDate();
      console.log(slotDateTime);

      if (
        slotDateTime.getDate() === currentDateTime.getDate() &&
        slotDateTime.getMonth() === currentDateTime.getMonth() &&
        slotDateTime.getFullYear() === currentDateTime.getFullYear()
      ) {
        // Only include slots for today
        const freeSlotsForThisSlot =
          slot.maxBookings - Number(slot.currentBookings);
        freeSlots += freeSlotsForThisSlot;
        console.log(freeSlotsForThisSlot);
      }
    });

    console.log("Free slot", freeSlots);

    setTotalFreeSlots(freeSlots);
  };

  useEffect(() => {
    calculateFreeSlots();
    calculateAverageWaitTime();
  }, [item.activeVisitors, item.Darshan, item.Puja]);

  const calculateAverageWaitTime = () => {
    // Constants for queue movement
    const peoplePerTimeFrame = 5;
    const timeFrameInSeconds = 20;

    // Calculate total queues
    const totalQueues = item.Darshan.length + item.Puja.length;

    // Calculate total visitors per queue
    const avgVisitorsPerQueue = item.activeVisitors / totalQueues;

    // Estimate time to serve one person in seconds
    const timeToServeOnePerson = timeFrameInSeconds / peoplePerTimeFrame;

    // Calculate total wait time in seconds without considering free slots
    const totalWaitTimeInSeconds = avgVisitorsPerQueue * timeToServeOnePerson;

    // Adjust wait time based on free slots (consider each free slot as reducing wait time slightly)
    // Assume each free slot reduces the wait for one person
    const totalFreeSlotsToday = totalFreeSlots; // Total free slots for the day
    const avgFreeSlotsPerQueue = totalFreeSlotsToday / totalQueues;

    // Consider each free slot reduces the wait time for one visitor
    const adjustedWaitTimeInSeconds = Math.max(
      totalWaitTimeInSeconds - avgFreeSlotsPerQueue * timeToServeOnePerson,
      20
    );

    return convertSecondsToHrsMins(adjustedWaitTimeInSeconds);
  };

  const convertSecondsToHrsMins = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours > 0 ? hours + "h " : ""}${minutes}m`;
  };

  const renderDarshansAndSewas = () => {
    return (
      <>
        <Text style={styles.sectionTitle}>Darshans</Text>
        {item.Darshan.map((darshan, index) => (
          <DarshanCard
            key={index}
            darshan={darshan}
            navigation={navigation}
            item={item}
          />
        ))}
        <Text style={styles.sectionTitle}>Pujas</Text>
        {item.Puja.map((puja, index) => (
          <PujaCard
            key={index}
            puja={puja}
            navigation={navigation}
            item={item}
          />
        ))}
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.templeImage} />
      <View style={styles.alertsContainer}>
        <View style={styles.alertsHeader}>
          <View style={styles.alertsHeaderTextContainer}>
            <Feather name="alert-circle" size={24} color="black" />
            <Text style={styles.alertsHeaderText}>Alerts and updates</Text>
          </View>
          <Text style={styles.lastUpdatedText}>Last updated 2 mins ago</Text>
        </View>
        {alerts.map((alert, index) => (
          <Text key={index} style={styles.alertText}>
            • {alert}
          </Text>
        ))}
      </View>

      <View style={styles.livevisitors}>
        <View style={styles.livevisitorsheader}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Live visitors
          </Text>
          <Text>Last updated 5 mins ago</Text>
        </View>
        <View style={styles.liveInfoContainer}>
          <View style={styles.infoCard}>
            <Ionicons name="people" size={24} color="black" />
            <Text
              style={{ fontWeight: "bold", fontSize: 14, paddingVertical: 5 }}
            >
              Total Visitors
            </Text>
            <Text style={styles.numberText}>{item.activeVisitors}</Text>
          </View>
          <View style={styles.infoCard}>
            <Feather name="calendar" size={24} color="black" />
            <Text
              style={{ fontWeight: "bold", fontSize: 14, paddingVertical: 5 }}
            >
              Free Slots Today
            </Text>
            <Text style={styles.numberText}>{totalFreeSlots}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={styles.infoCard}>
            <Feather name="loader" size={24} color="black" />
            <Text
              style={{ fontWeight: "bold", fontSize: 14, paddingVertical: 5 }}
            >
              Avg Wait Time
            </Text>
            <Text style={styles.numberText}>{calculateAverageWaitTime()}</Text>
          </View>
        </View>
      </View>
      {renderDarshansAndSewas()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  templeImage: {
    width: "100%",
    height: 200,
  },
  alertsContainer: {
    padding: 16,
    backgroundColor: "rgba(231, 139, 0, 0.06)",
    marginTop: 30,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E78B00",
  },
  alertsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  alertsHeaderTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  alertsHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  lastUpdatedText: {
    fontSize: 12,
    color: "gray",
  },
  alertText: {
    fontSize: 14,
    color: "black",
    paddingVertical: 4,
    fontWeight: "bold",
    marginLeft: 10,
  },
  livevisitors: {
    margin: 20,
  },
  livevisitorsheader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  livecount: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 10,
  },

  liveInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    marginTop: 16,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: 150,
  },
  numberText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  bookButtonText: {
    color: "white",
    marginLeft: 8,
  },
});

export default TempleDetailTicketScreen;
