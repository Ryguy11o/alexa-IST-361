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
    const runningBuses = routeData.Vehicles.map(vehicle => {
      return vehicle.LastStop;
    });

    let speechText;
    if (numBuses !== 0) {
      speechText = `There are ${numBuses} buses running for the ${busInfo.name} route. The last stop for each bus is as follow: ${runningBuses.toString()}`;
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
