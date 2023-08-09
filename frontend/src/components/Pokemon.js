import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./Pokemon.css";

const Pokemon = () => {
  const { pokemonName } = useParams(); // Retrieve the route parameter
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // State to manage input value

  const fetchPokemonData = async (pokemonName) => {
    console.log('Fetching data for:', pokemonName); // Add this line
    try {
      const response = await axios.get(`/api/pokemon/${pokemonName}`);
      setPokemon(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchPokemonData(pokemonName); // Fetch Pokémon data based on the route parameter
  }, [pokemonName]);

  return (
    <>
      <Navbar />

      <div className="pokemon-details">
        {pokemon ? (
          <div className="pokemon-info">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>Moves: {pokemon.moves.join(", ")}</p>
            <p>Abilities: {pokemon.abilities.join(", ")}</p>

          </div>
        ) : (
          <div className="error-message">
            Please Enter a valid Pokemon name or ID!
          </div>
        )}
      </div>
    </>
  );
};

export default Pokemon;
