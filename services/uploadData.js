// uploadData.js

import { uploadDataToFirebase } from "./dataService";
import bookingData from "../data/booking.json";
import roomData from "../data/room.json";
import userData from "../data/user.json";

const uploadAllData = () => {
  uploadDataToFirebase("bookings", bookingData); // Lưu dữ liệu booking
  // uploadDataToFirebase("rooms", roomData); // Lưu dữ liệu room
  //   uploadDataToFirebase("users", userData); // Lưu dữ liệu user
};

// Gọi hàm để upload tất cả dữ liệu
uploadAllData();
