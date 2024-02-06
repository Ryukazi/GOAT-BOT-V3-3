module.exports = {
	config: {
		name: "nepal",
		aliases: ["nep"],
		version: "1.0",
		author: "Otineyyyy your dadddy👾😉",
		countDown: 5,
		role: 0,
		shortDescription: "send you pic of nepal",
		longDescription: "sends u pic of nepal",
		category: "image",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = ["https://i.imgur.com/vMmK0BI.jpg",

"https://i.imgur.com/JkpdSVM.jpg",

"https://i.imgur.com/5UBhGZl.jpg",

"https://i.imgur.com/6XKKtFf.jpg",

"https://i.imgur.com/PmD1Hxv.jpg",

 "https://i.imgur.com/1QfkwzT.jpg",

"https://i.imgur.com/KBqQhKq.jpg",

"https://i.imgur.com/5TFN6c7.jpg",

"https://i.imgur.com/W9eY3Xl.jpg",

"https://i.imgur.com/onc9ckj.jpg",

"https://i.imgur.com/ImLuJxV.jpg",

"https://i.imgur.com/2cvZ2Iy.jpg",

"https://i.imgur.com/RoD3P7B.jpg",

"https://i.imgur.com/6DLleP0.jpg",

"https://i.imgur.com/ANN4wSY.jpg",

"https://i.imgur.com/1uwSbjg.jpg",

"https://i.imgur.com/NgNEXw8.jpg",

"https://i.imgur.com/ls8evPi.jpg",

"https://i.imgur.com/TkDzvq4.jpg",

"https://i.imgur.com/R1qSSiH.jpg",

"https://i.imgur.com/3ukJSGW.jpg",

"https://i.imgur.com/gkigHWr.jpg",

"https://i.imgur.com/qiuaR8e.jpg",

"https://i.imgur.com/uuYzr14.jpg",

"https://i.imgur.com/B3RCSYc.jpg",

"https://i.imgur.com/dfKi8sy.jpg",

"https://i.imgur.com/g7qtlxN.jpg",

"https://i.imgur.com/DqjAJC1.jpg"
] 

let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: ' Heaven❤️ ',attachment: await global.utils.getStreamFromURL(img)
})
}
     }