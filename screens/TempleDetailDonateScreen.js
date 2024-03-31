import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomInput from "../custom/inputFields";
import colors from "../Constants/Colors";

export default function TempleDetailDonateScreen({ navigation }) {
  const [amount, setAmount] = useState(0);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ margin: 20, padding: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Donate to this temple
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "400" }}>
          Securely donate through our secure and safe transaction portal
        </Text>
      </View>
      <View style={{ marginHorizontal: 40 }}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder={"Enter amount in Rs."}
            placeholderTextColor={"black"}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: colors.PrimaryButtonColor,
          padding: 15,
          borderRadius: 5,
          margin: 20,

          marginHorizontal: 40,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Donate now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  label: {
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 14,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    padding: 10,
    borderRadius: 8,
  },
});
