// bookingService.js
import { getDatabase, ref, get, child, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirebaseApp } from "../utils/firebaseHelper";

// Function to fetch all bookings for the logged-in user
export const fetchUserBookings = async () => {
  const db = getDatabase(getFirebaseApp());
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  const bookingsRef = ref(db, `bookings/${userId}`);
  try {
    const snapshot = await get(bookingsRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    return [];
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
