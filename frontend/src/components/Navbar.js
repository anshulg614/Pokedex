import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app"; // No need to import "firebase/auth" again
import "firebase/compat/auth"; // Import the authentication service

import "./NavStyle.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState(null); // State to hold user data
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);

  useEffect(() => {
    // Set up an authentication listener to handle user changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      // Unsubscribe the listener when component unmounts
      unsubscribe();
    };
  }, []);

  const navigateToHome = () => {
    navigate("/");
  };

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      navigate(`/pokemon/${searchInput.trim().toLowerCase()}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error("Error signing out:", error);
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
            onKeyDown={handleKeyDown}
            className="search-button inputs"
          />
          <button className="nav-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div
          className={`center ${
            user ? "center-shift" : ""
          }`}
        >
          <h1 className="pokedex-header" onClick={navigateToHome}>
            Pokedex
          </h1>
        </div>

        <div className="right">
          <button className="nav-button" onClick={navigateToHome}>
            Home
          </button>
          {user ? (
            <>
              <button
                className="nav-button"
                onClick={() => setIsAccountPopupOpen(!isAccountPopupOpen)}
              >
                Account
              </button>
              <button className="nav-button" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <button className="nav-button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
      {isAccountPopupOpen && (
        <>
          <div
            className="overlay active"
            onClick={() => setIsAccountPopupOpen(false)}
          ></div>
          <div className="modal active">
            <div className="modal-content">
              {user && (
                <>
                  <p>Logged in as</p> <strong>{user.displayName}</strong>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
