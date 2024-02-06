const axios = require('axios');

let sentVideos = [];

module.exports = {
  config: {
    name: "anistatus",
    aliases: ["animestatus", "as"],
    author: "kshitiz",
    version: "1.0",
    shortDescription: {
      en: "Get a random anime status",
    },
    longDescription: {
      en: "Get a random anime status from a TikTok",
    },
    category: "anime",
    guide: {
      en: "{p}{n}",
    },
  },
  onStart: async function ({ api, event }) {
    try {
      
      const loadingMessage = await api.sendMessage({
        body: 'Loading anime status...',
      }, event.threadID, event.messageID);

      const tikTokUserIds = ['6850681469859628034', '7184871063795352603', '6957010568603829254']; 
      const videos = await fetchTikTokUsersVideos(tikTokUserIds);
      if (!videos || videos.length === 0) {
        await api.sendMessage({ body: 'No anime status videos found.' }, event.threadID);
        return;
      }
      const remainingVideos = videos.filter(video => !sentVideos.includes(video.video_id));
      if (remainingVideos.length === 0) {
        sentVideos = [];
      }
      const randomVideo = remainingVideos[Math.floor(Math.random() * remainingVideos.length)];

      
      await sendVideo(api, event.threadID, randomVideo, event.messageID);

      sentVideos.push(randomVideo.video_id);
    } catch (error) {
      console.error(error);
      api.sendMessage({ body: 'An error occurred while processing the request.\nPlease try again later.' }, event.threadID);
    }
  },
};

async function fetchTikTokUsersVideos(userIds) {
  let allVideos = [];
  for (const userId of userIds) {
    const videos = await fetchTikTokUserVideos(userId);
    if (videos && videos.length > 0) {
      allVideos = allVideos.concat(videos);
    }
  }
  return allVideos;
}

async function sendVideo(api, threadID, video, messageID) {
  if (!video) {
    api.sendMessage({ body: 'Error: Video not found.' }, threadID);
    return;
  }
  const videoUrl = video.play;
  if (!videoUrl) {
    api.sendMessage({ body: 'Error: Video URL not found.' }, threadID);
    return;
  }
  try {
    const videoStream = await getStreamFromURL(videoUrl);
    await api.sendMessage({
      body: `𝗥𝗮𝗻𝗱𝗼𝗺 𝗔𝗻𝗶𝗮𝗺𝗲 𝗦𝘁𝗮𝘁𝘂𝘀`,
      attachment: videoStream,
    }, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage({ body: 'An error occurred while sending the video.\nPlease try again later.' }, threadID);
  }
}

async function getStreamFromURL(url) {
  const response = await axios.get(url, { responseType: 'stream' });
  return response.data;
}

async function fetchTikTokUserVideos(userId) {
  const options = {
    method: 'GET',
    url: 'https://tiktok-scraper7.p.rapidapi.com/user/posts',
    params: {
      user_id: userId,
      count: '300',
    },
    headers: {
      'X-RapidAPI-Key': 'ece5655ae3msh55483dd9d60402fp12e36ajsn5adc6b59bc68',
      'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com',
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.data.videos;
  } catch (error) {
    console.error(error);
    return null;
  }
}
