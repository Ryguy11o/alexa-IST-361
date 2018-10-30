const axios = require('axios');

const {
  STOP_ID_TO_NAME,
  BUS_ID_TO_NAME,
  SKILL_NAME
} = require('../utilities/constants/constants');

const BusStopDepartureFinderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BusStopDepartureFinderIntent';
  },

  async handle(handlerInput) {
    // sets slot values from AWS Alexa to stopId
    const stopId = handlerInput.requestEnvelope.request.intent.slots.STOP_ID.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id
    const stopInfo = STOP_ID_TO_NAME[stopId];
    const busInfo = BUS_ID_TO_NAME[slotId];
    const nextDeparture = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/StopDepartures/Get/${stopInfo.stopId}`).then(response => response.data);
    const foundBusInfoJson = nextDeparture[0].RouteDirections.find(busInfoJson => {
      return busInfoJson.RouteId === busInfo.routeId;
    });

    const numberOfDepartures = foundBusInfoJson.Departures.length;

    console.log(foundBusInfoJson);

    console.log(numberOfDepartures);
    let speechText;
    if (numberOfDepartures !== 0) {
      speechText = `There are currently ${numberOfDepartures} listed for the ${busInfo.name} at ${stopInfo.name}.`;
    } else {
      speechText = `There are currently no departures listed for the ${busInfo.name} at ${stopInfo.name}.`;
    }
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  BusStopDepartureFinderIntentHandler
};
