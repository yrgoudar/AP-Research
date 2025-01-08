// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmimep1Am5T6Ywn1ho0bD3ipAEbc0h8eE",
  authDomain: "ap-research-ff300.firebaseapp.com",
  projectId: "ap-research-ff300",
  storageBucket: "ap-research-ff300.firebasestorage.app",
  messagingSenderId: "1034074021312",
  appId: "1:1034074021312:web:9629b87d5364287fe47c25",
  measurementId: "G-QWG4TV2C4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

export { db };