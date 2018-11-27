const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
  uri: "https://bjc.psu.edu/events-list",
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    console.log($);
  })
  .catch((err) => {
    console.log(err);
  })

const BJCEventIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BJCEventIntent';
  },
  async handle(handlerInput) {
    let slotId = null;
    if (handlerInput.requestEnvelope.request.intent.slots.EVENT_TYPE.resolutions) {
      slotId = handlerInput.requestEnvelope.request.intent.slots.EVENT_TYPE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
      busInfo = EVENT_TYPE_TO_NAME[slotId];
    }

    let speechText;

    if (slotId === null) {
      let eventName;
      eventName = $('#views-row views-row-1 views-row-odd views-row-first').find('a').text();
      speechText = `The next event at the BJC is ${eventName}`;
    } else {
      speechText = `not working`;
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
