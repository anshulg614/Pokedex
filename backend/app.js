// app.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001; // Choose a port for your server

// Define a route to fetch Pokemon data by ID
app.get('/api/pokemon/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Make a request to the external Pokemon API to get specific Pokemon data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemonData = response.data;
    
    // Extract the required information from the response and send it to the frontend
    const pokemonInfo = {
      name: pokemonData.name,
      sprite: pokemonData.sprites.front_default,
      moves: pokemonData.moves.slice(0, 4).map(move => move.move.name),
      abilities: pokemonData.abilities.map(ability => ability.ability.name)
    };

    res.json(pokemonInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Pokemon data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
