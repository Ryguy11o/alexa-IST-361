const axios = require('axios');

const {
  STOP_ID_TO_NAME,
  BUS_ID_TO_NAME,
  SKILL_NAME
} = require('../utilities/constants/constants');

const DiningHallMenuIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'DiningHallMenuIntent';
  },

  async handle(handlerInput){

  }
};
