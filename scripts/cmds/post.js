const { loadImage, createCanvas } = require("canvas");
const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "post",
    author: "AceGun",
    countDown: 5,
    role: 0,
    category: "fun",
    shortDescription: {
      en: "mentioned your friend and write something to post✍️",
    },
  },
  wrapText: async function (ctx, text, maxWidth) {
    const words = text.split(" ");
    const lines = [];
    let line = "";

    for (const word of words) {
      const currentLine = `${line}${word} `;
      const currentLineWidth = ctx.measureText(currentLine).width;
      if (currentLineWidth <= maxWidth) {
        line = currentLine;
      } else {
        lines.push(line.trim());
        line = `${word} `;
      }
    }

    lines.push(line.trim());
    return lines;
  },

  onStart: async function ({ args, usersData, threadsData, api, event }) {
    let pathImg = __dirname + "/cache/background.png";
    let pathAvt1 = __dirname + "/cache/Avtmot.png";
    var id = Object.keys(event.mentions)[0] || event.senderID;
    var name = await api.getUserInfo(id);
    name = name[id].name;
    var ThreadInfo = await api.getThreadInfo(event.threadID);
    var background = ["https://i.ibb.co/9478549/image.jpg"];
    var rd = background[Math.floor(Math.random() * background.length)];
    let getAvtmot = (
      await axios.get(
        `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,
        { responseType: "arraybuffer" }
      )
    ).data;
    fs.writeFileSync(pathAvt1, Buffer.from(getAvtmot, "utf-8"));
    let getbackground = (
      await axios.get(`${rd}`, {
        responseType: "arraybuffer",
      })
    ).data;
    fs.writeFileSync(pathImg, Buffer.from(getbackground, "utf-8"));
    let baseImage = await loadImage(pathImg);
    let baseAvt1 = await loadImage(pathAvt1);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);

    // Adjust the dimensions and positioning of the text
    const commentMaxWidth = canvas.width - 100; // Maximum width for comment text
    const commentX = 45; // X coordinate of the comment text
    const commentY = 150; // Y coordinate of the comment text

    const nameMaxWidth = canvas.width - 200; // Maximum width for name text
    const nameX = 120; // X coordinate of the name text
    const nameY = 50; // Y coordinate of the name text

    // Set the font and color for the text
    ctx.font = "400 23px Arial";
    ctx.fillStyle = "#000000"; // Black color for the text

    const mentionUser = args[0];
    const commentText = args.slice(args.indexOf("|") + 1).join(" ");

    const commentLines = await this.wrapText(ctx, commentText, commentMaxWidth);
    const nameLines = await this.wrapText(ctx, name, nameMaxWidth);

    // Draw the comment text
    commentLines.forEach((line, index) => {
      ctx.fillText(line, commentX, commentY + index * 28);
    });

    // Draw the name text in bold
    ctx.font = "700 23px Arial";
    nameLines.forEach((line, index) => {
      ctx.fillText(line, nameX, nameY + index * 28);
    });

    // Draw the avatar image
    const avatarX = 20; // X coordinate of the avatar
    const avatarY = 24; // Y coordinate of the avatar
    const avatarWidth = 80; // Width of the avatar
    const avatarHeight = 80; // Height of the avatar

    ctx.beginPath();
    ctx.arc(
      avatarX + avatarWidth / 2,
      avatarY + avatarHeight / 2,
      avatarWidth / 2,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(baseAvt1, avatarX, avatarY, avatarWidth, avatarHeight);

    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    fs.removeSync(pathAvt1);
    return api.sendMessage(
      {
        body: " ",
        attachment: fs.createReadStream(pathImg),
      },
      event.threadID,
      () => fs.unlinkSync(pathImg),
      event.messageID
    );
  },
};