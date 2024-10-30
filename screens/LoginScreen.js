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

const LoginScreen = () => {
  const navigation = useNavigation(); // Get the navigation object

  // State variables to hold user input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Basic validation for empty fields
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Here you would usually handle the login logic with Firebase or any other service.
    // For now, we navigate to the Main screen
    navigation.navigate("Main");
  };

  const handleRegister = () => {
    // Navigate to the Register screen when the button is pressed
    navigation.navigate("RegisterScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
  registerButton: {
    marginTop: 20, // Space above the register button
  },
  registerText: {
    color: "#003580", // Color for the register link
    fontSize: 16,
  },
});
