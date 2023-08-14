import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Pokemon from './Pokemon';
import firebase from 'firebase/compat/app'; // Use 'compat' to maintain compatibility
import 'firebase/compat/auth'; // Import auth module

const firebaseConfig = {
    apiKey: "AIzaSyBoo5AT_2EzsNGHE273b4fSjv_Kdm6Qv-M",
    authDomain: "pokedex-auth-7e61a.firebaseapp.com",
    projectId: "pokedex-auth-7e61a",
    storageBucket: "pokedex-auth-7e61a.appspot.com",
    messagingSenderId: "1037684512923",
    appId: "1:1037684512923:web:94f776756093ccb9f20e3e",
    measurementId: "G-61DPB0WWB8",
  };

firebase.initializeApp(firebaseConfig);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:pokemonName" element={<Pokemon />} />
      </Routes>
    </Router>
  );
};

export default App;