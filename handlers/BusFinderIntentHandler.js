const axios = require('axios');
const { BUS_ID_TO_NAME, SKILL_NAME } = require('../utilities/constants/constants');

const BusFinderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BusFinderIntent';
  },
  async handle(handlerInput) {
    const slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const busInfo = BUS_ID_TO_NAME[slotId];
    const routeData = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/RouteDetails/Get/${busInfo.routeId}`).then(response => response.data);
    const numBuses = routeData.Vehicles.length;
    const runningBuses = routeData.Vehicles.map(vehicle => vehicle.LastStop);

    let busText = '';
    for (let i = 0; i < runningBuses.length; i++) {
      busText = `${busText} , bus ${i + 1} was last seen at ${runningBuses[i]}`;
    }

    let speechText;
    if (numBuses !== 0 && numBuses !== 1) {
      speechText = `There are ${numBuses} buses running for the ${busInfo.name} route ${busText}`;
    } else if (numBuses === 1) {
      speechText = `There is ${numBuses} bus running for the ${busInfo.name} route. It was last seen at ${runningBuses.toString()}.`;
    } else {
      speechText = `There are currently no busses running for the ${busInfo.name} route.`;
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  BusFinderIntentHandler
};
