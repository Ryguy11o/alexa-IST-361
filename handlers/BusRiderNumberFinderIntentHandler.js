const axios = require('axios');
const { BUS_ID_TO_NAME, SKILL_NAME } = require('../utilities/constants/constants');

const BusRiderNumberFinderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BusRiderNumberFinderIntent';
  },

  async handle(handlerInput) {
    // sets slot values from AWS Alexa to stopId
    const slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const busInfo = BUS_ID_TO_NAME[slotId];
    const routeData = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/RouteDetails/Get/${busInfo.routeId}`).then(response => response.data);
    const numBuses = routeData.Vehicles.length;
    const numberOfRiders = routeData.Vehicles.map(vehicle => vehicle.OnBoard);
    const plural = ((numberOfRiders === 1) ? 'passenger' : 'passengers'); // ternary for choosing singular or plural
    const isOrAre = ((numberOfRiders === 1) ? 'is' : 'are'); // ternary for choosing is or are
    const lowestPassengerAmount = Math.min.apply(Math, numberOfRiders); // finds lowest passenger number
    const highestPassengerAmount = Math.max.apply(Math, numberOfRiders); // finds highest passenger number & retaining for future use
    let speechText;
    if (numBuses === 0) {
      speechText = 'There are no buses running for that bus route.';
    } else if (numBuses === 1) {
      speechText = `There is ${numBuses.toString()} ${busInfo.name} currently running and there ${isOrAre} ${numberOfRiders[0].toString()} ${plural} listed for the ${busInfo.name}.`; // thinking of adding the amount for all blue loops, dictation would be weird though
    } else if (numBuses > 1) {
      speechText = `There ${isOrAre} ${numBuses.toString()} ${busInfo.name}\'s currently running and the highest passenger amount is ${highestPassengerAmount} ${plural} listed for the ${busInfo.name}.`;
    } else if (numberOfRiders === 0) {
      speechText = `There are currently no passengers on the ${busInfo.name}.`;
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
