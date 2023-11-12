// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEdXGwDyEtkigGsIFBzJT1d--khDKSJvc",
  authDomain: "psfotos-b7062.firebaseapp.com",
  projectId: "psfotos-b7062",
  storageBucket: "psfotos-b7062.appspot.com",
  messagingSenderId: "48045044865",
  appId: "1:48045044865:web:f042f7dab321482fdc0980"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);