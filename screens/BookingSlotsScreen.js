import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../Constants/Colors";
import { Picker } from "@react-native-picker/picker";

const BookingSlotsScreen = ({ route, navigation }) => {
  const { item, service } = route.params;
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);

  const getFormattedDate = (dayOffset) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSlotsForDay = (dayOffset) => {
    const startOfDay = new Date();
    startOfDay.setDate(startOfDay.getDate() + dayOffset);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(startOfDay.getDate() + 1);

    return service.Slots.filter((slot) => {
      const slotDate = slot.dateTime.toDate();
      return slotDate >= startOfDay && slotDate < endOfDay;
    });
  };

  const renderSlotCards = (slots, dayLabel) => {
    if (slots.length === 0) {
      return (
        <View style={styles.dateContainer}>
          <Text style={styles.dateHeader}>{dayLabel}</Text>
          <Text style={styles.noSlotsText}>No slots available</Text>
        </View>
      );
    }

    return (
      <View style={styles.dateContainer}>
        <Text style={styles.dateHeader}>{dayLabel}</Text>
        <View style={styles.slotsContainer}>
          {slots.map((slot, index) => {
            const slotsLeft = slot.maxBookings - slot.currentBookings;
            const isFull = slotsLeft <= 0;
            const isSelected = selectedSlot === slot;

            const slotTime = slot.dateTime.toDate().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.slotCard,
                  isFull && styles.slotCardFull,
                  isSelected && styles.slotCardSelected,
                ]}
                disabled={isFull}
                onPress={() => !isFull && setSelectedSlot(slot)}
              >
                <Text style={styles.slotTime}>{slotTime}</Text>
                <Text
                  style={[
                    styles.slotsLeft,
                    slotsLeft < 20 && styles.slotsLeftRed,
                  ]}
                >
                  {isFull ? "Full" : `${slotsLeft} slots left`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Choose your slot</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={numberOfPersons}
              onValueChange={(itemValue, itemIndex) =>
                setNumberOfPersons(itemValue)
              }
              style={styles.pickerStyle}
            >
              <Picker.Item label="1 person" value={1} />
              <Picker.Item label="2 people" value={2} />
              <Picker.Item label="3 people" value={3} />
            </Picker>
          </View>
        </View>
        <View>
          {renderSlotCards(getSlotsForDay(0), getFormattedDate(0))}
          {renderSlotCards(getSlotsForDay(1), getFormattedDate(1))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.bookButton}
        disabled={!selectedSlot}
        onPress={() => {
          if (selectedSlot) {
            navigation.navigate("Payment", {
              item: item,
              selectedSlot: selectedSlot,
              numberOfPersons: numberOfPersons,
              service: service,
            });
          }
        }}
      >
        <Text style={styles.bookButtonText}>Book this slot</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 24,
    fontWeight: "900",
    textAlign: "left",
  },
  todayHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
  },

  dateContainer: {
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  slotCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
    minWidth: "30%",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#e6e6e6",
    alignItems: "center",
    justifyContent: "center",
  },
  slotCardFull: {
    backgroundColor: "#EEEEEE",
    borderColor: "#AAAAAA",
  },
  slotCardSelected: {
    borderColor: "black",
  },
  slotTime: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  slotsLeft: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "600",
  },
  noSlotsText: {
    fontSize: 18,
    color: "#FF0000",
    alignSelf: "center",
    fontWeight: "500",
  },

  bookButton: {
    backgroundColor: colors.PrimaryButtonColor,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    alignItems: "center",
    margin: 20,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 20,
  },
  pickerStyle: {
    height: 50,
    width: "100%",
  },
  slotsLeftRed: {
    fontSize: 14,
    color: "#FF0000",
  },
});

export default BookingSlotsScreen;
