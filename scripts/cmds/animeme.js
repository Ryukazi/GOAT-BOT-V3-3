module.exports = {
  config: {
    name: 'animeme',
    aliases: ['anime-meme'],
    author: 'Xemon',
    version: '1.0.0',
    role: 0,
    countdown: 5,
    shortDescription: { en: 'Get random anime meme' },
    longDescription: { en: 'Get random anime meme from reddit' },
    category: 'fun',
    guide: { en: '{p}meme' }
  },

  onStart: async function ({ event, api, args }) {
    const request = require('request');
    const fs = require('fs-extra');
    const axios = require('axios');

    try {
      const response = await axios.get('https://www.reddit.com/r/anime_irl+animemes+Animemes+Memes_Of_The_Dank+awwnime/top.json?sort=top&t=week&limit=100');
      const posts = response.data.data.children;
      const post = posts[Math.floor(Math.random() * posts.length)].data;

      const title = post.title;
      const imageUrl = post.url;

      const callback = () => {
        api.sendMessage({
          body: `Title: ${title}`,
          attachment: fs.createReadStream(__dirname + '/tmp/animeme.png')
        }, event.threadID, () => fs.unlinkSync(__dirname + '/tmp/animeme.png'), event.messageID);
      };

      request(encodeURI(imageUrl)).pipe(fs.createWriteStream(__dirname + '/tmp/animeme.png')).on('close', callback);
    } catch (error) {
      console.error(error);
      await api.sendMessage('Error occurred while fetching an anime meme!', event.threadID);
    }
  }
};