// Pokemon.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);

  // Function to fetch Pokemon data
  const fetchPokemonData = async (pokemonId) => {
    try {
      const response = await axios.get(`/api/pokemon/${pokemonId}`);
      setPokemon(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Pokemon data for a specific Pokemon ID (change the ID as needed)
  useEffect(() => {
    const pokemonId = 1;
    fetchPokemonData(pokemonId);
  }, []);

  return (
    <div>
      {pokemon ? (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprite} alt={pokemon.name} />
          <p>Moves: {pokemon.moves.join(', ')}</p>
          <p>Abilities: {pokemon.abilities.join(', ')}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pokemon;
