// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe7T7V_qSRiIQymT_Tey3uTmonGQV0OJc",
  authDomain: "react-practice-d5ada.firebaseapp.com",
  projectId: "react-practice-d5ada",
  storageBucket: "react-practice-d5ada.appspot.com",
  messagingSenderId: "319303253026",
  appId: "1:319303253026:web:06ef401143ebef0dac1e7b"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );