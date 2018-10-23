const axios = require('axios');

console.log('hey');

const {
  STOP_ID_TO_NAME,
  BUS_ID_TO_NAME,
} = require('../utilities/constants/constants');

console.log('hi');

const BusStopTimeFinderIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BusStopTimeFinderIntent';
    },

console.log('yo');

    async handle(handlerInput) {

      console.log('hello');
      //sets slot values from AWS Alexa to stopId
      const stopId = handlerInput.requestEnvelope.request.intent.slots.STOP_ID.resolutions.resolutionsPerAuthority[0].values[0].value.id
      // const slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id
      const stopInfo = STOP_ID_TO_NAME[stopId];
      // const busInfo = BUS_ID_TO_NAME[slotId];
      const nextDeparture = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/StopDepartures/Get/${stopId}`).then(response => response.data);
      const numberOfDepartures = nextDeparture[0].RouteDirections[0].Departures.length;
      const nextDeparture = nextDeparture[0].RouteDirections[0].map(departure => {
          return departure.NextStop;
      });
      //what alexa will say when a successful request is made
      // console.log(numberOfDepartures);
      let speechText;
      if (numberOfDepartures !== 0){
          speechText = `There are currently ${numberOfDepartures} for the ${stopInfo.name}. The next depature is ${nextDeparture.toString()}`;
      } else {
          speechText = `There are currently no departures listed for the bus stop at ${stopInfo.name}.`;
      }
      return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard(SKILL_NAME, speechText)
          .getResponse();
    }
}

module.exports = {
    BusStopTimeFinderIntentHandler
}
