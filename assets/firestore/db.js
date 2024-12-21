// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTONJ9BVgd3hb4uA2CGQgJFkfnkII7_xA",
  authDomain: "math-past-papers.firebaseapp.com",
  projectId: "math-past-papers",
  storageBucket: "math-past-papers.firebasestorage.app",
  messagingSenderId: "163343597829",
  appId: "1:163343597829:web:347f3f2ceb0dffe89a376c",
  measurementId: "G-CC96PS185N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
