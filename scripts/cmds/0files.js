const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "files",
    author: "LoidButter",
    version: "1.7",
    countDown: 5,
		role: 2,
    description: "Creates a new file in the cmds folder and writes the provided text to the file",
    usage: "fs creat <filename> <text>",
    example: "fs creat hi.js hhhhhhhhhhhh"
  },

  onStart: async function ({ args, message }) {
    const fileName = args[0];
    const text = args.slice(1).join(" ");

    
    if (!fileName || !text) {
      return message.reply("use:fs hi.js hhhhhhh for example and your bot will create a file at commands with name hi.js and he put inside hhhhhhhhhh (example) recommended to create commands from caht - MODED BY Loid Butter DON'T change or i I don't share my commands again 😐");
    }

    
    const filePath = path.join(__dirname, '..', 'cmds', fileName);

    
    fs.writeFile(filePath, text, (err) => {
      if (err) throw err;
      message.reply(`file ${fileName} restart the bot/cmd load the command`);
    });
  }
};