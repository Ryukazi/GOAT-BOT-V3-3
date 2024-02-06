const axios = require('axios');

module.exports = {
  config: {
    name: 'gen',
    version: '1.0',
    author: 'OtinXSandip',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'Text to Image'
    },
    category: 'ai',
    guide: {
      en: '{pn} prompt'
    }
  },

  onStart: async function ({ message, api, args, event }) {
    const ass = args.join(' ');
    
    if (!ass) {
      return message.reply("😡Please provide a prompt ");
    }
    api.setMessageReaction("⏳", event.messageID, () => {}, true);
    
    const startTime = new Date().getTime(); 
    
    message.reply("✅| Generating please wait.", async (err, info) => { 
      const lado = `https://shivadon.onrender.com/gen?prompt=${ass}`;
      const puti = await axios.get(lado);
      const bubu = puti.data.url;
      
      const endTime = new Date().getTime(); 
      const timeTaken = (endTime - startTime) / 1000; 
      message.reply({ 
        body: `Here is your imagination 🥰\nTime taken: ${timeTaken} seconds`,
        attachment: await global.utils.getStreamFromURL(bubu)
      });
      
      let ui = info.messageID;
      message.unsend(ui);
      api.setMessageReaction("✅", event.messageID, () => {}, true);
    });
  }
};