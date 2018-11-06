const Alexa = require('ask-sdk-core');
const { GetNewFactIntentHandler } = require('./handlers/GetNewFactIntentHandler');
const { BusFinderIntentHandler } = require('./handlers/BusFinderIntentHandler');
const { SemesterIntentHandler } = require('./handlers/SemesterIntentHandler');
const { BusInfoIntentHandler } = require('./handlers/BusInfoIntentHandler');
const { HelpIntentHandler } = require('./handlers/HelpIntentHandler');

const {
  LaunchRequestHandler,
  CancelAndStopIntentHandler,
  SessionEndedRequestHandler,
  ErrorHandler
} = require('./handlers/BaseHandlers');

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetNewFactIntentHandler,
    BusFinderIntentHandler,
    SemesterIntentHandler,
    BusInfoIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
