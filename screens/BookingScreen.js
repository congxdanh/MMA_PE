import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { fetchUserBookings, cancelBooking } from "../services/bookingService";
import Header from "../components/Header";
import { useFocusEffect } from "@react-navigation/native";
const BookingScreen = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadBookings = async () => {
        const bookings = await fetchUserBookings();
        const now = new Date().toISOString();

        // Phân loại thành upcoming và past bookings
        const upcoming = bookings.filter(
          (booking) => booking.checkOutDate > now
        );
        const past = bookings.filter((booking) => booking.checkOutDate <= now);

        setUpcomingBookings(upcoming);
        setPastBookings(past);
      };

      loadBookings();
    }, [])
  );

  useEffect(() => {
    const loadBookings = async () => {
      const bookings = await fetchUserBookings();
      const now = new Date().toISOString();

      console.log("Current UTC Date (now):", now);

      // Define upcoming and past bookings based on checkOutDate
      const upcoming = bookings.filter((booking) => booking.checkOutDate > now);
      const past = bookings.filter((booking) => booking.checkOutDate <= now);

      setUpcomingBookings(upcoming);
      setPastBookings(past);

      console.log("Filtered Upcoming Bookings:", upcoming);
      console.log("Filtered Past Bookings:", past);
    };

    loadBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            await cancelBooking(bookingId);
            setUpcomingBookings(
              upcomingBookings.filter((b) => b.id !== bookingId)
            );
          },
        },
      ]
    );
  };

  const renderBooking = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.roomName}>{item.roomName}</Text>
      <Text style={styles.bookingDetails}>
        Date: {new Date(item.checkInDate).toLocaleDateString()} to{" "}
        {new Date(item.checkOutDate).toLocaleDateString()}
      </Text>
      <Text style={styles.bookingDetails}>Location: {item.location}</Text>
      <Text style={styles.bookingDetails}>Price: ${item.totalPrice}</Text>
      {item.status === "upcoming" && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelBooking(item.id)}
        >
          <Text style={styles.cancelButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Bookings</Text>
      <FlatList
        data={upcomingBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No upcoming bookings.</Text>
        }
      />

      <Text style={styles.title}>Past Bookings</Text>
      <FlatList
        data={pastBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No past bookings.</Text>
        }
      />
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F3F4F6" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#003580",
  },
  bookingItem: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  roomName: { fontSize: 20, fontWeight: "bold", color: "#333" },
  bookingDetails: { fontSize: 16, color: "#555", marginVertical: 4 },
  cancelButton: {
    marginTop: 12,
    backgroundColor: "#D9534F",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginVertical: 10,
  },
});
