// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "propsmaster-fbffd.firebaseapp.com",
  projectId: "propsmaster-fbffd",
  storageBucket: "propsmaster-fbffd.firebasestorage.app",
  messagingSenderId: "1057941000050",
  appId: "1:1057941000050:web:ad81e73af0fc91b083d7eb",
  measurementId: "G-P0EBTW14KG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);