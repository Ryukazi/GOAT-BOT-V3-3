const axios = require('axios');

module.exports = {
  config: {
    name: 'random',
    aliases: ['random'],
    version: '1.0.0',
    author: 'RazihelX',
    role: 0,
    category: 'utility',
    shortDescription: {
      en: 'Generate a random number within a given range'
    },
    longDescription: {
      en: 'Generate a random number within a given range'
    },
    guide: {
      en: '{pn} <min> <max>'
    }
  },
  onStart: async function ({ api, event, args }) {
    const min = parseInt(args[0]);
    const max = parseInt(args[1]);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    api.sendMessage(`Your random number is: ${randomNumber}`, event.threadID, event.messageID);
  },
};