import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TempleCard from "../custom/TempleCard";

// Sample data for temples
const sampleTemples = [
  {
    id: "1",
    name: "Golden Temple",
    location: "Amritsar, India",
    image:
      "https://cityfurnish.com/blog/wp-content/uploads/2024/01/9087-min-1200x753.jpg",
  },
  {
    id: "2",
    name: "Meenakshi Temple",
    location: "Madurai, India",
    image:
      "https://t4.ftcdn.net/jpg/04/44/38/47/360_F_444384718_7DDIjSOn7KK3zYlDTCuqoNViziRQWgU4.jpg",
  },
  {
    id: "3",
    name: "Tirupati Balaji",
    location: "Tirupati, India",
    image:
      "https://cityfurnish.com/blog/wp-content/uploads/2024/01/9087-min-1200x753.jpg",
  },
  {
    id: "4",
    name: "Siddhivinayak Temple",
    location: "Mumbai, India",
    image:
      "https://t4.ftcdn.net/jpg/04/44/38/47/360_F_444384718_7DDIjSOn7KK3zYlDTCuqoNViziRQWgU4.jpg",
  },
  {
    id: "5",
    name: "Somnath Temple",
    location: "Gujarat, India",
    image:
      "https://cityfurnish.com/blog/wp-content/uploads/2024/01/9087-min-1200x753.jpg",
  },
  // Add more temples as needed
];

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    // You can also implement search functionality here if needed
  };

  // Only filter temples if there's a search query
  const filteredTemples = searchQuery
    ? sampleTemples.filter(
        (temple) =>
          temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          temple.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []; // Return an empty array if there's no search query

  const contentContainerStyle = searchQuery
    ? styles.contentContainer
    : styles.contentContainerCentered;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TopView}>
        <Text style={styles.TopText}>Find temples</Text>
      </View>
      <View style={styles.TempleView}>
        <Image
          source={require("../assets/Images/temple_sticker.png")}
          style={styles.TempleImg}
        />
        <Text style={styles.TempleText}>
          Which temple would you like to visit, Kaalu?
        </Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Brihadeeswara Temple, Thanjavur"
        value={searchQuery}
        onChangeText={handleSearchChange}
        placeholderTextColor={"black"}
      />
      {searchQuery && ( // Only render FlatList if there is a search query
        <FlatList
          data={filteredTemples}
          keyExtractor={(item) => item.id}
          style={styles.templelist}
          renderItem={({ item }) => (
            <TempleCard
              name={item.name}
              location={item.location}
              imageUrl={item.image}
              onPress={() => {
                navigation.navigate("TempleDetail", {
                  name: item.name,
                  location: item.location,
                  imageUrl: item.image,
                });
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Added to ensure SafeAreaView fills the screen
    backgroundColor: "white",
  },
  TopView: {
    padding: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  TopText: {
    fontWeight: "900",
    fontSize: 24,
    marginLeft: 10,
  },
  TempleImg: {
    marginLeft: 5,
    width: 60,
    height: 60,
  },
  TempleText: {
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  TempleView: {
    padding: 15,
    paddingBottom: 0,
  },
  searchInput: {
    height: 60,
    marginHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10, // Rounded corners for the input field
    borderColor: "gray", // Light gray border color
  },
  templeItem: {
    padding: 10,
    fontSize: 18,
  },
  templelist: {
    padding: 15,
  },
});
