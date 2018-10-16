const { DESCRIPTION_DATE, SKILL_NAME } = require('../utilities/constants/constants');

module.exports = {
    'GetNewFactIntentHandler': {
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
    }
};