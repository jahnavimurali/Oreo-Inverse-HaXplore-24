import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import colors from "../Constants/Colors";
import { useTranslation } from "./Translation"; //custom hook for translation
import languages from "../Constants/Language";
import { Picker } from "@react-native-picker/picker";
import { firebase_auth } from "./components/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from "./components/UserContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserEmail } = useUser();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const unsubscribe = firebase_auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("HomeTabs");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(firebase_auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with ", user.email);
        setUserEmail(userCredentials.user.email);
      })
      .catch((error) => alert("Invalid login credentials"));
  };

  // Update the useTranslation hook to use selectedLanguage
  const translatedWelcomeBack = useTranslation(
    "Welcome back",
    "en",
    selectedLanguage
  );
  const translatedLogin = useTranslation("Login", "en", selectedLanguage);
  const translatedDontHaveAccount = useTranslation(
    "Don't have an account?",
    "en",
    selectedLanguage
  );
  const translatedRegister = useTranslation("Register", "en", selectedLanguage);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        style={styles.picker}
      >
        {Object.entries(languages).map(([label, value]) => (
          <Picker.Item key={value} label={label} value={value} />
        ))}
      </Picker>

      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          marginBottom: 20,
          fontWeight: "900",
        }}
      >
        {translatedWelcomeBack}
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
        <Text style={styles.text}>{translatedLogin}</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>{translatedDontHaveAccount} </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>{translatedRegister}</Text>
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
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 20,
  },
});
