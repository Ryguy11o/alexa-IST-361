const Alexa = require('ask-sdk-core');
const { GetNewFactIntentHandler } = require('./handlers/GetNewFactIntentHandler');
const { BusFinderIntentHandler } = require('./handlers/BusFinderIntentHandler');
const { BusStopDepartureFinderIntentHandler} = require('./handlers/BusStopDepartureFinderIntentHandler');
const { SemesterIntentHandler } = require('./handlers/SemesterIntentHandler');
const { BusInfoIntentHandler } = require('./handlers/BusInfoIntentHandler');
const { HelpIntentHandler } = require('./handlers/HelpIntentHandler');
const { BusRiderNumberFinderIntentHandler } = require('./handlers/BusRiderNumberFinderIntentHandler');
const { BusScheduleIntentHandler } =  require('./handlers/BusScheduleIntentHandler');
const { BusTimeFinderIntentHandler } = require('./handlers/BusTimeFinderIntentHandler');

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
    BusStopDepartureFinderIntentHandler,
    BusRiderNumberFinderIntentHandler,
    BusScheduleIntentHandler,
    BusTimeFinderIntentHandler,
    SemesterIntentHandler,
    BusInfoIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
