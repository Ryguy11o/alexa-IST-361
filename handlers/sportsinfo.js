const { SKILL_NAME } = require('../utilities/constants/constants');
const { getUpcomingSport } = require('../utilities/functions/sports');

const UpcomingGameIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'UpcomingGameIntent';
  },
  async handle(handlerInput) {
    const sport = handlerInput.requestEnvelope.request.intent.slots.SPORTING_EVENT.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    const response = await getUpcomingSport(sport);
    return handlerInput.responseBuilder
      .speak(response.speechText)
      .withSimpleCard(SKILL_NAME, response.cardText)
      .getResponse();
  }
};

module.exports = {
  UpcomingGameIntentHandler
};
