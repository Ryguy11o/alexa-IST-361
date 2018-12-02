const { DESCRIPTION_DATE, FALL_SCHEDULE, SPRING_SCHEDULE, MAYMESTER, SUMMER_SCHEDULE_FIRSTSECTION, SUMMER_SCHEDULE_SECONDSECTION, SKILL_NAME } = require('../utilities/constants/constants');

const SemesterIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'SemesterIntent';
  },

  async handle(handlerInput) {
    const semesterId = handlerInput.requestEnvelope.request.intent.slots.SEMESTER.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const academicDescriptions = handlerInput.requestEnvelope.request.intent.slots.ACADEMIC_DESCRIPTION.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const wordsSaidToAlexa = handlerInput.requestEnvelope.request.intent.slots.ACADEMIC_DESCRIPTION.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    const fallYear = 2018;
    const springYear = 2019;

    let map;
    if (semesterId === `fall_${fallYear}`) {
      map = FALL_SCHEDULE;
    } else if (semesterId === `spring_${springYear}`) {
      map = SPRING_SCHEDULE;
    } else if (semesterId === `maymester_${springYear}`) {
      map = MAYMESTER;
    } else if (semesterId === `summer1_${springYear}`) {
      map = SUMMER_SCHEDULE_FIRSTSECTION;
    } else if (semesterId === `summer2_${springYear}`) {
      map = SUMMER_SCHEDULE_SECONDSECTION;
    }
    
    let speechText;
    speechText = map[academicDescriptions];

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  SemesterIntentHandler
};
