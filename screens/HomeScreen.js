import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../components/Header";
import { fetchRooms } from "../services/dataService";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchRooms((data) => {
      const roomList = Object.keys(data)
        .flatMap((key) =>
          Object.keys(data[key]).map((roomKey) => ({
            ...data[key][roomKey],
            id: roomKey, // Gán `roomKey` làm `id` nếu chưa có `id`
          }))
        )
        .filter((room) => room.name && room.pricePerNight); // Lọc chỉ lấy các mục hợp lệ
      setRooms(roomList);
    });
  }, []);
  console.log("Rooms:", rooms);

  const renderRoomItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("RoomDetail", { room: item })}
    >
      <View style={styles.roomItem}>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.roomImage}
            resizeMode="cover"
          />
        )}
        <Text style={styles.roomTitle}>Room Name: {item.name || "N/A"}</Text>
        <Text style={styles.roomDetails}>
          Location: {item.location || "N/A"}
        </Text>

        <Text style={styles.roomDetails}>
          Price per Night:{" "}
          {item.pricePerNight ? `$${item.pricePerNight}` : "N/A"}
        </Text>
        <Text style={styles.roomDescription}>
          Description: {item.description || "No description available"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Available Rooms</Text>
        <FlatList
          data={rooms}
          renderItem={renderRoomItem}
          keyExtractor={(item) => item.id} // Sử dụng `item.id` làm key duy nhất
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#003580",
  },
  roomItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  roomImage: {
    width: "100%",
    height: 150, // Đảm bảo có chiều cao cụ thể cho ảnh
    borderRadius: 8,
    marginBottom: 10,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roomDetails: {
    fontSize: 16,
    color: "#555",
  },
  roomDescription: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
});

// import React, { useEffect } from "react";
// import { View, Text, Button } from "react-native";
// import { uploadAllData } from "../services/uploadData";

// const HomeScreen = () => {
//   // Gọi hàm khi màn hình được tải
//   useEffect(() => {
//     uploadAllData();
//   }, []);

//   return (
//     <View>
//       <Text>HomeScreen</Text>
//       <Button title="Upload Data to Firebase" onPress={uploadAllData} />
//     </View>
//   );
// };

// export default HomeScreen;
