const {
  SKILL_NAME
} = require('../utilities/constants/constants');

const SPORT_TYPE_FREE = [
  'cross_country',
  'field_hockey',
  'soccer_men',
  'soccer_women',
  'soccer',
  'fencing',
  'swimming_women',
  'swimming_men',
  'swimming',
  'volleyball_men'
];

const TicketPriceIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'TicketPriceIntent';
  },
  handle(handlerInput) {
    let speechText;

    // let sport = handlerInput.requestEnvelope.request.intent.slots.SPORT_EVENT.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    let eventType = handlerInput.requestEnvelope.request.intent.slots.SPORT_EVENT.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    let eventName = handlerInput.requestEnvelope.request.intent.slots.SPORT_EVENT.resolutions.resolutionsPerAuthority[0].values[0].value.name;

    let freeArray = SPORT_TYPE_FREE.includes(eventType);

    if (freeArray) {
      speechText = `All games for ${eventName} are free to the public`;
    } else {
      speechText = `Ticket information for ${eventName} can be found online through TicketMaster`;
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};
module.exports = {
  TicketPriceIntentHandler
};
