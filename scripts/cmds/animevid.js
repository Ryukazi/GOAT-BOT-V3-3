const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "animevid",
    version: "1.0",
    author: "SiAM",
    countDown: 5,
    role: 0,
    shortDescription: "Get random anime video",
    longDescription: "bot wil send you random short anime video",
    category: "Anime",
    guide: "To use this command, simply type {pn}"
  },

  onStart: async function ({ api, args, message }) {
    try {
      const response = await axios.get("https://caochungdat.me/docs/other/videoanime");
      const videoUrl = response.data.url;
      const buffer = await axios.get(videoUrl, { responseType: "arraybuffer" });
      const time = Date.now();
      fs.writeFileSync(`${time}_anime.mp4`, buffer.data);
      message.reply({
        body: `Random anime video generated! 🎉`,
        attachment: fs.createReadStream(`${time}_anime.mp4`)
      }, () => fs.unlinkSync(`${time}_anime.mp4`));
    } catch (error) {
      console.error(error);
      message.reply(`Sorry, API not responding.try again later...`);
    }
  }
};