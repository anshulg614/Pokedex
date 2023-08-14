// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoo5AT_2EzsNGHE273b4fSjv_Kdm6Qv-M",
  authDomain: "pokedex-auth-7e61a.firebaseapp.com",
  projectId: "pokedex-auth-7e61a",
  storageBucket: "pokedex-auth-7e61a.appspot.com",
  messagingSenderId: "1037684512923",
  appId: "1:1037684512923:web:94f776756093ccb9f20e3e",
  measurementId: "G-61DPB0WWB8"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export default firebase;