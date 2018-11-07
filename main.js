const Alexa = require('ask-sdk-core');
const { GetNewFactIntentHandler } = require('./handlers/GetNewFactIntentHandler');
const { BusFinderIntentHandler } = require('./handlers/BusFinderIntentHandler');
const { BusStopDepartureFinderIntentHandler} = require('./handlers/BusStopDepartureFinderIntentHandler');
const { SemesterIntentHandler } = require('./handlers/SemesterIntentHandler');
const { BusInfoIntentHandler } = require('./handlers/BusInfoIntentHandler');
const { BusRiderNumberFinderIntentHandler } = require('./handlers/BusRiderNumberFinderIntentHandler');
const { BusFareIntentHandler } = require('./handlers/BusFareIntentHandler');

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
    BusStopDepartureFinderIntentHandler,
    BusRiderNumberFinderIntentHandler,
    BusFareIntentHandler,
    SemesterIntentHandler,
    BusInfoIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
