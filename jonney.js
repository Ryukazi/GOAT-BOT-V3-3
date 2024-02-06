module.exports = {
 config: {
 name: "jonney",
 version: "1.0",
 author: "ryukazi",
 countDown: 5,
 role: 0,
 shortDescription: "no prefix",
 longDescription: "no prefix",
 category: "no prefix",
 }, 
 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "jonney") {
 return message.reply({
 body: "hello, i'm jonney meme.",
 attachment: await global.utils.getStreamFromURL ("https://i.ibb.co/YcvGy8S/image.jpg")
 });
 }
 }
}