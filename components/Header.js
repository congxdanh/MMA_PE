import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { logout } from "../utils/actions/authActions";
import { useNavigation, useRoute } from "@react-navigation/native";

const Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleGoBack = () => {
    // Nếu đang ở trang RoomDetail, quay lại Home
    if (route.name === "RoomDetail") {
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.header}>
      {/* Chỉ hiển thị nút quay lại nếu ở trang RoomDetail */}
      {route.name === "RoomDetail" && (
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>Booking Room</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <MaterialIcons name="logout" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#003580",
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  button: {
    padding: 10,
  },
});
