const Alexa = require('ask-sdk-core');
const { GetNewFactIntentHandler } = require('./handlers/GetNewFactIntentHandler');
const { BusFinderIntentHandler } = require('./handlers/BusFinderIntentHandler');
const { BusStopDepartureFinderIntentHandler} = require('./handlers/BusStopDepartureFinderIntentHandler');
const { SemesterIntentHandler } = require('./handlers/SemesterIntentHandler');
const { NextBusFromTimeIntentHandler } = require('./handlers/NextBusFromTimeIntentHandler');
const { BusInfoIntentHandler } = require('./handlers/BusInfoIntentHandler');
const { BusRiderNumberFinderIntentHandler } = require('./handlers/BusRiderNumberFinderIntentHandler');


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
    SemesterIntentHandler,
    NextBusFromTimeIntentHandler,
    BusInfoIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
