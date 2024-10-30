import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import StackNavigator from "./StackNavigator"; // Import StackNavigator

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#003580" />
      <StackNavigator />
    </SafeAreaView>
  );
};

export default App;
