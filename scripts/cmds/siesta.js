const axios = require('axios');
const request = require('request');
const fs = require('fs');

module.exports = {
  config: {
    name: 'siesta',
    aliases: ['Siesta'],
    author: 'Shinpei',
    version: '1.0.0',
    role: 0,
    countdown: 5,
    shortDescription: { en: 'Random photo of siesta' },
    longDescription: { en: 'Random photo of siesta my wife uwu' },
    category: 'photo',
    guide: { en: '{p}siesta' },
  },

  onStart: async function ({ event, api }) {
    axios.get('https://siesta-api.bhhoang.repl.co')
      .then((res) => {
        let ext = res.data.success.substring(res.data.success.lastIndexOf('.') + 1);
        let callback = function () {
          api.sendMessage({
            attachment: fs.createReadStream(__dirname + `/tmp/siesta.${ext}`),
          }, event.threadID, () => fs.unlinkSync(__dirname + `/tmp/siesta.${ext}`), event.messageID);
        };
        request(res.data.success).pipe(fs.createWriteStream(__dirname + `/tmp/siesta.${ext}`)).on('close', callback);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};