const axios = require('axios');

async function onStart({ api, event }) {
    const { threadID, messageID, type, messageReply, body } = event;
    let question = "";

    if (type === "message_reply" && messageReply.attachments[0]?.type === "photo") {
        const attachment = messageReply.attachments[0];
        const imageURL = attachment.url;
        question = await convertImageToText(imageURL);

        if (!question) {
            api.sendMessage(
                "❌ Failed to convert the photo to text. Please try again with a clearer photo.",
                threadID,
                messageID
            );
            return;
        }
    } else {
        question = body.slice(5).trim();

        if (!question) {
            api.sendMessage("Please provide a question or query", threadID, messageID);
            return;
        }
    }

    try {
        const apiBaseUrl = 'http://api.safone.me';
        const apiEndpoint = '/bard';
        const apiUrl = apiBaseUrl + apiEndpoint;

        console.log('API URL:', apiUrl);
        console.log('Question sent:', question);

        const response = await axios.get(apiUrl, { params: { message: question } });
        const responseData = response.data;

        const responseMessage = responseData.message;

        console.log('API response:', responseMessage);

        api.sendMessage(responseMessage, threadID);
    } catch (error) {
        console.error('Error during the API request:', error);
        api.sendMessage(langs.en.error, threadID);
    }
}

const config = {
    name: "bard",
    version: "1.0",
    author: "Samir Œ",
    role: 0, 
    shortDescription: {
        en: "Command to interact with the conversation AI."
    },
    longDescription: {
        en: "Use the command by typing /bard ask any question."
    },
    category: "Examples", 
    guide: {
        en: "Use the command by typing /bard who is elon"
    }
};

const langs = {
    en: {
        error: "Sorry, an error occurred while communicating with the conversation AI."
    }
};

async function onReply({ api, event }) {
    const { threadID, messageReply } = event;

    if (messageReply) {
        const question = messageReply.body;

        try {
            const apiBaseUrl = 'http://api.safone.me';
            const apiEndpoint = '/bard';
            const apiUrl = apiBaseUrl + apiEndpoint;

            console.log('API URL:', apiUrl);
            console.log('Question sent:', question);

            const response = await axios.get(apiUrl, { params: { message: question } });
            const responseData = response.data;

            const responseMessage = responseData.message;

            console.log('API response:', responseMessage);

            api.sendMessage(responseMessage, threadID);
        } catch (error) {
            console.error('Error during the API request:', error);
            api.sendMessage(langs.en.error, threadID);
        }
    }
}

module.exports = {
    config,
    langs,
    onStart,
    onReply
};