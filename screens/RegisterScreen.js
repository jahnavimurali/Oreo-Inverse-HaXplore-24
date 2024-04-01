import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomInput from "../custom/inputFields";
import colors from "../Constants/Colors";
import { firebase_auth } from "./components/firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useUser } from "./components/UserContext";

export default function RegisterScreen({ navigation }) {
  const { setUserEmail } = useUser();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [age, setAge] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");
  const [gender, setGender] = React.useState("");

  const handleregister = () => {
    createUserWithEmailAndPassword(firebase_auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        setUserEmail(userCredentials.user.email);
        console.log("User registered:", user.email);

        const userDocRef = doc(db, "Users", user.uid);
        await setDoc(userDocRef, {
          Age: age,
          Email: email,
          Gender: gender.toLowerCase(),
          Uname: name,
          Upassword: password,
          darshanBookings: [],
          grievances: [],
          mobile: phoneNo,
          pujaBookings: [],
        });
        navigation.navigate("HomeTabs");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View>
            <View style={styles.topView}>
              <Text style={styles.topText}>
                Sign up and get started on finding the right temples
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <CustomInput
                inputName="Name"
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
              <CustomInput
                inputName="Email ID"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />
              <CustomInput
                inputName="Create a password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <View style={styles.row}>
                <View style={styles.ageInput}>
                  <CustomInput
                    inputName="Age"
                    placeholder="Age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    placeholderTextColor={"black"}
                  />
                </View>
                <View style={styles.pickerContainer}>
                  <Text style={styles.pickerLabel}>Gender</Text>
                  <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                      setGender(itemValue)
                    }
                    style={styles.picker}
                    mode="dropdown" // Android only
                  >
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                  </Picker>
                </View>
              </View>
              <CustomInput
                inputName="Phone Number"
                placeholder="Enter your phone number"
                value={phoneNo}
                onChangeText={setPhoneNo}
                keyboardType="numeric"
                placeholderTextColor={"black"}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={handleregister}
          style={styles.registerButton}
        >
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  topView: {
    padding: 10,
    paddingTop: 70,
  },
  topText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: {
    padding: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ageInput: {
    flex: 1,
    marginRight: 25,
  },
  pickerContainer: {
    flex: 1,
  },
  pickerLabel: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderStyle: "solid",
  },
  registerButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.PrimaryButtonColor,
    alignItems: "center",
    margin: 20,
    height: 54,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
