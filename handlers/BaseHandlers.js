const {
  WELCOME_MESSAGE,
  SKILL_NAME,
  STOP_MESSAGE
} = require('../utilities/constants/constants');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = WELCOME_MESSAGE;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = STOP_MESSAGE;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    // any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    // eslint-disable-next-line no-console
    console.log(`Error handled: ${error.message}`);
    const speechText = 'Sorry, I can\'t understand the command. Please say again.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

module.exports = {
  LaunchRequestHandler,
  CancelAndStopIntentHandler,
  SessionEndedRequestHandler,
  ErrorHandler
};
