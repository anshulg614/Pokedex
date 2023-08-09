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
    console.log("Fetching data for:", pokemonName); // Add this line
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
      <div className="pokemon-page">
        <div className="pokemon-details">
          {pokemon ? (
            <div className="pokemon-info">
              <div className="pokemon-header">
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprite} alt={pokemon.name} />
              </div>

              <div className="pokemon-section">
                <h3>Moves:</h3>
                <p>{pokemon.moves.join(", ")}</p>
              </div>

              <div className="pokemon-section">
                <h3>Abilities:</h3>
                <p>{pokemon.abilities.join(", ")}</p>
              </div>

              <div className="pokemon-section">
                <h3>Details:</h3>
                <p>Order: {pokemon.order}</p>
                <p>ID: {pokemon.id}</p>
                <p>Base Experience: {pokemon.baseExp}</p>
                <p>Height: {pokemon.height}</p>
              </div>

              <div className="pokemon-section">
                <h3>Held Items:</h3>
                <p>
                  {pokemon.held_items.map((item) => item.item.name).join(", ")}
                </p>
              </div>

              <div className="pokemon-section">
                <h3>Stats:</h3>
                <p>
                  {pokemon.stats
                    .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
                    .join(", ")}
                </p>
              </div>

              <div className="pokemon-section">
                <h3>Types:</h3>
                <p>{pokemon.types.map((type) => type.type.name).join(", ")}</p>
              </div>

              <div className="pokemon-section">
                <h3>Additional Information:</h3>
                <p>Color: {pokemon.color.name}</p>
                <p>Capture Rate: {pokemon.captureRate}</p>
                <p>Generation: {pokemon.generation.name}</p>
                <p>Habitat: {pokemon.habitat ? pokemon.habitat.name : "N/A"}</p>
              </div>
            </div>
          ) : (
            <div className="error-message">
              Please Enter a valid Pokemon name or ID!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pokemon;
