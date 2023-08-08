// Pokemon.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Pokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const fetchPokemonData = async (pokemonName) => {
    try {
      const response = await axios.get(`/api/pokemon/${pokemonName}`);
      setPokemon(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchPokemon = () => {
    console.log(searchInput)
    if (searchInput.trim() !== '') {
      fetchPokemonData(searchInput.toLowerCase());
    }
  };

  
  useEffect(() => {
    searchPokemon();
  }, []);


  
  return (
    
    <div>
      <Navbar
        onSearch={searchPokemon}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <input
        type="text"
        placeholder="Search by Pokémon name"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={() => searchPokemon()}>Search</button>

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
