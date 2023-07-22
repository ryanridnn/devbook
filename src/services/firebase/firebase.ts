// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7vWrqDqgaPxIiA9nDVXu9sMuagBK8rjU",
  authDomain: "devbook-5371a.firebaseapp.com",
  projectId: "devbook-5371a",
  storageBucket: "devbook-5371a.appspot.com",
  messagingSenderId: "221887988048",
  appId: "1:221887988048:web:eb0b9a55806a93b2b8ac55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
