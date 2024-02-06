const fs = require('fs');

module.exports = {
	config: {
		name: "cosplay",
		version: "1.0",
		author: "AceGun",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: "Sends a random cosplay image."
		},
		longDescription: {
			vi: "",
			en: "Sends a random cosplay image."
		},
		category: "fun",
		guide: {
			en: "{pn}"
		},
		envConfig: {}
	},

	onStart: async function ({ message }) {
		const json = JSON.parse(fs.readFileSync('cosplay.json'));
		const data = json[Math.floor(Math.random() * json.length)];
		const link = data.link;
		message.reply({
			body: '「 Here is your waifu😻❤️ 」', attachment: await global.utils.getStreamFromURL(link)
		});
	}
};