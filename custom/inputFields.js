import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const CustomInput = ({
  inputName,
  placeholder,
  onChangeText,
  secureTextEntry = false,
  value,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{inputName}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

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

export default CustomInput;
