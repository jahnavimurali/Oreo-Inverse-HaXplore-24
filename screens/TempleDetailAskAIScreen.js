import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as GoogleGenerativeAI from "@google/generative-ai";
import colors from "../Constants/Colors";

const TempleDetailAskAIScreen = ({ route }) => {
  const { item } = route.params;
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyD-XOPlyTGUWLcFdiFWd9g7ksF-rZN23Ds";

  // Function to simulate starting the chat
  useEffect(() => {
    setMessages([
      {
        id: 0,
        text: "Welcome to the Temple Information Assistant. How can I help you today?",
        type: "bot",
      },
    ]);
  }, []);

  const sendMessage = async () => {
    const messageID = messages.length;
    setLoading(true);
    // Add user's message
    const userMessage = { id: Date.now(), text: userInput, type: "user" };

    // Add user's message to the start of the messages array
    setMessages((prevMessages) => [userMessage, ...prevMessages]);

    // Add a pause for better UX
    setTimeout(async () => {
      // Simulate AI response
      const prompt = `For temple ${item.templeName}, the user asked: "${userInput}"`;
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = result.response;
      const botMessageText = response.text();

      // This is a placeholder for the actual AI response

      // const botMessageText = "This is a simulated response from the AI.";
      const botMessage = {
        id: Date.now() + 1, // Ensure a unique ID for the bot message
        text: botMessageText,
        type: "bot",
      };

      setMessages((prevMessages) => [botMessage, ...prevMessages]);
      setLoading(false);
    }, 1000);

    setUserInput("");
  };

  const parseMarkdown = (text) => {
    // Split the text into lines
    const lines = text.split("\n");

    // Map over each line to create text elements
    return lines.map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        // It's a heading
        const heading = line.slice(2, -2); // Remove the asterisks
        return (
          <Text key={index} style={styles.heading}>
            {heading}
          </Text>
        );
      } else if (line.startsWith("* ")) {
        // It's a bullet point
        const bulletPoint = line.slice(2); // Remove the asterisk and space
        return (
          <Text key={index} style={styles.bulletPoint}>
            {"\u2022 " /* Unicode bullet point */ + bulletPoint}
          </Text>
        );
      } else {
        // It's normal text
        return (
          <Text key={index} style={styles.normalText}>
            {line}
          </Text>
        );
      }
    });
  };

  const renderMessage = ({ item }) => {
    // If the message is from the bot and contains Markdown, parse it
    if (item.type === "bot") {
      const parsedText = parseMarkdown(item.text);
      return (
        <View style={[styles.messageContainer, styles.botMessage]}>
          {parsedText}
        </View>
      );
    } else {
      // If it's a user message or doesn't contain Markdown, render it normally
      return (
        <View style={[styles.messageContainer, styles.userMessage]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        inverted
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask something..."
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
          placeholderTextColor="#999"
          returnKeyType="send"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 15,
    maxWidth: "75%",
  },
  botMessage: {
    backgroundColor: "#e5e5ea",
    alignSelf: "flex-start",
  },
  userMessage: {
    backgroundColor: "#ffce91",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    backgroundColor: colors.PrimaryButtonColor,
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
  },
  bulletPoint: {
    fontSize: 14,
  },
  normalText: {
    fontSize: 14,
  },
});

export default TempleDetailAskAIScreen;
