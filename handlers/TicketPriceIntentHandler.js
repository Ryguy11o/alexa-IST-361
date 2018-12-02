const {
  SKILL_NAME,
  SPORT_TYPE,
  SPORT_TYPE_FREE
} = require('../utilities/constants/constants');


const TicketPriceIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'TicketPriceIntent';
  },
  handle(handlerInput) {
    let speechText;

    let sport = handlerInput.requestEnvelope.request.intent.slots.SPORT_EVENT.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    let sportText = SPORT_TYPE[sport];

    if (sport === SPORT_TYPE_FREE) {
      speechText = `All games for ${sportText.name} are free to the public`;
    } else {
      `Ticket information for ${sportText.name} can be found online through TicketMaster`;
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
