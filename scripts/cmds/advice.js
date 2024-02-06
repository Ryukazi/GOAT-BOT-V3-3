const axios = require('axios');

module.exports = {
	config: {
		name: "advice",
		aliases: ["adviced"],
		version: "1.0",
		author: "Samir",
		countDown: 5,
		role: 0,
		shortDescription: "get inspiration from legends of weebs",
		longDescription: "",
		category: "anime",
		guide: "{pn}"
	},

	onStart: async function ({ message, args }) {
		const BASE_URL = `https://api.safone.me/advice`;
		try {
			let res = await axios.get(BASE_URL)
			let res2 = res.data
      let advice = res2.advice
      let name = res2.name   
      let anime = res2.anime   
			const form = {
				body: `${advice}\n` + ` \nadvice from: Loid. \n`
			};
			
			message.reply(form);
		} catch (e) { message.reply('change api') }

	}
};