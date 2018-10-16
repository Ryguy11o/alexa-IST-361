const Alexa = require('ask-sdk-core');
const { GetNewFactIntentHandler } = require('./handlers/GetNewFactIntentHandler');
const { BusFinderIntentHandler } = require('./handlers/BusFinderIntentHandler');

const {
  LaunchRequestHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  SessionEndedRequestHandler,
  ErrorHandler
} = require('./handlers/BaseHandlers');

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetNewFactIntentHandler,
    BusFinderIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
