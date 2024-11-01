import { getDatabase, ref, onValue, set } from "firebase/database";
import { getFirebaseApp } from "../utils/firebaseHelper";

// Hàm lưu trữ dữ liệu lên Firebase
export const uploadDataToFirebase = async (path, data) => {
  const db = getDatabase(getFirebaseApp());
  const dataRef = ref(db, path); // Tham chiếu đến nhánh trong Realtime Database

  try {
    await set(dataRef, data); // Lưu dữ liệu vào Firebase
    console.log(`Data uploaded successfully to ${path}`);
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
};

// Hàm để lấy dữ liệu từ Firebase
export const fetchRooms = (onDataReceived) => {
  const db = getDatabase(getFirebaseApp());
  const roomsRef = ref(db, "rooms"); // Tham chiếu đến nhánh "rooms" trong Database

  onValue(roomsRef, (snapshot) => {
    const data = snapshot.val();
    const roomsList = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];
    onDataReceived(roomsList);
  });
};
