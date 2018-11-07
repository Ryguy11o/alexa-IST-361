const { BUS_ID_TO_NAME, SKILL_NAME } = require('../utilities/constants/constants');

const BusFareIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BusFareIntent';
  },
  async handle(handlerInput) {
    let slotId = null;
    let busInfo = null;
    if (!handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions) {

    } else {
      slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
      busInfo = BUS_ID_TO_NAME[slotId];
    }

    let speechText;
    if (slotId === null) {
      speechText = `All CATA busses except for the Blue, White, Red, and Green campus busses cost two dollars per ride`;
    } else if ((slotId === 'blue_loop') || (slotId === 'white_loop') || (slotId === 'red_link') || (slotId === 'green_link')) {
      speechText = `The Blue and White loops, along with the Red and Green links, do not require a bus fare`;
    } else {
      speechText = `The bus fare for the ${busInfo.name} route is two dollars`;
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  BusFareIntentHandler
};
