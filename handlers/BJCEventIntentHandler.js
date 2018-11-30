const { SKILL_NAME } = require('../utilities/constants/constants');
const rp = require('request-promise');
const cheerio = require('cheerio');

const BJCEventIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BJCEventIntent';
  },

  async handle(handlerInput) {
    let slotId = null;
    // if (handlerInput.requestEnvelope.request.intent.slots.EVENT_TYPE.resolutions) {
    //   slotId = handlerInput.requestEnvelope.request.intent.slots.EVENT_TYPE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    //   eventType = EVENT_TYPE_TO_NAME[slotId];
    // }

    let speechText;
    let event;
    // let eventTitle = await request-promise;
    const options = {
      uri: `https://bjc.psu.edu/events-list`,
      transform: function (body) {
        return cheerio.load(body);
      }
    };


    rp(options)
      .then(function ($) {

        event = $('div.views-row-1').find('div.views-field-title').find('a').text();

        return event;
        console.log(title);
      })
      .catch(function (err) {

      });

    await rp(options);


    if (slotId === null) {
      speechText = `The next event at the BJC is ${event}`;
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
