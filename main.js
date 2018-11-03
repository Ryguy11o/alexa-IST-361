const Alexa = require('ask-sdk-core');
const { GetNewFactIntentHandler } = require('./handlers/GetNewFactIntentHandler');
const { BusFinderIntentHandler } = require('./handlers/BusFinderIntentHandler');
const { BusStopDepartureFinderIntentHandler} = require('./handlers/BusStopDepartureFinderIntentHandler');
const { SemesterIntentHandler } = require('./handlers/SemesterIntentHandler');
const { BusInfoIntentHandler } = require('./handlers/BusInfoIntentHandler');
const { BusRiderNumberFinderIntentHandler } = require('./handlers/BusRiderNumberFinderIntentHandler');


const {
  LaunchRequestHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  SessionEndedRequestHandler,
  ErrorHandler
} = require('./handlers/BaseHandlers');

const {
  DESCRIPTION_DATE,
  BUS_ID_TO_NAME,
  APP_ID, WELCOME_MESSAGE,
  SKILL_NAME,
  HELP_MESSAGE,
  HELP_REPROMPT,
  STOP_MESSAGE
} = require('./utilities/constants/constants.js');

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetNewFactIntentHandler,
    BusFinderIntentHandler,
    BusStopDepartureFinderIntentHandler,
    BusRiderNumberFinderIntentHandler,
    SemesterIntentHandler,
    BusInfoIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
