import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import './NavStyle.css';

const Navbar = ({ onSearch, searchInput, setSearchInput }) => {
  const navigate = useNavigate(); 

  // Function to navigate to the home route
  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="left">
          <input
            type="text"
            placeholder="Search by Pokémon name or ID!"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-button"
          />
          <button className="nav-button" onClick={() => onSearch()}>Search</button>
        </div>
        <div className="center">
          <h1 onClick={navigateToHome}>Pokedex</h1>
        </div>
        <div className="right">
          {/* Use the navigateToHome function as onClick handler */}
          <button className="nav-button" onClick={navigateToHome}>Home</button>
          <button className="nav-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
