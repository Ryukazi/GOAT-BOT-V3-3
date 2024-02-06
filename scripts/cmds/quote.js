module.exports = {
	config: {
		name: "quote",
		aliases: ["line"],
		version: "1.0",
		author: "Otinxsandip",
		countDown: 5,
		role: 0,
		shortDescription: "send u quotes",
		longDescription: "sends u quotes",
		category: "study",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ 
"https://i.imgur.com/xmATMRP.jpg",
     
"https://i.imgur.com/Qw5L6Mn.jpg",
     
"https://i.imgur.com/kBdJfQ4.jpg",
 "https://i.imgur.com/Pvg8kLf.jpg",
     
"https://i.imgur.com/HuuGyMZ.jpg",
     
"https://i.imgur.com/GdD5LE2.jpg",
     
"https://i.imgur.com/WJ3ik2y.jpg",
     
"https://i.imgur.com/AccKjzN.jpg",
     
"https://i.imgur.com/vjgah8y.jpg",
     
"https://i.imgur.com/cyjbY55.jpg",
     
"https://i.imgur.com/hXzY4zp.jpg",
     
"https://i.imgur.com/eR7LgTC.jpg",
     
"https://i.imgur.com/eDTl4Op.jpg",
  
"https://i.imgur.com/poWiZqh.jpg",
  
"https://i.imgur.com/H9ondlg.jpg",
  
"https://i.imgur.com/QumNVKm.jpg",
  
"https://i.imgur.com/GYbykkV.jpg",
  
"https://i.imgur.com/1FCW2Qc.jpg",
  
"https://i.imgur.com/dVd8H3I.jpg",
  
"https://i.imgur.com/CBnP8tI.jpg",
  
"https://i.imgur.com/vFkD43q.jpg",
  
"https://i.imgur.com/ngERSpr.jpg",
  
"https://i.imgur.com/B15I2hF.jpg",
  
"https://i.imgur.com/byvIdsc.jpg",
  
"https://i.imgur.com/faUQoUr.jpg",
  
"https://i.imgur.com/vlBVTPj.jpg",
  
"https://i.imgur.com/Q3Bl9zN.jpg",
  
"https://i.imgur.com/SLW19Yy.jpg",
  
"https://i.imgur.com/jA2B3vA.jpg",
  
"https://i.imgur.com/tW4WNJ0.jpg",
  
"https://i.imgur.com/E6jocKH.jpg",
  
"https://i.imgur.com/j2Bh9Hf.jpg",
    ]
let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: 'Here is your quote of the day:)',attachment: await global.utils.getStreamFromURL(img)
})
}
     }