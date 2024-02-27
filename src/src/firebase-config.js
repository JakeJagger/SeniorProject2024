// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtIek1Aws0p4-bb0c5wRQynhBF0VRGHtA",
  authDomain: "fullstack-29931.firebaseapp.com",
  projectId: "fullstack-29931",
  storageBucket: "fullstack-29931.appspot.com",
  messagingSenderId: "31343414134",
  appId: "1:31343414134:web:796055e655e592abc60857"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);