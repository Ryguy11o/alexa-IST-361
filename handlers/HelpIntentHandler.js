const {
  SKILL_NAME,
  HELP_MESSAGE,
  HELP_REPROMPT
} = require('../utilities/constants/constants');


const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = HELP_MESSAGE;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(HELP_REPROMPT)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};
module.exports = {
  HelpIntentHandler
};
