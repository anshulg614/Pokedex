import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavStyle.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(""); // State to manage input value
  const [hasSearchedPokemon, setHasSearchedPokemon] = useState(false); // State to track if a valid Pokémon has been searched

  const navigateToHome = () => {
    navigate("/");
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      navigate(`/pokemon/${searchInput.trim().toLowerCase()}`);
    }
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
          <button className="nav-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="center">
          <h1 onClick={navigateToHome}>Pokedex</h1>
        </div>
        <div className="right">
          <button className="nav-button" onClick={navigateToHome}>
            Home
          </button>
          <button className="nav-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
