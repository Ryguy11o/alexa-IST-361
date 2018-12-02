const Alexa = require('ask-sdk-core');
const { GetNewFactIntentHandler } = require('./handlers/GetNewFactIntentHandler');
const { BusFinderIntentHandler } = require('./handlers/BusFinderIntentHandler');
const { BusStopDepartureFinderIntentHandler} = require('./handlers/BusStopDepartureFinderIntentHandler');
const { SemesterIntentHandler } = require('./handlers/SemesterIntentHandler');
const { BusInfoIntentHandler } = require('./handlers/BusInfoIntentHandler');
const { HelpIntentHandler } = require('./handlers/HelpIntentHandler');
const { BusRiderNumberFinderIntentHandler } = require('./handlers/BusRiderNumberFinderIntentHandler');
const { BusFareIntentHandler } = require('./handlers/BusFareIntentHandler');
const { BusScheduleIntentHandler } =  require('./handlers/BusScheduleIntentHandler');
const { BJCEventIntentHandler } = require('./handlers/BJCEventIntentHandler');
const { UpcomingGameIntentHandler } = require('./handlers/sportsinfo');
const { NextHomeGameIntentHandler } = require('./handlers/NextHomeGameIntentHandler');
const { TicketPriceIntentHandler } = require('./handlers/TicketPriceIntentHandler');

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
    BJCEventIntentHandler,
    BusFinderIntentHandler,
    BusStopDepartureFinderIntentHandler,
    BusRiderNumberFinderIntentHandler,
    BusFareIntentHandler,
    BusScheduleIntentHandler,
    SemesterIntentHandler,
    BusInfoIntentHandler,
    UpcomingGameIntentHandler,
    NextHomeGameIntentHandler,
    TicketPriceIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
