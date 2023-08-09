import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Pokemon from './Pokemon';

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
