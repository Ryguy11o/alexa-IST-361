const { SEMESTER_YEAR, SKILL_NAME } = require('../utilities/constants/constants');

const SemesterIntentHandler ={
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
          && handlerInput.requestEnvelope.request.intent.name === 'SEMESTER_YEAR';
  },

  handle(handlerInput) {
const speechText = SEMESTER_YEAR;

return handlerInput.responseBuilder
.speak(speechText)
.withSimpleCard(SKILL_NAME, speechText)
.getResponse();

}
};
module.exports = {
  SemesterIntentHandler
};
