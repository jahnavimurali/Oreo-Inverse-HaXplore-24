import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomInput from "../custom/inputFields";
import colors from "../Constants/Colors";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");

  const handleregister = () => {
    navigation.navigate("HomeTabs");
  };

  return (
    <SafeAreaView style={{ display: "flex", justifyContent: "space-between" }}>
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
              />
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Gender</Text>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                style={styles.picker}
                mode="dropdown" // Android only
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleregister} style={styles.registerButton}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    marginRight: 25, // Adjust based on your layout
  },
  pickerContainer: {
    flex: 1,
  },
  pickerLabel: {
    marginBottom: 10, // Space between label and input field
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
