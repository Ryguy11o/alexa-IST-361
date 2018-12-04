const { SKILL_NAME } = require('../utilities/constants/constants');
const { getRemainingSport } = require('../utilities/functions/sports');

const GamesLeftIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'GamesLeftIntent';
  },
  async handle(handlerInput) {
    const sport = handlerInput.requestEnvelope.request.intent.slots.SPORTING_EVENT.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    const speechText = await getRemainingSport(sport);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  GamesLeftIntentHandler
};
