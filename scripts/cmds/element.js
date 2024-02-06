const axios = require('axios');
const fs = require('fs-extra');
const request = require('request');

module.exports = {
  config: {
    name: 'element',
    aliases: ['periodic'],
    version: '1.0',
    author: 'Samir',
    countDown: 5,
    role: 0,
    shortDescription: {
      en: 'Get info of an element'
    },
    longDescription: {
      en: 'Get info of an element'
    },
    category: 'Study',
    guide: {
      en: ''
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      const { threadID, messageID } = event;
      const element = args.join(' ');
      const response = await axios.get(`https://api.popcat.xyz/periodic-table?element=${element}`);
      const data = response.data;
      console.log(data);

      const callback = function() {
        return api.sendMessage({
          body: `Element Name: ${data.name}\nSymbol: ${data.symbol}\nAtomic Number: ${data.atomic_number}\nAtomic Mass: ${data.atomic_mass}\n\nSummary: ${data.summary}`,
          attachment: fs.createReadStream(__dirname + `/tmp/image.png`)
        }, threadID, () => fs.unlinkSync(__dirname + `/tmp/image.png`), messageID);
      };
      return request(encodeURI(data.image)).pipe(fs.createWriteStream(__dirname + `/tmp/image.png`)).on('close', callback);
    } catch (err) {
      console.error(err);
      return api.sendMessage('Please provide an element name.', event.threadID);
    }
  }
};