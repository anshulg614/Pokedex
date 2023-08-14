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

    console.log("Keys of speciesData: ", Object.keys(speciesData));

    // Extract the required information from the response and send it to the frontend
    const pokemonInfo = {
      name: pokemonData.name || "N/A",
      sprite: pokemonData.sprites.front_default || "N/A",
      shiny: pokemonData.sprites.front_shiny || "N/A",
      moves: pokemonData.moves.slice(0, 4).map((move) => move.move.name),
      abilities: pokemonData.abilities.map((ability) => ability.ability.name),
      order: pokemonData.order || "N/A",
      id: pokemonData.id || "N/A",
      baseExp: pokemonData.base_experience || "N/A",
      forms: pokemonData.forms || "N/A",
      height: pokemonData.height || "N/A",
      held_items: pokemonData.held_items || "N/A",
      locations: pokemonData.location_area_encounters || "N/A",
      species: pokemonData.species || "N/A",
      stats: pokemonData.stats || "N/A",
      types: pokemonData.types || "N/A",
      color: speciesData.color || "N/A",
      evolutions: speciesData.evolution_chain || "N/A",
      captureRate: speciesData.capture_rate || "N/A",
      generation: speciesData.generation || "N/A",
      habitat: speciesData.habitat || "N/A",
      // Extracting only the 'name' from properties in the format { name, url }
      gender_rate: speciesData.gender_rate || "N/A",
      base_happiness: speciesData.base_happiness || "N/A",
      is_legendary: speciesData.is_legendary || "N/A",
      is_mythical: speciesData.is_mythical || "N/A",
      hatch_counter: speciesData.hatch_counter || "N/A",
      forms_switchable: speciesData.forms_switchable || "N/A",
      growth_rate: speciesData.growth_rate?.name || "N/A", // Extracting 'name' property

      egg_groups: speciesData.egg_groups.map((group) => group.name) || "N/A", // Extracting 'name'
      shape: speciesData.shape?.name || "N/A", // Extracting 'name'
      names: speciesData.names.map((entry) => entry.name) || "N/A", // Extracting 'name'
      flavor_text_entries: speciesData.flavor_text_entries
        ? speciesData.flavor_text_entries.map((entry) => entry.flavor_text)
        : ["N/A"],

      form_descriptions:
        speciesData.form_descriptions.map((entry) => entry.description) ||
        "N/A", // Extracting 'description'
      genera: speciesData.genera.map((entry) => entry.genus) || "N/A", // Extracting 'genus'
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
