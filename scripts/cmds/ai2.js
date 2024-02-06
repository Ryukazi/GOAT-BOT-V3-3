const axios = require('axios');

module.exports = {
  config: {
    name: "ai2",
    aliases: ["openai"],
    version: "1.0",
    author: "",
    countDown: 5,
    role: 0,
    shortDescription: "Ask anything",
    longDescription: "Ask anything",
    category: "ai",
    guide: {
      en: "{pn} ask"
    },
  },

  onStart: async function ({ message, args, api, event }) {
    const { messageID, threadID } = event;
    const response = args.join(" ");
    if (!response) return api.sendMessage("How may I help you?", threadID, messageID);
    try {
      const res = await axios.get(`https://sim.ainz-project.repl.co/others/gpt?prompt=${response}`);
      const respond = res.data.result;
      api.sendMessage(respond, threadID, messageID);
    } catch (error) {
      api.sendMessage("An error occurred while making the API request.", threadID, messageID);
    }
  }
};