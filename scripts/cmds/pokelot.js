const fs = require("fs")

const globalData = {
  poke: {},
  fff: [],
};

module.exports = {
  config: {
    name: "pokespawn",
    version: "1.2",
    author: "Shikaki\nAusum",
    countDown: 20,
    role: 0,
    shortDescription: "Spawn a Pokémon",
    longDescription: "Spawn a pokemon, reply correct name, get money and exp",
    category: "🐍 Pokémon",
    guide: "{pn}",
  },


  onStart: async function ({ message, event, threadsData }) {
    try {
      const pokos = JSON.parse(fs.readFileSync('pokos.json', 'utf8'));
      const pokedb = JSON.parse(fs.readFileSync('pokedb.json', 'utf8'));

      const pokebot = await threadsData.get(event.threadID, "settings.pokebot");
      if (!pokebot) return;

      if (!pokedb.hasOwnProperty("users")) {
        pokedb.users = {};
        fs.writeFile('pokedb.json', JSON.stringify(pokedb), (err) => {
          if (err) throw err;
        });
      }

      if (!pokedb.users.hasOwnProperty(event.threadID)) {
        pokedb.users[event.threadID] = { pokemons: [], taken: [] };
        fs.writeFile('pokedb.json', JSON.stringify(pokedb), (err) => {
          if (err) throw err;
        });
      }

      let ind = getRandom(pokos, pokedb.users[event.threadID].taken);
      try {
        const form = {
          body: "A wild pokemon appeared! Get free coins and exp by replying with the correct pokemon name.",
          attachment: await global.utils.getStreamFromURL(pokos[ind].image),
        };
        message.reply(form, (err, info) => {
          globalData.fff.push(info.messageID);
          global.GoatBot.onReply.set(info.messageID, {
            commandName: "pokespawn", 
            mid: info.messageID,
            name: pokos[ind].name,
            ind: ind,
          });

          setTimeout(() => {
          }, 1000);
        });
      } catch (e) {
        console.error("Error in pokespawn:", e);
        message.reply('Server busy. Please try again later.');
      }
    } catch (error) {
      console.error("Error in pokespawn:", error);
      message.reply("An error occurred. Please try again later.");
    }
  },
  
 onReply: async ({ event, api, Reply, message, getLang, usersData }) => {
  try {
    const pokos = JSON.parse(fs.readFileSync("pokos.json", "utf8"));
    const pokedb = JSON.parse(fs.readFileSync("pokedb.json", "utf8"));

    const userId = event.senderID;

    if (!pokedb.users.hasOwnProperty(userId)) {
      pokedb.users[userId] = {
        pokemons: [],
      };
    }

    const lowerCaseUserInput = event.body.toLowerCase();
    const lowerCaseReplyName = Reply.name.toLowerCase();

    if (lowerCaseReplyName == lowerCaseUserInput || lowerCaseReplyName.split("-")[0] == lowerCaseUserInput) {
      
      const rewardCoins = 10000;
      const rewardExp = 100;
      
      const userData = await usersData.get(userId);
      await usersData.set(userId, {
        money: userData.money + rewardCoins,
        exp: userData.exp + rewardExp,
        data: userData.data,
      });

      message.reply(`Congratulations! You guessed the pokemon ${Reply.name} correctly. You've been rewarded with $${rewardCoins} and ${rewardExp} exp.`);

      api.unsendMessage(Reply.mid);

      if (!pokedb.users[userId].pokemons.includes(Reply.name)) {
return;
      }
    } else {
      message.reply("Wrong answer.");
    }
  } catch (error) {
    console.error("Error in onReply:", error);
    message.reply("An error occurred. Please try again later.");
  }
},
};

function getRandomInt(arra) {
  return Math.floor(Math.random() * arra.length);
}

function getRandom(arra, excludeArrayNumbers) {
  let randomNumber;

  if (!Array.isArray(excludeArrayNumbers)) {
    randomNumber = getRandomInt(arra);
    return randomNumber;
  }

  do {
    randomNumber = getRandomInt(arra);
  } while ((excludeArrayNumbers || []).includes(randomNumber));

  return randomNumber;

}