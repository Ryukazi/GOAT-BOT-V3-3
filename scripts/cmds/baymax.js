const {get} = require("axios"),
    url = "http://eu4.diresnode.com:3301";

module.exports = {
  config: {
    name: "baymax",
    aliases: ["bmax"],
    version: "1.0.0",
    author: "Deku",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "Talk to Baymax 1.2 (continues conversation)",
    },
    longDescription: {
      en: "Talk to Baymax 1.2 (continues conversation)",
    },
    category: "AI",
    guide: {
      en: "baymax <ask> or baymax <clear> to reset conversation."
    },
  },

  onStart: async function ({ api, event, args }) {
    try {
     let prompt = args.join(' '), id = event.senderID;
           async function r(msg){
                 api.sendMessage(msg, event.threadID, event.messageID)
             }
            if(!prompt) return r("Missing input!\n\nIf you want to reset the conversation with "+this.config.name+" you can use “"+this.config.name+" clear”");
            r("🔍…");
            const res = await get(url+"/baymax_gpt?prompt="+prompt+"&idd="+id);
                return r(res.data.baymax);
       } catch (error) {
      console.error("Error :", error);
      return api.sendMessage(error.message, event.threadID, event.messageID)
     }
   }
};