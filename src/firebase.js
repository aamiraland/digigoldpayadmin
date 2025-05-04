// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web Firebase config (different from React Native)
const firebaseConfig = {
  apiKey: "AIzaSyBlNYQZ_H2pP2sz_1AwnPD4-0nNyKuXB8o",
  authDomain: "amronix-5278c.firebaseapp.com",
  projectId: "amronix-5278c",
  storageBucket: "amronix-5278c.appspot.com",
  messagingSenderId: "230410735435",
  appId: "1:230410735435:web:4acaf85fa1f5cfaa2b22ce",
  measurementId: "G-Z977JLQHZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
