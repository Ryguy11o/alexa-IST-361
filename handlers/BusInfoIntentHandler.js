const axios = require('axios');
const { BUS_ID_TO_NAME, SKILL_NAME } = require('../utilities/constants/constants');

const BusInfoIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BusInfoIntent';
  },
  async handle(handlerInput) {
    const slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const busInfo = BUS_ID_TO_NAME[slotId];
    const routeData = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/RouteDetails/Get/${busInfo.routeId}`).then(response => response.data);
    const numBuses = routeData.Vehicles.length;

    let speechText;
    if (numBuses !== 0 && numBuses !== 1) {
      speechText = `The ${busInfo.name} route is currently running with ${numBuses} busses on the route.`;
    } else if (numBuses === 1) {
      speechText = `The ${busInfo.name} route is currently running with ${numBuses} bus on the route.`;
    } else {
      speechText = `The ${busInfo.name} route is not currently running.`;
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  BusInfoIntentHandler
};
