const wiki = require("wikijs").default;

module.exports = {
  config: {
    name: "wiki",
    author: "junjam",
    countDown: 5,
    role: 0,
    category: "utility",
    shortDescription: {
      en: "wiki",
    },
  },
  langs: {
    en: {
      missingInput: "Enter what you need to search for.",
      returnNotFound: "Can't find %1",
    },
  },
  onStart: async function ({ event, message, getLang, usersData, api, args }) {
    let content = args.join(" ");
    let url = "https://vi.wikipedia.org/w/api.php";
    if (args[0] === "en") {
      url = "https://en.wikipedia.org/w/api.php";
      content = args.slice(1).join(" ");
    }
    if (!content) {
      return api.sendMessage(getLang("missingInput", event.threadID, event.messageID));
    }
    try {
      const page = await wiki({ apiUrl: url }).page(content);
      const summary = await page.summary();
      return api.sendMessage(summary, event.threadID, event.messageID);
    } catch (error) {
      return api.sendMessage(getLang("returnNotFound", content), event.threadID, event.messageID);
    }
  },
};