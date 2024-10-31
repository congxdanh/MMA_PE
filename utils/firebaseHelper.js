// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseApp;
export const getFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyAA_U05b88l1EZHbXtLprX8uq6bnZMNH3I",
    authDomain: "bookingroom-27946.firebaseapp.com",
    databaseURL: "https://bookingroom-27946-default-rtdb.firebaseio.com",
    projectId: "bookingroom-27946",
    storageBucket: "bookingroom-27946.appspot.com",
    messagingSenderId: "110165986536",
    appId: "1:110165986536:web:31bd416f6fd99c84da8d5d",
    measurementId: "G-B1ENK0FFDQ",
  };

  // Initialize Firebase
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  // Initialize Firebase Auth
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

  firebaseApp = app;

  return app;
};
