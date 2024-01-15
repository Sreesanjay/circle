// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxAJj-vDjpJB_DJK1WiBH-Pn625Jz8TzQ",
  authDomain: "circle-ef413.firebaseapp.com",
  projectId: "circle-ef413",
  storageBucket: "circle-ef413.appspot.com",
  messagingSenderId: "798349832483",
  appId: "1:798349832483:web:1385e53dc8c1672270dc96",
  measurementId: "G-ST18XFGYM5"
};

// Initialize Firebase
export const firebase =  initializeApp(firebaseConfig)
export const firestore = getFirestore(firebase)
export const storage = getStorage(firebase)