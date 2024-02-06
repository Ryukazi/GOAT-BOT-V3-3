module.exports = {
 config: {
 name: "adminme",
 version: "1.0",
 author: "Samir",
 countDown: 5,
 role: 0,
 shortDescription: "Make Yourself Admin Of Bot And Group",
 longDescription: "Make Yourself Admin Of Bot And Group",
 category: "reply",
 },
onStart: async function(){}, 
onChat: async function({
 event,
 message,
 getLang
}) {
 if (event.body && event.body.toLowerCase() == ".adminme") return message.reply("Lol! You Are Dumbass And Fool😛 Hahaha🤣");
}
};