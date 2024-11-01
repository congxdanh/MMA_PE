import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import StackNavigator from "./StackNavigator"; // Import StackNavigator
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./components/Header";
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#003580" />
        <Header />
        <StackNavigator />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
