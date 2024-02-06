const axios = require('axios');
const fs = require('fs-extra');
const request = require('request');
const videoLinks = JSON.parse(fs.readFileSync('./scripts/cmds/assist_json/hentaivid.json'));

module.exports = {
    config: {
        name: "hentaivid3",
        version: "2.0",
        author: "SiAM",
        countDown: 120,
        role: 1,
        category: "NSFW",
    },

    onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName }) {


      
    const isDisabled = false;
    if (isDisabled) {
      const replyMessage = 'Sorry, hentaivid Command is Temporary Deactivated by Admin \n\n Reason: Account Message block problem.\n join support group for more \nType: $support\nto join';
      message.reply(replyMessage);
      return;
    }


      const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
    const approvedmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_main.json`));
    const bypassmain = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
    const bypassmUid = event.senderID;
    if (bypassmain.includes(bypassmUid)) {
      console.log(`User ${bypassmUid} is in bypass list. Skipping the main approval check.`);
    } else {
      const threadmID = event.threadID;
      if (!approvedmain.includes(threadmID)) {
        const msgSend = message.reply(`cmd 'hentaivid' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }  
      


      const approvedIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_ids.json`));
    const bypassIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
    const bypassUid = event.senderID;
    if (bypassIds.includes(bypassUid)) {
      console.log(`User ${bypassUid} is in bypass list. Skipping the NSFW approval check.`);
    } else {
      const threadID = event.threadID;
      if (!approvedIds.includes(threadID)) {
        const msgSend = message.reply("Your thread/group is not allowed to use this command (18+ video)\ntype  $requestNSFW\nto send a request to admin for permission...");
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }

        const validCategories = Object.keys(videoLinks);

        const videoUrl = videoLinks[validCategories[Math.floor(Math.random() * validCategories.length)]];
        const videoId = videoUrl.match(/\/d\/(.+)\//)[1];

        const response = await axios({
            method: 'get',
            url: `https://drive.google.com/u/0/uc?id=${videoId}&export=download`,
            responseType: 'stream'
        });

        const tempFile = `./${videoId}.mp4`;
        const writer = fs.createWriteStream(tempFile);
        response.data.pipe(writer);

        const loadingMessage = await message.reply("hentai Video is Buffering ⌛\nPlease wait at last 50s\n\nDon't Spam just wait if the video is not coming after 2 minutes then try again");
      

        writer.on('finish', () => {
            const uid = message.threadID;
            const attachmentPath = `./${uid}_${videoId}.mp4`;

            const fileStream = fs.createWriteStream(attachmentPath);
            fileStream.on('finish', () => {
                message.reply({
                    body: "Enjoy🫂💦 !",
                    attachment: fs.createReadStream(attachmentPath)
                }, async () => {
                    fs.unlinkSync(attachmentPath);
                    fs.unlinkSync(tempFile);
                    await message.unsend(loadingMessage.messageID);
                });
            });

            fileStream.on('error', (err) => {
                console.log(err);
            });

            fs.createReadStream(tempFile).pipe(fileStream);
        });

        
    }
};
