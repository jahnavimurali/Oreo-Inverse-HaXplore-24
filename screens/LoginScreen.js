import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import colors from "../Constants/Colors";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.navigate("HomeTabs");
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          marginBottom: 20,
          fontWeight: "900",
        }}
      >
        Welcome back
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor={"black"}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={"black"}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 8,
  },

  loginButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.PrimaryButtonColor,
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  registerText: {
    color: colors.PrimaryButtonColor,
  },
});
