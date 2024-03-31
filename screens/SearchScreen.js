import React, { useState, useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  FlatList,
  zz,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TempleCard from "../custom/TempleCard";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import db from "./components/firebaseconfig"; // Make sure this is the correct path
import { useFocusEffect } from "@react-navigation/native";

export default function SearchScreen({ navigation }) {
  const [temples, setTemples] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useFocusEffect(
    useCallback(() => {
      const fetchTemples = async () => {
        const querySnapshot = await getDocs(collection(db, "Temples"));
        const templePromises = querySnapshot.docs.map(async (doc) => {
          console.log(doc.id);
          const templeData = doc.data();
          const imageRef = ref(getStorage(), templeData.templeImage);
          const imageUrl = await getDownloadURL(imageRef);
          return {
            ...templeData,
            id: doc.id,
            imageUrl,
          };
        });
        const templesData = await Promise.all(templePromises);
        setTemples(templesData);
      };

      fetchTemples();
    }, [])
  );

  // The rest of your component code remains the same

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const filteredTemples = searchQuery
    ? temples.filter(
        (temple) =>
          temple.templeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          temple.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : temples;

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
      {searchQuery && filteredTemples.length > 0 ? (
        <FlatList
          data={filteredTemples}
          keyExtractor={(item) => item.id}
          style={styles.templelist}
          renderItem={({ item }) => (
            <TempleCard
              name={item.templeName}
              location={item.location}
              imageUrl={item.imageUrl}
              onPress={() => {
                navigation.navigate("TempleDetail", {
                  item: item,
                });
              }}
            />
          )}
        />
      ) : searchQuery && filteredTemples.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No temples found</Text>
        </View>
      ) : null}
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
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
});
