// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWK1jGp4uqq_NodTfhtnCYmJdKBaHeJow",
  authDomain: "northpathconsulting-da465.firebaseapp.com",
  projectId: "northpathconsulting-da465",
  storageBucket: "northpathconsulting-da465.firebasestorage.app",
  messagingSenderId: "1033776356709",
  appId: "1:1033776356709:web:b39602e24203e453eb158c",
  measurementId: "G-18YHCCBZD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);