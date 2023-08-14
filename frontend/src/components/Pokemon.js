import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./Pokemon.css";

const Pokemon = () => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemonData = async (pokemonName) => {
    try {
      const response = await axios.get(`/api/pokemon/${pokemonName}`);
      setPokemon(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemonData(pokemonName);
  }, [pokemonName]);

  return (
    <>
      <Navbar />
      <div className="pokemon-page">
        <div className="pokemon-details">
          {pokemon ? (
            <div>
              <div className="pokemon-header">
                <h1>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h1>
              </div>

              <div className="pokemon-info">
                <div className="pokemon-section">
                  <div className="pokemon-left">
                    <div className="pokemon-section-left">
                      <img src={pokemon.sprite} alt={pokemon.name} />
                      <p className="ID">Pokedex Entry #{pokemon.id}</p>
                      <h3>Moves:</h3>
                      <p>{pokemon.moves.join(", ")}</p>
                    </div>

                    <div className="pokemon-section-left">
                      <h3>Abilities:</h3>
                      <p>{pokemon.abilities.join(", ")}</p>
                    </div>
                  </div>

                  <div className="pokemon-section-right">
                    <h3>Details:</h3>
                    <p>Base Experience: {pokemon.baseExp}</p>
                    <p>Height: {pokemon.height / 10} meters</p>
                    <h3>Types:</h3>
                    <p>
                      {pokemon.types
                        .map(
                          (type) =>
                            type.type.name.charAt(0).toUpperCase() +
                            type.type.name.slice(1)
                        )
                        .join(" and ")}
                    </p>
                  </div>
                </div>

                <div className="pokemon-section">
                  <h3>Specific Data:</h3>
                  <p>Gender Rate: {pokemon.gender_rate}</p>
                  <p>Base Happiness: {pokemon.base_happiness}</p>
                  <p>Is Legendary: {pokemon.is_legendary ? "Yes" : "No"}</p>
                  <p>Is Mythical: {pokemon.is_mythical ? "Yes" : "No"}</p>
                  <p>Hatch Counter: {pokemon.hatch_counter}</p>
                  <p>Growth Rate: {pokemon.growth_rate}</p>
                  <p>Egg Groups: {pokemon.egg_groups}</p>
                  <p>Shape: {pokemon.shape}</p>
                  <h3 className="ShinyHeader">
                    Shiny{" "}
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </h3>
                  <img src={pokemon.shiny} />
                </div>

                <div className="pokemon-section summary-section">
                  <h3>Summary:</h3>
                  <p className="summary-content">
                    {String(pokemon.flavor_text_entries)
                      .split(" ")
                      .slice(0, 100)
                      .join(" ")}
                    {String(pokemon.flavor_text_entries).split(" ").length > 100
                      ? "..."
                      : ""}
                  </p>
                </div>

                <div className="pokemon-section">
                  <h3>Pokemon Data:</h3>
                  <p>Color: {pokemon.color.name}</p>
                  <p>Capture Rate: {pokemon.captureRate}</p>
                  <p>Generation: {pokemon.generation.name}</p>
                  <p>
                    Habitat: {pokemon.habitat ? pokemon.habitat.name : "N/A"}
                  </p>
                  <div className="pokemon-section-stats">
                    <h3>Stats:</h3>
                    {pokemon.stats.map((stat) => (
                      <p key={stat.stat.name}>
                        {`${
                          stat.stat.name.charAt(0).toUpperCase() +
                          stat.stat.name.slice(1)
                        }: ${stat.base_stat}`}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="error-message"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pokemon;
