// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChlpX_aiN3gSNYeEprKTk51EPkqzX2zFs",
  authDomain: "toonmash-web.firebaseapp.com",
  projectId: "toonmash-web",
  storageBucket: "toonmash-web.appspot.com",
  messagingSenderId: "236915818003",
  appId: "1:236915818003:web:a1a007fd39d8a7745b09e6",
  measurementId: "G-HJFTDNH19X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Db = getStorage(app);
