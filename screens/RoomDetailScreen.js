import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
import { createBooking } from "../services/bookingService";

const RoomDetailScreen = ({ route }) => {
  const { room } = route.params;
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      Alert.alert("Error", "Please select both check-in and check-out dates.");
      return;
    }

    try {
      const booking = await createBooking(
        room,
        checkInDate.toISOString(),
        checkOutDate.toISOString()
      );
      if (booking) {
        Alert.alert(
          "Booking Successful",
          "Your room has been booked successfully!"
        );
      } else {
        Alert.alert("Booking Failed", "There was a problem with your booking.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during booking.");
      console.error("Error in booking:", error);
    }
  };

  const onCheckInChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkInDate;
    setShowCheckInPicker(false);
    setCheckInDate(currentDate);
  };

  const onCheckOutChange = (event, selectedDate) => {
    const currentDate = selectedDate || checkOutDate;
    setShowCheckOutPicker(false);
    setCheckOutDate(currentDate);
  };

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {room.image && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: room.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>{room.name}</Text>
          </View>
        </View>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.info}>
          <Text style={styles.label}>Location: </Text>
          {room.location || "Not specified"}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.label}>Price per Night: </Text>
          {room.pricePerNight ? `$${room.pricePerNight}` : "N/A"}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.label}>Description: </Text>
          {room.description || "No description available"}
        </Text>

        <Text style={styles.subTitle}>Amenities:</Text>
        {room.amenities ? (
          room.amenities.map((amenity, index) => (
            <Text key={index} style={styles.amenity}>
              • {amenity}
            </Text>
          ))
        ) : (
          <Text style={styles.amenity}>No amenities specified</Text>
        )}
      </View>

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

      {/* Date Pickers for Check-In and Check-Out */}
      <View style={styles.datePickerContainer}>
        <Button
          title="Select Check-In Date"
          onPress={() => setShowCheckInPicker(true)}
        />
        <Text style={styles.dateText}>
          {checkInDate
            ? `Check-In: ${checkInDate.toDateString()}`
            : "No Check-In Date Selected"}
        </Text>
        <Button
          title="Select Check-Out Date"
          onPress={() => setShowCheckOutPicker(true)}
        />
        <Text style={styles.dateText}>
          {checkOutDate
            ? `Check-Out: ${checkOutDate.toDateString()}`
            : "No Check-Out Date Selected"}
        </Text>
      </View>

      {/* DateTimePicker components */}
      {showCheckInPicker && (
        <DateTimePicker
          value={checkInDate || new Date()}
          mode="date"
          display="default"
          onChange={onCheckInChange}
          minimumDate={new Date()}
        />
      )}
      {showCheckOutPicker && (
        <DateTimePicker
          value={checkOutDate || new Date()}
          mode="date"
          display="default"
          onChange={onCheckOutChange}
          minimumDate={checkInDate || new Date()}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>BOOK THIS ROOM</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={[{ key: "content" }]}
      renderItem={renderContent}
      keyExtractor={(item) => item.key}
      contentContainerStyle={styles.container}
    />
  );
};

export default RoomDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 60,
    backgroundColor: "#F3F4F6",
  },
  contentContainer: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  overlayText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  info: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 12,
  },
  label: {
    fontWeight: "700",
    color: "#003580",
  },
  description: {
    fontSize: 16,
    color: "#555555",
    lineHeight: 22,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003580",
    marginTop: 20,
    marginBottom: 8,
  },
  amenity: {
    fontSize: 16,
    color: "#666666",
    marginLeft: 10,
    marginBottom: 6,
  },
  map: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },
  datePickerContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#003580",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    marginHorizontal: 16,
    shadowColor: "#003580",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
