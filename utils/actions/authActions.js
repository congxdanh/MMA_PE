import { getFirebaseApp } from "../firebaseHelper";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { child, getDatabase, set, ref } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate } from "../../store/authSlice";

// export const signUp = (fullName, email, password) => {
//   return async (dispatch) => {
//     const app = getFirebaseApp();
//     const auth = getAuth(app);

//     try {
//       const result = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       console.log(result);

//       const { uid, stsTokenManager } = result.user;
//       const { accessToken, expirationTime } = stsTokenManager;
//       const expiryDate = new Date(expirationTime);

//       const userData = await createUser(fullName, email, uid);

//       dispatch(authenticate({ token: accessToken, userData }));

//       saveToDataStorage(accessToken, uid, expiryDate);
//     } catch (error) {
//       console.log(error);

//       const errorCode = error.code;
//       let message = "Something went wrong";

//       if (
//         errorCode === "auth/wrong-password" ||
//         errorCode === "auth/user-not-found"
//       ) {
//         message = "Wrong email or password";
//       }

//       throw new Error(message);
//     }
//   };
// };

export const signUp = (fullName, email, password) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);

      const { uid } = result.user;

      // Lưu thông tin người dùng vào Firebase Realtime Database
      const userData = await createUser(fullName, email, uid);

      // Không dispatch authenticate vào Redux hoặc lưu vào AsyncStorage ở đây
      console.log("User registered successfully!");

      // Thay vì lưu token vào Redux, chỉ đơn giản là xác nhận đăng ký thành công
      return true;
    } catch (error) {
      console.log(error);

      const errorCode = error.code;
      let message = "Something went wrong";

      if (
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/user-not-found"
      ) {
        message = "Wrong email or password";
      }

      throw new Error(message);
    }
  };
};
const createUser = async (fullName, email, userId) => {
  const userData = {
    fullName,
    email,
    userId,
    signUpDate: new Date().toISOString(),
  };

  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${userId}`);
  await set(childRef, userData);

  return userData;
};

const saveToDataStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  );
};

export const logout = () => {
  return async (dispatch) => {
    const auth = getAuth(getFirebaseApp());
    try {
      await signOut(auth); // Thực hiện đăng xuất khỏi Firebase
      // Xóa thông tin người dùng khỏi Redux store
      dispatch(authenticate({ token: null, userData: null }));
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
};
