module.exports = {
  config: {
    name: "math",
    version: "1.0",
    author: "Jn",
    role: 0,
    colldown: 5,
    shortDescription: "Perform basic arithmetic calculations.",
    category: "utility",
    guide: "{prefix}calculate <expression>"
  },
  onStart: async function ({ message, args }) {
    const expression = args.join(" ");

    if (!expression) {
      return message.reply("Please provide an expression to calculate!");
    }

    let result;
    try {
      result = eval(expression);
    } catch (error) {
      console.error(error);
      return message.reply("Oops! Something went wrong while trying to calculate your expression.");
    }

    message.reply(`The result of ${expression} is ${result}.`);
  },
};