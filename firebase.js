// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
