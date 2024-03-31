import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import Button from './components/Button';

const Welcome = ({ navigation }) => {
    return (
        <LinearGradient
            style={styles.container}
            colors={["#FFDEAB", "#FFFFFF"]}
        >
            <Image
                source={require("../assets/Images/logo.png")}
                style={styles.logo}
            />

            {/* Texts directly below the image, letting the container's flex layout handle positioning */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>Worship without worry</Text>
                <Text style={styles.subtitle}>
                    Book tickets, choose your slot and enhance your temple experience on TemplePass
                </Text>
            </View>

            {/* Button and login suggestion */}
            <Button
                title="Join Now"
                onPress={() => navigation.navigate("Auth", {screen: 'Register'})}
                style={styles.joinNowButton}
            />

            <View style={styles.loginSuggestion}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Pressable onPress={() => navigation.navigate("Auth", {screen: 'Login'})}>
                    <Text style={styles.loginButton}>Login</Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 22,
    },
    logo: {
        height: 100,
        width: 69,
        marginBottom: 70,
        marginTop: 220 // Adjust this value as needed
    },
    textContainer: {
        width: "90%",
        alignItems: 'center',
        marginBottom: 90, // Space between text and button
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        paddingBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
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
        color: '#000',
    },
    loginButton: {
        fontSize: 16,
        color: '#000',
        fontWeight: "bold",
        marginLeft: 4,
    },
});

export default Welcome;
