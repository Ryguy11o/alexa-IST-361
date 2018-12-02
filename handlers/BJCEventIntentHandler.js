const { SKILL_NAME } = require('../utilities/constants/constants');
const axios = require('axios');
const cheerio = require('cheerio');

async function getNextEvent() {
  let event;
  let date;
  let answer;
  const response = {};

  await axios.get('https://bjc.psu.edu/events-list')
    .then(res => {
      let $ = cheerio.load(res.data);
      event = $('div.views-row-1').find('div.views-field-title').find('a').text();
      date = $('div.views-row-1').find('div.event-info').find('div.upcoming-events-date').text();
      date = date.replace(/\r?\n|\r/g, '');
    })
    .catch(() => {
      answer = 'Sorry, there was an issue with this skill request!';
    });

  if (!answer) {
    response.speechAnswer = `The next event at the BJC is ${event} on <say-as interpret-as="date">${date}</say-as>`;
    response.textAnswer = `The next event at the BJC is ${event} on ${date}`;
  } else {
    response.speechAnswer = answer;
    response.textAnswer = answer;
  }
  return response;
}

const BJCEventIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BJCEventIntent';
  },

  async handle(handlerInput) {
    let response = await getNextEvent();

    return handlerInput.responseBuilder
      .speak(response.speechAnswer)
      .withSimpleCard(SKILL_NAME, response.textAnswer)
      .getResponse();
  }
};

module.exports = {
  BJCEventIntentHandler
};
