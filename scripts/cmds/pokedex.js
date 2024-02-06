const fs = require('fs');

function formatMessage(pokemonArray, pageNumber, totalPages) {
  const maxDisplay = 20;
  const startIndex = (pageNumber - 1) * maxDisplay;
  const endIndex = startIndex + maxDisplay;
  const pokemonSubset = pokemonArray.slice(startIndex, endIndex);

  let formattedNames = '';
  const sortedPokemons = pokemonSubset.sort((a, b) => a.localeCompare(b));

  for (let i = 0; i < sortedPokemons.length; i++) { 
    const pokemonName = sortedPokemons[i];
    formattedNames += `${startIndex + i + 1}. ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}\n`;
  }

  if (pageNumber < totalPages) {
    formattedNames += `\nFor more Pokémon, use "pokedex ${pageNumber + 1}".`;
  } else {
    formattedNames += "\nYou don't have any more Pokémon to show. 😔";
  }

  formattedNames += ` (Page ${pageNumber}/${totalPages})`;

  return formattedNames;
}

module.exports = {
  config: {
    name: "pokedex",
    version: "1.2",
    author: "Shikaki",
    shortDescription: "View Pokémon names",
    longDescription: "",
    category: "🐍 Pokémon",
    guide: "{pn}",
  },

  onStart: async function ({ event, args, message }) {
    // Load or create the pokedb file
    let pokedb;
    try {
      pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));
    } catch (err) {
      // File doesn't exist, create an empty pokedb object
      pokedb = { users: {} };
      fs.writeFileSync('pokedb.json', JSON.stringify(pokedb, null, 2), 'utf8');
    }

    const senderID = event.senderID;

    // Check if the user exists in the pokedb
    if (!pokedb.users[senderID]) {
      // User doesn't exist, store it and say "You have no Pokémon."
      pokedb.users[senderID] = { pokemons: [] };
      fs.writeFileSync('pokedb.json', JSON.stringify(pokedb, null, 2), 'utf8');
      return message.reply("You have no Pokémon.");
    }

    let pageNumber = 1;

    if (args[0]) {
      pageNumber = parseInt(args[0]);
    }

    if (pageNumber < 1) {
      return message.reply("You have entered an invalid page number. Please try again.");
    }

    let userPokedex = pokedb.users[senderID].pokemons;

    userPokedex = userPokedex.sort((a, b) => a.localeCompare(b));

    const totalPages = Math.ceil(userPokedex.length / 20);

    if (pageNumber > totalPages) {
      return message.reply("You don't have any more Pokémon to show. 😔");
    }

    const formattedPokemonNames = formatMessage(userPokedex, pageNumber, totalPages);
    const reply = `🔥 Your Pokédex:\n\n${formattedPokemonNames}`;
    return message.reply(reply);
  }
};