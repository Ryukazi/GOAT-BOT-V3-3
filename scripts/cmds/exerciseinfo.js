const axios = require('axios');

module.exports = {
  config: {
    name: 'exerciseinfo',
    aliases: ["exercises", "exercise"],
    version: '1.0',
    author: 'JV Barcenas',
    role: 0,
    category: 'utility',
    shortDescription: {
      en: 'Retrieves information about a specified exercise.'
    },
    longDescription: {
      en: 'Retrieves information about a specified exercise from the Exercise API.'
    },
    guide: {
      en: `Guide: 
      abdominals, abductors, adductors,
      biceps,
      calves,
      chest,
      forearms,
      glutes,
      hamstrings,
      lats,
      lower_back,
      middle_back,
      neck,
      quadriceps,
      traps,
      triceps`
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      // Check if the user provided an exercise
      if (!args[0]) {
        const guideMessage = `
          Guide: 
          abdominals,
          abductors,
          adductors,
          biceps,
          calves,
          chest,
          forearms,
          glutes,
          hamstrings,
          lats,
          lower_back,
          middle_back,
          neck,
          quadriceps,
          traps,
          triceps
        `;
        api.sendMessage(guideMessage, event.threadID);
        return;
      }

      const exercise = args[0];
      const apiUrl = `https://exercise-api.dreamcorps.repl.co/api/exercises?exercise=${exercise}`;

      const response = await axios.get(apiUrl);

      if (response.status !== 200 || !response.data || response.data.length === 0) {
        throw new Error('Invalid or missing response from Exercise API');
      }

      const exercises = response.data;

      const randomIndex = Math.floor(Math.random() * exercises.length);
      const randomExercise = exercises[randomIndex];

      const {
        name,
        type,
        muscle,
        equipment,
        difficulty,
        instructions
      } = randomExercise;

      const message = `
        Exercise: ${name}
        Type: ${type}
        Muscle: ${muscle}
        Equipment: ${equipment}
        Difficulty: ${difficulty}
        Instructions: ${instructions}
      `;

      const messageID = await api.sendMessage(message, event.threadID);
      if (!messageID) {
        throw new Error('Failed to send message');
      }

      console.log(`Sent exercise information with message ID ${messageID}`);
    } catch (error) {
      console.error(`Failed to send exercise information: ${error.message}`);
      api.sendMessage('Sorry, something went wrong while trying to retrieve exercise information. Please try again later.', event.threadID);
    }
  }
};