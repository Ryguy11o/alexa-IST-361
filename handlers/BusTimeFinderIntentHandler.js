const axios = require('axios');

const {
  BUS_ID_TO_NAME, STOP_ID_TO_NAME
} = require('..utilities/constants/constans.js');

const BusStopDepartureFinderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BusTimeFinderIntent';
  },

  async handle(handlerInput){
    // sets bus stop values from AWS Alexa to stopId
    const stopId = handlerInput.requestEnvelope.request.intent.slots.STOP_ID.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    // sets bus route slot values from AWS Alexa to slotId
    const slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const stopInfo = STOP_ID_TO_NAME[stopId];
    // sets bus information to the desired bus route requested
    const busInfo = BUS_ID_TO_NAME[slotId];
    // calls CATA API & passes the stop Id that was requested in the original request
    const nextDeparture = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/StopDepartures/Get/${stopInfo.stopId}`).then(response => response.data);

    const findBus = nextDeparture[0].RouteDirections.find(routeDirections => {
      if(routeDirections.RouteId === busInfo.routeId){
        
      };
    });
  }
