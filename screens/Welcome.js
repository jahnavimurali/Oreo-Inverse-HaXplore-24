import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Button from "./components/Button";

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient style={styles.container} colors={["#FFDEAB", "#FFFFFF"]}>
      <Image
        source={require("../assets/Images/logo.png")}
        style={styles.logo}
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Worship without worry</Text>
        <Text style={styles.subtitle}>
          Book tickets, choose your slot and enhance your temple experience on
          Vihara
        </Text>
      </View>

      <Button
        title="Join Now"
        onPress={() => navigation.navigate("Auth", { screen: "Register" })}
        style={styles.joinNowButton}
      />

      <View style={styles.loginSuggestion}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Pressable
          onPress={() => navigation.navigate("Auth", { screen: "Login" })}
        >
          <Text style={styles.loginButton}>Login</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
  },
  logo: {
    height: 150,
    width: 100,
    marginBottom: 70,
    marginTop: 220,
  },
  textContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 90,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  joinNowButton: {
    width: "100%",
    marginTop: 20,
  },
  loginSuggestion: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#000",
  },
  loginButton: {
    fontSize: 16,
    color: "#DC4F00",
    fontWeight: "bold",
    marginLeft: 4,
  },
});

export default Welcome;
