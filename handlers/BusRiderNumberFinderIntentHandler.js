const axios = require('axios');
const { BUS_ID_TO_NAME, SKILL_NAME } = require('../utilities/constants/constants');

const BusRiderNumberFinderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BusRiderNumberFinderIntent';
  },

  async handle(handlerInput) {
    // sets slot values from AWS Alexa to stopId
    const slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id
    // const busInfo = BUS_ID_TO_NAME[slotId];
    // const routeData = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/Vehicles/Get/${busInfo.slotId}`).then(response => response.data);
    const routeData = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/RouteDetails/Get/1`).then(response => response.data);
    const numBuses = routeData.Vehicles.length;
    const numberOfRiders = routeData.Vehicles.map(vehicle => vehicle.OnBoard);
    console.log(numberOfRiders.toString());
    let speechText;
    if (numberOfRiders !== 0) {
      speechText = `There are currently ${numberOfRiders.toString()} listed for the ${busInfo.name}.`;
    } else {
      speechText = `There are currently no buses running or there is no one on the ${busInfo.name}.`;
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  BusRiderNumberFinderIntentHandler
};
