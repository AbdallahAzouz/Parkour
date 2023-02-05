// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFKqxRTFKqs3XqFnOJU8G-OjjLAoKwcgk",
  authDomain: "parkour-2cef2.firebaseapp.com",
  projectId: "parkour-2cef2",
  storageBucket: "parkour-2cef2.appspot.com",
  messagingSenderId: "1034581143953",
  appId: "1:1034581143953:web:e208d586187e47c40dea30",
  measurementId: "G-56N6JGMWW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
