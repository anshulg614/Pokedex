const express = require("express");
const axios = require("axios");
const app = express();
const port = 3001; // Choose a port for your server

// Define a route to fetch Pokemon data by ID

app.get("/", (req, res) => {
  res.send("Welcome to the Pokemon API!");
});

app.get("/api/pokemon/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Make a request to the external Pokemon API to get specific Pokemon data
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    );
    const pokemonData = response.data;

    // Log the keys of the pokemonData object
    console.log("Keys of pokemonData:", Object.keys(pokemonData));

    // Make a request to fetch pokemon species data for egg group information
    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
    const speciesData = speciesResponse.data;

    // Log the keys of the speciesData object (egg group information)
    console.log("Keys of speciesData:", Object.keys(speciesData));

    // Extract the required information from the response and send it to the frontend
    const pokemonInfo = {
      name: pokemonData.name,
      sprite: pokemonData.sprites.front_default,
      moves: pokemonData.moves.slice(0, 4).map((move) => move.move.name),
      abilities: pokemonData.abilities.map((ability) => ability.ability.name),
      order: pokemonData.order,
      id: pokemonData.id,
      baseExp: pokemonData.base_experience,
      forms: pokemonData.forms,
      height: pokemonData.height,
      held_items: pokemonData.held_items,
      locations: pokemonData.location_area_encounters,
      species: pokemonData.species,
      stats: pokemonData.stats,
      types: pokemonData.types,
      color: speciesData.color,
      evolutions: speciesData.evolution_chain,
      captureRate: speciesData.capture_rate,
      generation: speciesData.generation,
      habitat: speciesData.habitat,
    };

    res.json(pokemonInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Pokemon data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
