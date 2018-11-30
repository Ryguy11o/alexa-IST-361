const { SKILL_NAME } = require('../utilities/constants/constants');
const rp = require('request-promise');
const cheerio = require('cheerio');

async function getNextEvent() {
  let event;

  const options = {
    uri: 'https://bjc.psu.edu/events-list',
    transform: function (body) {
      return cheerio.load(body);
    }
  };

  rp(options)
    .then(function ($) {
      event = $('div.views-row-1').find('div.views-field-title').find('a').text();
    })
    .catch(function (err) {
      console.log(err);
    });

  await rp(options);

  return event;
}

const BJCEventIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BJCEventIntent';
  },

  async handle(handlerInput) {
    let slotId = null;

    let speechText;
    let eventTitle = await getNextEvent();

    if (slotId === null) {
      speechText = `The next event at the BJC is ${eventTitle}`;
    } else {
      speechText = 'Something isn\'t working right';
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  BJCEventIntentHandler
};
