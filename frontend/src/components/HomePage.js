import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Card from "./Card";
import "./homepage.css";

const HomePage = () => {
  const [firstFourPokemonIds, setFirstFourPokemonIds] = useState([1, 2, 3, 4]);
  const [pokemons, setPokemons] = useState([]); // Initialize an empty array for storing Pokémon data
  const [searchInput, setSearchInput] = useState("");
  const [hasClickedNext, setHasClickedNext] = useState(false);

  const fetchPokemonData = async (pokemonId) => {
    try {
      const response = await axios.get(`/api/pokemon/${pokemonId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInitialPokemons = async (pokemonIds) => {
    const fetchedPokemons = await Promise.all(
      pokemonIds.map((id) => fetchPokemonData(id))
    );
    setPokemons(fetchedPokemons); // Store the fetched Pokémon data in the 'pokemons' state array
  };

  const handleNextButtonClick = () => {
    const incrementedIds = firstFourPokemonIds.map((id) =>
      id >= 1007 ? id - 1006 : id + 4
    );
    fetchInitialPokemons(incrementedIds);
    setFirstFourPokemonIds(incrementedIds); // Update the IDs for the next batch
    setHasClickedNext(true); // Update the state to indicate that "Next" has been clicked
  };

  const handleBackButtonClick = () => {
    const decrementedIds = firstFourPokemonIds.map((id) =>
      id <= 4 ? id + 1006 : id - 4
    );
    fetchInitialPokemons(decrementedIds);
    setFirstFourPokemonIds(decrementedIds); // Update the IDs for the previous batch
  };

  useEffect(() => {
    fetchInitialPokemons(firstFourPokemonIds); // Fetch and store data for the initial four Pokémon
  }, []);

  const searchPokemon = () => {
    if (searchInput.trim() !== "") {
      fetchPokemonData(searchInput.toLowerCase());
    }
  };

  useEffect(() => {
    searchPokemon();
    fetchInitialPokemons(firstFourPokemonIds); // Fetch and store data for the initial four Pokémon
  }, []);

  return (
    <div>
      <Navbar
        onSearch={searchPokemon}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />
      <div className="card-grid">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
        <div className="button-container">
          <button className="next-button" onClick={handleNextButtonClick}>
            Next
          </button>

          <button className="next-button" onClick={handleBackButtonClick}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
