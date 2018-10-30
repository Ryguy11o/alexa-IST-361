const axios = require('axios');
const { BUS_ID_TO_NAME, STOP_ID_TO_NAME, SKILL_NAME } = require('../utilities/constants/constants');

const NextBusFromTimeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'NextBusFromTime';
  },
  async handle(handlerInput) {
    const slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const stopId = handlerInput.requestEnvelope.request.intent.slots.STOP_ID.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const stopInfo = STOP_ID_TO_NAME[stopId];
    const busInfo = BUS_ID_TO_NAME[slotId];
    const stopData = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/StopDepartures/Get/${stopInfo.stopId}`).then(response => response.data);
    console.log(busInfo.routeId);
    stopData[0].RouteDirections.forEach(RouteDirection => {
      if (RouteDirection.RouteId === busInfo.routeId) {
        console.log(RouteDirection);
      }
    });

    const speechText = 'Hello';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  NextBusFromTimeIntentHandler
};
