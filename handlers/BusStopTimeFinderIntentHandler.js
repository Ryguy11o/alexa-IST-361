const axios = require('axios');

const {
  STOP_ID_TO_NAME,
  BUS_ID_TO_NAME,
} = require('../utilities/constants/constants');

const BusStopTimeFinderIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'BusStopTimeFinderIntent'
    },

    async handle(handlerInput) {
      const stopId = handlerInput.requestEnvelope.request.intent.slots.STOP_ID.resolutions.resolutionsPerAuthority[0].values[0].value.id
      const busInfo = STOP_ID_TO_NAME[slotId];
      const stopData = await axios.get('https://realtime.catabus.com/InfoPoint/rest/StopDepartures/Get/${busInfo.stopId}')
    }
}
