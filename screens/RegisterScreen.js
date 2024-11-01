import React, { useReducer, useCallback, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { signUp } from "../utils/actions/authActions";
import { reducer } from "../utils/reducers/formReducers";
import { validateInput } from "../utils/actions/formActions";

const initialState = {
  inputValues: {
    fullName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    fullName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const RegisterScreen = ({ navigation }) => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  // const handleRegister = async () => {
  //   const { fullName, email, password } = formState.inputValues;

  //   if (!formState.formIsValid) {
  //     Alert.alert("Error", "Please fill in all fields correctly.");
  //     return;
  //   }

  //   try {
  //     await dispatch(signUp(fullName, email, password));
  //     Alert.alert("Success", "Account created successfully!");
  //     navigation.navigate("LoginScreen");
  //   } catch (error) {
  //     Alert.alert("Registration Failed", error.message);
  //   }
  // };

  const handleRegister = async () => {
    const { fullName, email, password } = formState.inputValues;

    if (!formState.formIsValid) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try {
      const result = await dispatch(signUp(fullName, email, password));
      if (result) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("LoginScreen"); // Điều hướng về LoginScreen
      }
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formState.inputValues.fullName}
        onChangeText={(text) => inputChangedHandler("fullName", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formState.inputValues.email}
        onChangeText={(text) => inputChangedHandler("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formState.inputValues.password}
        onChangeText={(text) => inputChangedHandler("password", text)}
        secureTextEntry
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#003580",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
  loginButton: {
    marginTop: 20,
  },
  loginText: {
    color: "#003580",
    fontSize: 16,
  },
});
