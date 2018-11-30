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

    let map;
    if(semesterId === 'fall_2018'){
      map = FALL_SCHEDULE;
    } else if (semesterId === 'spring_2019') {
      map = SPRING_SCHEDULE;
    } else if (semesterId === 'maymester_2019'){
      map = MAYMESTER;
    } else if (semesterId === 'summer1_2019'){
      map = SUMMER_SCHEDULE_FIRSTSECTION;
    } else if (semesterId === 'summer2_2019'){
      map = SUMMER_SCHEDULE_SECONDSECTION;
    }
    
    let speechText;
    speechText = `The ${wordsSaidToAlexa} is ${map[academicDescriptions]}`;
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  SemesterIntentHandler
};
