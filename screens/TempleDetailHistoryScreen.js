import React from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TempleDetailHistoryScreen({ route }) {
  const { item } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Text style={{ fontSize: 20, padding: 20, fontWeight: "500" }}>
        {item.history}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
