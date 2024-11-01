// RoomDetailScreen.js
import React from "react";
import { View, Text, StyleSheet, Image, Button, FlatList } from "react-native";
import MapView, { Marker } from "react-native-maps";

const RoomDetailScreen = ({ route }) => {
  const { room } = route.params; // Nhận dữ liệu từ điều hướng

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {/* Hiển thị hình ảnh phòng */}
      {room.image && (
        <Image
          source={{ uri: room.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {/* Hiển thị tên phòng */}
      <Text style={styles.title}>{room.name}</Text>

      {/* Hiển thị vị trí và thông tin khác */}
      <Text style={styles.info}>
        Location: {room.location || "Not specified"}
      </Text>
      <Text style={styles.info}>
        Price per Night: ${room.pricePerNight || "N/A"}
      </Text>
      <Text style={styles.info}>
        Description: {room.description || "No description available"}
      </Text>

      {/* Hiển thị tiện nghi (amenities) */}
      <Text style={styles.subTitle}>Amenities:</Text>
      {room.amenities ? (
        room.amenities.map((amenity, index) => (
          <Text key={index} style={styles.amenity}>
            - {amenity}
          </Text>
        ))
      ) : (
        <Text style={styles.amenity}>No amenities specified</Text>
      )}

      {/* Hiển thị bản đồ với vị trí của phòng */}
      {room.coordinates && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(room.coordinates.latitude),
            longitude: parseFloat(room.coordinates.longitude),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(room.coordinates.latitude),
              longitude: parseFloat(room.coordinates.longitude),
            }}
            title={room.name}
            description={room.location}
          />
        </MapView>
      )}

      {/* Nút đặt phòng */}
      <Button
        title="BOOK THIS ROOM"
        onPress={() => alert("Booking functionality here!")}
      />
    </View>
  );

  return (
    <FlatList
      data={[{ key: "content" }]} // Chỉ một phần tử để hiển thị toàn bộ nội dung
      renderItem={renderContent}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 50, // Thêm khoảng cách để không chồng lên thanh tab
  },
  contentContainer: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  amenity: {
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 10,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: 16,
  },
});

export default RoomDetailScreen;
