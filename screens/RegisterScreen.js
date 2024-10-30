import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from React Navigation

const RegisterScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  // State variables to hold user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // Basic validation for empty fields
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Here you would typically handle the registration logic with Firebase or another service.
    // For now, we will just navigate back to the Login screen.
    Alert.alert("Success", "Registration successful!");
    navigation.navigate("LoginScreen"); // Navigate back to LoginScreen after successful registration
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail} // Update email state
        keyboardType="email-address" // Email keyboard
        autoCapitalize="none" // Disable automatic capitalization
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword} // Update password state
        secureTextEntry // Hide password input
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword} // Update confirm password state
        secureTextEntry // Hide confirm password input
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.loginText}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20, // Add some padding
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%", // Full width
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#ffffff", // Background color for inputs
  },
  button: {
    backgroundColor: "#003580",
    padding: 10,
    borderRadius: 5,
    width: "100%", // Full width for button
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center", // Center the text in the button
  },
  loginButton: {
    marginTop: 20, // Space above the login button
  },
  loginText: {
    color: "#003580", // Color for the login link
    fontSize: 16,
  },
});
