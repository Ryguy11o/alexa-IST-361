const axios = require('axios');
const { BUS_ID_TO_NAME, STOP_ID_TO_NAME, SKILL_NAME } = require('../utilities/constants/constants');


function formatTime(unixTime) {
  const date = new Date(unixTime);
  let minutes = parseInt(date.getMinutes(), 10);
  let hours = parseInt(date.getHours(), 10);
  let AM_PM = '';

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (hours > 12) {
    hours = hours - 12;
    AM_PM = 'p.m.';
  } else if (hours === 0) {
    hours = 12;
    AM_PM = 'a.m.';
  } else {
    AM_PM = 'a.m.';
  }

  return `${hours}:${minutes} ${AM_PM}`;
}

const NextBusFromTimeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'NextBusFromTime';
  },
  async handle(handlerInput) {
    const slotId = handlerInput.requestEnvelope.request.intent.slots.BUS_ROUTE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const stopId = handlerInput.requestEnvelope.request.intent.slots.STOP_ID.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    const stopInfo = STOP_ID_TO_NAME[stopId];
    const busInfo = BUS_ID_TO_NAME[slotId];
    const stopData = await axios.get(`https://realtime.catabus.com/InfoPoint/rest/StopDepartures/Get/${stopInfo.stopId}`).then(response => response.data);
    const RouteDirections = stopData[0].RouteDirections.filter(RouteDirection => {
      if (RouteDirection.RouteId === busInfo.routeId) {
        return RouteDirection;
      }
      return false;
    });

    const times = [];
    RouteDirections.forEach(RouteDirection => {
      if (RouteDirection) {
        RouteDirection.Departures.forEach(departure => {
          let unixTime = /\d\d\d\d\d\d\d\d\d\d\d\d\d/;
          const edt = parseInt(unixTime.exec(departure.EDT), 10);
          let time = formatTime(edt);
          times.push(time);
        });
      }
    });

    let speechText;
    if (times.length > 0) {
      speechText = `The ${busInfo.name} is scheduled to depart from ${stopInfo.name} at the following times: ${times.toString()}.`;
    } else {
      speechText = `There are currently no scheduled departures for the ${busInfo.name} at the ${stopInfo.name} stop. Some busses, like the white loop and blue loop, do not have schedules.`;
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  NextBusFromTimeIntentHandler
};
