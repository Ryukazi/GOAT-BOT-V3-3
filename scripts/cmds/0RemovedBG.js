const axios = require("axios");
const fs = require("fs-extra");

const apiKey = "RdjJDazKqAvUqNNsqDMb43cN";

module.exports = {
    config: {
        name: "removebg",
        version: "2.0",
        aliases: ["rvb"],
        author: "SiAM",
        countDown: 30,
        role: 0,
        category: "Image",
        shortDescription: "Remove Background from Image",
        longDescription: "Remove Background from any image\nReply an Image or Add a image URL to use the command",
        guide: {
            en: "{pn} reply an image URL | add URL",
        },
    },

    onStart: async function ({ api, args, message, event }) {



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
        const msgSend = message.reply(`cmd 'RemoveBG' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }  
      
        let imageUrl;
        let type;
        if (event.type === "message_reply") {
            if (["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
                imageUrl = event.messageReply.attachments[0].url;
                type = isNaN(args[0]) ? 1 : Number(args[0]);
            }
        } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
            imageUrl = args[0];
            type = isNaN(args[1]) ? 1 : Number(args[1]);
        } else {
            return message.reply("Please Provide an image URL or Reply an Image..!⚠️");
        }

        const processingMessage = message.reply("Removing Background⌛.\nPlease wait...⏰");

        try {
            const response = await axios.post(
                "https://api.remove.bg/v1.0/removebg",
                {
                    image_url: imageUrl,
                    size: "auto",
                },
                {
                    headers: {
                        "X-Api-Key": apiKey,
                        "Content-Type": "application/json",
                    },
                    responseType: "arraybuffer",
                }
            );

            const outputBuffer = Buffer.from(response.data, "binary");

            const fileName = `${Date.now()}.png`;
            const filePath = `./${fileName}`;

            fs.writeFileSync(filePath, outputBuffer);
            message.reply(
                {
                    attachment: fs.createReadStream(filePath),
                },
                () => fs.unlinkSync(filePath)
            );

        

        } catch (error) {
            message.reply("Something went wrong. Please try again later..!⚠️🤦\n\nI already send message to Admin about the error. He will fix it as soon as Possible.🙎");
            const errorMessage = `----RemoveBG Log----\nSomething is chasing error with removebg command.\nPlease check the API key was not expired..\n\nCheck the API key here:\nhttps://www.remove.bg/dashboard`;
            const { config } = global.GoatBot;
            for (const adminID of config.adminBot) {
                api.sendMessage(errorMessage, adminID);
            }
        }

        message.unsend((await processingMessage).messageID);
    },
};