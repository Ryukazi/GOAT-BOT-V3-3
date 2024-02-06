//made by SiAM Don't change credit

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const Jimp = require("jimp");
const { getStreamFromURL, findUid } = global.utils;

module.exports = {
	config: {
		name: "avoid",
		version: "2.0",
		author: "SiAM | @Siam.The.The.Fox",
		countDown: 6,
		role: 0,
		shortDescription: "meme Maker",
		longDescription: "Meme create with specified profile picture",
		category: "Meme-Edit",
		guide: {
			en: "{pn} [@tag|uid|fbLink]"
		}
	},

	onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {

            const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
    const approvedIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/approved_main.json`));
    const bypassIds = JSON.parse(fs.readFileSync(`${__dirname}/assist_json/bypass_id.json`));
    const bypassUid = event.senderID;
    if (bypassIds.includes(bypassUid)) {
      console.log(`User ${bypassUid} is in bypass list. Skipping the main approval check.`);
    } else {
      const threadID = event.threadID;
      if (!approvedIds.includes(threadID)) {
        const msgSend = message.reply(`cmd 'avoid' is locked 🔒...\n Reason : Bot's main cmd \nyou need permission to use all main cmds.\n\nType ${p}requestMain to send a request to admin`);
        setTimeout(async () => {
          message.unsend((await msgSend).messageID);
        }, 40000);
        return;
      }
    }  
    
		let uid = null;
		const input = args.join(' ');

		if (event.mentions && Object.keys(event.mentions).length > 0) {
			uid = Object.keys(event.mentions)[0];
		} else if (/^\d+$/.test(input)) {
			uid = input;
		} else if (input.includes('facebook.com')) {
    let linkUid;
    try {
        linkUid = await findUid(input);
    } catch (error) {
        console.log(error);
        return message.reply("Sorry, I couldn't find the ID from the Facebook link you provided.");
    }
    if (linkUid) {
        uid = linkUid;
    }
    }
		if (!uid) {
			return message.reply(' Please @mention someone or Use Facebook profile link or direct UID');
    }

		const profilePicUrl = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
		const profilePicStream = await getStreamFromURL(profilePicUrl);
		const templateURL = "https://i.ibb.co/QQC1fzq/Picsart-23-04-13-12-35-19-485.png";
    		const textImageURL = "https://i.ibb.co/zrYF6fM/Picsart-23-04-13-11-24-31-876.png";

		axios.get(profilePicUrl, { responseType: "arraybuffer" }).then(async (response) => {
			const profilePic = await Jimp.read(response.data);
			const template = await Jimp.read(templateURL);
      		const textImage = await Jimp.read(textImageURL);
    			profilePic.resize(template.bitmap.width, Jimp.AUTO);
      			const y = Math.max((template.bitmap.height - profilePic.bitmap.height) / 2 + 115, 0);
      			template.composite(profilePic, 0, y);
      			textImage.resize(template.bitmap.width, Jimp.AUTO);
      			template.composite(textImage, 0, 1650);
      			template.background(0x00000080); 
      			const outputBuffer = await template.getBufferAsync(Jimp.MIME_PNG);
      			fs.writeFileSync(`${uid}_edited.png`, outputBuffer);

			message.reply({
				body: ` Avoid this scammers in bangladesh!`,
				attachment: fs.createReadStream(`${uid}_edited.png`)
			}, () => fs.unlinkSync(`${uid}_edited.png`));
		}).catch((error) => {
			console.log(error);
			message.reply("There was an error processing the image.");
		});
	}
};
//made by SiAM Don't change credit