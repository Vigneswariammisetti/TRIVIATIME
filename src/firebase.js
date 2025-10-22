// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAgo3AqzPE2hc-EI7RkqyXJv4MisR3U2U",
  authDomain: "triviatime-2c348.firebaseapp.com",
  projectId: "triviatime-2c348",
  storageBucket: "triviatime-2c348.appspot.com",
  messagingSenderId: "265839626689",
  appId: "1:265839626689:web:4d0a1daf9003d875138740",
  measurementId: "G-0X3V9M94XK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);