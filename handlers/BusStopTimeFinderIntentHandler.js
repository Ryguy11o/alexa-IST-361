const axios = require('axios');

const {
  STOP_ID_TO_NAME,
} = require('../utilities/constants/constants');

const BusStopTimeFinderIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BusStopTimeFinderIntent'
    },

    async handle(handlerInput) {
      const stopId = 
    }
}
