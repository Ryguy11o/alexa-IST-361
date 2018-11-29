const axios = require('axios');

const {
  SKILL_NAME,
  LOCATION_ID_TO_NAME,
  MEAL_TYPE
} = require('../utilities/constants/constants');

const DiningHallMenuIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'DiningHallMenuIntent';
  },

  async handle(handlerInput) {
      const menuUrl = `http://menu.hfs.psu.edu/shortmenu.aspx?sName=Penn+State+Housing+and+Food+Services&locationNum=`;
      const mealType = handlerInput.requestEnvelope.request.intent.slots.MEAL_TO_TYPE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
      const diningHall = handlerInput.requestEnvelope.request.intent.slots.LOCATION_NUM.resolutions.resolutionsPerAuthority[0].values[0].value.id;
      const mealTypeSlot = MEAL_TYPE[mealType];
      const diningHallSlot = LOCATION_ID_TO_NAME[diningHall];
      console.log(menuUrl);
      const getMenu = await axios.get(`${menuUrl}${diningHallSlot.locationNum}&locationName=${diningHallSlot.string}&naFlag=1`).then(response => response.data);
      console.log('success');
      const listOfFoodItems = document.querySelectorAll("#menuDisplay > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > div");

  let speechText;

  speechText = `No food available.`;
  return handlerInput.responseBuilder
    .speak(speechText)
    .withSimpleCard(SKILL_NAME, speechText)
    .getResponse();
  }
};

module.exports = {
  DiningHallMenuIntentHandler
};
