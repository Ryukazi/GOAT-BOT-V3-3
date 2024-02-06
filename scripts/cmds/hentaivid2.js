const axios = require('axios');

module.exports = {
	config: {
		name: "hentaivid2",
		aliases: ["hen3"],
		version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 2,
		shortDescription: "Anime Hentai",
		longDescription: "Get Anime Hentai.",
		category: "Adult",
		guide: "{pn}"
	},

	onStart: async function ({ message, args }) {
			const BASE_URL = `https://api.zahwazein.xyz/downloader/hentaivid?apikey=zenzkey_92d341a7630e`;
 message.reply("processing your request."); 
			try {
				let res = await axios.get(BASE_URL)
				let porn = res.data.result.video_1;
				const form = {
					body: ``
				};
		 if (porn)
					form.attachment = await global.utils.getStreamFromURL(porn);
				message.reply(form); 
			} catch (e) { message.reply(`An Error Occured While Processing Your Request.`)
 console.log(e);
 }

		}
	};