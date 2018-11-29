const { DESCRIPTION_DATE, FALL_SCHEDULE, SPRING_SCHEDULE, MAYMESTER, SUMMER_SCHEDULE_FIRSTSECTION, SUMMER_SCHEDULE_SECONDSECTION, SKILL_NAME } = require('../utilities/constants/constants');

const SemesterIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'SEMESTER_YEAR';
  },

  handle(handlerInput) {
    const slotId = handlerInput.requestEnvelope.request.intent.slots.SEMESTER;
    const speechText = FALL_SCHEDULE;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  SemesterIntentHandler
};
