import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <Pressable style={styles.button}>
        <Ionicons name="menu" size={24} color="white" />
      </Pressable>
      <Text style={styles.title}>Booking Room</Text>
      <Pressable style={styles.button}>
        <FontAwesome5 name="user" size={24} color="white" />
      </Pressable>
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
