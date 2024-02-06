const axios = require("axios");

module.exports = {
 config: {
 name: "ngc",
 version: "1.0",
 author: "milan-says",
 countDown: 5,
 role: 0,
 shortDescription: "Get player info",
 longDescription: {
 en: "Provides you the information of esports player of Philippine Gaming Community (ngc)"
 },
 category: "info",
 guide: {
 en: "{pn} <player name>"
 }
 },

 onStart: async function ({ api, event, args, message }) {
 try { 
 const playerName = args.join(' ');
 const response = await axios.get(`https://milanbhandari.imageapi.repl.co/pubg`, {
 params: {
 apikey: 'xyzmilan',
 query: playerName
 }
 });

 const message = {body:`Here's some information about :\n\────────${response.data.id}────────\n\n❏Name: ${response.data.name}\n❏Nationality: ${response.data.nationality}\n❏Status: ${response.data.status}\n❏Team: ${response.data.team}\n❏Join Date: ${response.data.joindate}\n❏Bio: ${response.data.bio}\n❏Picture:`,attachment:await global.utils.getStreamFromURL(response.data.pic)};
 return api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 message.reply("An error occurred while fetching the player's information");
 }
 }
};