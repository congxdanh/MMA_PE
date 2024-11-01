import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import { fetchUserBookings, cancelBooking } from "../services/bookingService"; // Define these functions in your service

const BookingScreen = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      const bookings = await fetchUserBookings();
      const now = new Date();

      setUpcomingBookings(
        bookings.filter((booking) => new Date(booking.checkIn) > now)
      );
      setPastBookings(
        bookings.filter((booking) => new Date(booking.checkOut) < now)
      );
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
      <Text style={styles.roomName}>Room: {item.roomName}</Text>
      <Text>
        Date: {item.checkIn} to {item.checkOut}
      </Text>
      <Text>Location: {item.location}</Text>
      <Text>Price: ${item.price}</Text>
      {item.isUpcoming && (
        <Button
          title="Cancel Booking"
          onPress={() => handleCancelBooking(item.id)}
        />
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
      />

      <Text style={styles.title}>Past Bookings</Text>
      <FlatList
        data={pastBookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  bookingItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
  },
  roomName: { fontSize: 18, fontWeight: "bold" },
});
