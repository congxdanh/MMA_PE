import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { logout } from "../utils/actions/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout()); // Thực hiện logout khi nhấn vào biểu tượng người dùng
  };

  return (
    <View style={styles.header}>
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
    flexDirection: "row", // Sắp xếp các thành phần theo hàng ngang
    justifyContent: "space-between", // Phân bổ khoảng cách giữa các thành phần
    alignItems: "center", // Căn giữa theo chiều dọc
    height: 60, // Chiều cao của header
    backgroundColor: "#003580", // Màu nền của header
    paddingHorizontal: 15, // Padding hai bên
  },
  title: {
    fontSize: 20, // Kích thước chữ
    color: "white", // Màu chữ
    fontWeight: "bold", // Đậm chữ
  },
  button: {
    padding: 10, // Padding cho nút
  },
});
