const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "catsay",
    aliases: ["meowsay"],
    version: "1.0",
    author: "SaikiDesu",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "Edit-img",
    guide: {
      en: "{p}catsay"
    }
  },
  onStart: async function({ api, event, args }) {
    const { threadID, messageID, senderID, body } = event;
    let text = args.toString().replace(/,/g, "  ");

    if (!text) {
      return api.sendMessage("[Text]", event.threadID, event.messageID);
    }

    const callback = () =>
      api.sendMessage(
        { body: "", attachment: fs.createReadStream(__dirname + "/tmp/cat.png") },
        event.threadID,
        () => fs.unlinkSync(__dirname + "/tmp/cat.png"),
        event.messageID
      );

    return request(encodeURI(`https://cataas.com/cat/cute/says/${text}`))
      .pipe(fs.createWriteStream(__dirname + "/tmp/cat.png"))
      .on("close", () => callback());
  }
};