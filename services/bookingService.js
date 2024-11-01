import {
  getDatabase,
  ref,
  get,
  child,
  remove,
  set,
  push,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirebaseApp } from "../utils/firebaseHelper";

// Function to fetch all bookings for the logged-in user
export const fetchUserBookings = async () => {
  const db = getDatabase(getFirebaseApp());
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  const userBookingsRef = ref(db, `bookings/${userId}`);
  try {
    const snapshot = await get(userBookingsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Fetched bookings:", data); // Log to check data structure

      // Flatten the bookings into an array
      return Object.keys(data).map((bookingId) => ({
        id: bookingId,
        ...data[bookingId],
      }));
    } else {
      console.log("No bookings found for this user.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    return [];
  }
};

// Function to create a new booking
export const createBooking = async (room, checkInDate, checkOutDate) => {
  const db = getDatabase(getFirebaseApp());
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  const newBookingRef = push(ref(db, `bookings/${userId}`));
  const totalPrice = calculateTotalPrice(
    room.pricePerNight,
    checkInDate,
    checkOutDate
  );

  const bookingData = {
    roomId: room.id,
    roomName: room.name,
    location: room.location,
    checkInDate,
    checkOutDate,
    totalPrice,
    status: "upcoming",
  };

  try {
    await set(newBookingRef, bookingData);
    console.log(`Booking created successfully with ID: ${newBookingRef.key}`);
    return { id: newBookingRef.key, ...bookingData };
  } catch (error) {
    console.error("Error creating booking: ", error);
    return null;
  }
};

// Function to cancel a booking by removing it from the database
export const cancelBooking = async (bookingId) => {
  const db = getDatabase(getFirebaseApp());
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  const bookingRef = ref(db, `bookings/${userId}/${bookingId}`);
  try {
    await remove(bookingRef);
    console.log(`Booking ${bookingId} canceled successfully`);
  } catch (error) {
    console.error("Error canceling booking: ", error);
  }
};

// Helper function to calculate the total price based on nights
const calculateTotalPrice = (pricePerNight, checkInDate, checkOutDate) => {
  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return nights * pricePerNight;
};
