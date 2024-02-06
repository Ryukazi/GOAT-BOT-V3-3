const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');
const stream = require('stream');


async function getStreamFromURL(url) {
  const response = await axios.get(url, { responseType: 'stream' });
  return response.data;
}

module.exports = {
  config: {
    name: "cornhub",// api from jarif
    aliases: [],
    author: "kshitiz",
    version: "2.0",
    cooldowns: 5,
    role: 2,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: ""
    },
    category: "𝟭𝟴+",
    guide: {
      en: "{p}{n} [category] (e.g., {p}{n} sex)\nReply by number"
    }
  },
  onStart: async function ({ api, event, args }) {
    const category = args.join(' ');

    if (!category) {
      api.sendMessage({ body: 'Please provide a category. (e.g., {p}{n} sex)', mentions: [{ tag: 'pornhub', id: '100049894418762' }] }, event.threadID);
      return;
    }

    try {
      const { data } = await axios.get(`https://project-pornhub.onrender.com/ph?q=${category}&fbclid=IwAR0C2yig1ndXdOKrkbMg98OKIlNG-irVi9f_2q8NjvK03Ep3WYuf4nyvY44`);

      if (!data || data.length === 0) {
        api.sendMessage({ body: `No titles found for the category: ${category}.` }, event.threadID);
        return;
      }

      const titles = data.map((video, index) => `${index + 1}. ${video.title}`);
      const message = 'Choose a video by replying with its number:\n\n' + titles.join('\n');

      const tempFilePath = path.join(os.tmpdir(), 'cornhub_response.json');
      fs.writeFileSync(tempFilePath, JSON.stringify(data));

      api.sendMessage({ body: message }, event.threadID, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: 'cornhub',
          messageID: info.messageID,
          author: event.senderID,
          category,
          tempFilePath,
        });
      });
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: 'An error occurred while fetching data.\nPlease try again later.' }, event.threadID, event.messageID);
    }
  },
  onReply: async function ({ api, event, Reply, args }) {
    const { author, commandName, category, tempFilePath } = Reply;

    if (event.senderID !== author || !tempFilePath) {
      return;
    }

    const videoIndex = parseInt(args[0], 10);

    if (isNaN(videoIndex) || videoIndex <= 0) {
      api.sendMessage({ body: 'Invalid input. Please provide a valid number.' }, event.threadID, event.messageID);
      return;
    }

    try {
      const data = JSON.parse(fs.readFileSync(tempFilePath, 'utf-8'));

      if (!data || data.length === 0 || videoIndex > data.length) {
        api.sendMessage({ body: 'Invalid video number. Please choose a number within the range.' }, event.threadID, event.messageID);
        return;
      }

      const selectedVideo = data[videoIndex - 1];
      const videoUrl = selectedVideo.video_url;

      if (!videoUrl) {
        api.sendMessage({ body: 'Error: Video not found.' }, event.threadID, event.messageID);
        return;
      }


      const videoStream = await getStreamFromURL(videoUrl);


      await api.sendMessage({
        body: 'Here is your video:',
        attachment: videoStream,
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: 'An error occurred while processing the video.\nPlease try again later.' }, event.threadID, event.messageID);
    }
  }
};
