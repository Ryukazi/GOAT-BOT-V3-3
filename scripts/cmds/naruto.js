module.exports = {
  config: {
    name: "naruto",
    version: "1.0",
    author: "Jaychris Garcia",
    countDown: 5,
    role: 0,
    shortDescription: "no prefix",
    longDescription: "no prefix",
    category: "no prefix",
  },
  onStart: async function(){},
  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "naruto") {
      return message.reply({
        body: "hello, add my master Jhou.",
        attachment: await global.utils.getStreamFromURL("https://i.imgur.com/supUfDQ.jpg")
      });
    }
  }
}