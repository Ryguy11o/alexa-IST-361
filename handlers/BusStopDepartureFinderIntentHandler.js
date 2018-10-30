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
    // sets bus stop values from AWS Alexa to stopId
    const stopId = handlerInput.requestEnvelope.request.intent.slots.STOP_ID.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    // sets bus route slot values from AWS Alexa to slotId
    const slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id
    // sets stop information to the desired stop requested
    const stopInfo = STOP_ID_TO_NAME[stopId];
    // sets bus information to the desired bus route requested
    const busInfo = BUS_ID_TO_NAME[slotId];
    //calls CATA API & passes the stop Id that was requested in the original request
    const nextDeparture = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/StopDepartures/Get/${stopInfo.stopId}`).then(response => response.data);
    //finds the desired bus route Id after finishing 'nextDeparture'
    const foundRouteDirections = nextDeparture[0].RouteDirections.find(routeDirections => {
      return routeDirections.RouteId === busInfo.routeId;
    });

    const numberOfDepartures = foundRouteDirections.Departures.length;
    let speechText;
    if (numberOfDepartures !== 0) {
      speechText = `There are currently ${numberOfDepartures} listed for the ${busInfo.name} at the ${stopInfo.name} bus stop.`;
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
