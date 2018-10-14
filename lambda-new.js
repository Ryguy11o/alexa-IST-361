const Alexa = require('ask-sdk-core');

const APP_ID = 'amzn1.ask.skill.7f38e6e1-9c0c-464a-b950-c07c5e174084';
const WELCOME_MESSAGE = 'Welcome to P.S.U Helper, you can ask me different questions about Penn State!';
const SKILL_NAME = 'Happy Valley Helper';
const HELP_MESSAGE = 'You can ask me questions about Happy Valley, or you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const DESCRIPTION_DATE = {
        "classes_start": "Monday, August 20th",
        "classes_end": "Friday, December 7th",
        "student_reg_deadline": "Sunday, August 19th",
        "drop_deadline": "Saturday, August 25th",
        "add_deadline": " Sunday, August 26 at 11:59 p.m. Eastern Time",
        "finals_week_ends": "Friday, December 14",
        "withdrawl_deadline_ends":"Friday, December 7th",
        "finals_week_begins": "Monday, December 10th",
        "withdrawal_deadline_ends": "Friday, December 7th",
        "declare_minor_deadline": "Friday, November 9th",
        "late_drop_deadline": "Friday, November 9th",
        "final_exam_conflict": "Sunday, October 14th",
        "late_drop_begins":"Sunday, August 26th",
        "late_registration_begins": "Monday, August 27th",
        "final_exams": "Monday through Friday of December 10th through 14th",
        "thanksgiving_break": "Sunday through Saturday,	November 18th through 24th"
    };

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

const GetNewFactIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetNewFactIntent';
  },
  handle(handlerInput) {
    const slotId = handlerInput.requestEnvelope.request.intent.slots.description.resolutions.resolutionsPerAuthority[0].values[0].value.id
    const speechText = DESCRIPTION_DATE[slotId];

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

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

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

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
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    const speechText = 'Sorry, I can\'t understand the command. Please say again.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetNewFactIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();