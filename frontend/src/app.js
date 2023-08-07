// frontend/app.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("pokemon-container");

  async function fetchPokemonData(id) {
    try {
      const response = await fetch(`/api/pokemon/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokemon data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async function displayPokemon(id) {
    const pokemonData = await fetchPokemonData(id);
    if (pokemonData) {
      const { name, sprite, moves, abilities } = pokemonData;
      const pokemonInfo = document.createElement("div");
      pokemonInfo.innerHTML = `
          <h2>${name}</h2>
          <img src="${sprite}" alt="${name}">
          <h3>Moves:</h3>
          <ul>${moves.map((move) => `<li>${move}</li>`).join("")}</ul>
          <h3>Abilities:</h3>
          <ul>${abilities.map((ability) => `<li>${ability}</li>`).join("")}</ul>
        `;
      container.appendChild(pokemonInfo);
    }
  }

  const pokemonId = 1;
  fetchPokemonData(pokemonId).then(displayPokemon);
});
