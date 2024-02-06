const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "datetime",
    version: "1.4",
    author: "kae",
    countdown: 5,
    role: 0,
    shortDescription: "Displays the current date and time in the Philippines.",
    longDescription: "",
    category: "misc",
    guide: "{prefix}{name}",
    envConfig: {}
  },

  onStart: async function({ message, args }) {
    const philippinesTime = moment.tz("Asia/Manila").format("h:mm:ss A");
    const philippinesDate = moment.tz("Asia/Manila").format("dddd, DD MMMM YYYY");

    const reply = `Today Date & Time in the Philippines:\n` +
      `❏Date: ${philippinesDate}\n` +
      `❏Time: ${philippinesTime}`;

    message.reply(reply);
  },
  onEvent: async function() {}
};