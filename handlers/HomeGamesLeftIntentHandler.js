const { SKILL_NAME } = require('../utilities/constants/constants');
const { getRemainingHomeSport } = require('../utilities/functions/sports');

const HomeGamesLeftIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'HomeGamesLeftIntent';
  },
  async handle(handlerInput) {
    const sport = handlerInput.requestEnvelope.request.intent.slots.SPORTING_EVENT.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    const speechText = await getRemainingHomeSport(sport);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  HomeGamesLeftIntentHandler
};
