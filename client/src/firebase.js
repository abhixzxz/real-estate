// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyDHnUlVHY2E8GhQJXw1BRD5c3H545IBeIw",
  authDomain: "mern-estate-60df7.firebaseapp.com",
  projectId: "mern-estate-60df7",
  storageBucket: "mern-estate-60df7.appspot.com",
  messagingSenderId: "271332351502",
  appId: "1:271332351502:web:76805216512573b7d2a65f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
