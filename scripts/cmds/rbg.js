const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const formData = new FormData();

formData.append('size', 'auto');

module.exports = {
	config: {
		name: "rbg",
		version: "1.0",
		author: "kivv",
		countDown: 5,
		role: 1,
		shortDescription: {
			en: "Unsend bot's message"
		},
		longDescription: {
			en: "Unsend bot's message"
		},
		category: "box chat",
	},

	onStart: async function ({ message, event, api, getLang }) {
		if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length == 0) {
			return message.send("There are no attachments in the message being replied to.");
		}

		formData.append('image_url', `${event.messageReply.attachments[0].url}`);

		try {
			let res = await axios.post("https://api.remove.bg/v1.0/removebg", formData, {
				responseType: 'arraybuffer',
				headers: {
					...formData.getHeaders(),
					'X-Api-Key': 'iDCaLMAZ9FEUkGiWUbZRbH1d',
				},
				encoding: null
			})
			await fs.writeFileSync(__dirname + "/tmp/rmv.png", res.data)

			message.send({
				body: " hu",
				attachment: fs.createReadStream(__dirname + "/tmp/rmv.png", res.data)
			}, () => {
				fs.unlinkSync(__dirname + "/tmp/rmv.png")
			})

		} catch (e) {
			message.send(" hh")
			console.log(e)
		}
	}
}