module.exports = {
    config: {
        name: "lol",
        version: "1.0",
        author: "Ryukazi Garcia",
        countDown: 5,
        role: 0,
        shortDescription: "sarcasm",
        longDescription: "sarcasm",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "Randi") return message.reply("TERO DIUTA JUNDA KO KALO PUTI SALE💀😘 ");
}
};