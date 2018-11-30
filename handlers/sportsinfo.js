const { SKILL_NAME } = require('../utilities/constants/constants');
const moment = require('moment-timezone');
let Parser = require('rss-parser');

let parser = new Parser({
  customFields: {
    item: [
      ['ev:location', 'location'],
      ['ev:startdate', 'startdate'],
      ['ev:enddate', 'enddate'],
      ['s:localstartdate', 'localstartdate'],
      ['s:localenddate', 'localenddate'],
      ['s:teamlogo', 'teamlogo'],
      ['s:opponentlogo', 'oponentlogo'],
      ['s:opponent', 'opponent'],
      ['s:gameid', 'gameid'],
      ['s:gamepromoname', 'gamepromoname'],
      ['s:links', 'links']
    ]
  }
});

async function getFullList() {
  let feed = await parser.parseURL('https://gopsusports.com/calendar.ashx/calendar.rss?sport_id=0');
  console.log(feed.title);
  let fullList = feed.items.map(entry =>{
    return {
      event: {
        'title': entry.title,
        'location': entry.location,
        'startdate': entry.startdate,
        'enddate': entry.enddate,
        'opponent': entry.opponent
      }
    };
  });
  return fullList;
}

async function getUpcomingSport(sport) {
  let fullList = await getFullList();
  // eslint-disable-next-line consistent-return
  let foundItem = fullList.find(item => {
    if (item.event) {
      let title = item.event.title.replace(/\W/g, '');
      let fixedSport = sport.replace(/\W/g, '');
      if (title.includes(fixedSport) && item.event.startdate > moment().format()) {
        return item;
      }
    }
  });

  let response = '';
  if (foundItem) {
    if (foundItem.event.title.includes('vs')) {
      response = `${foundItem.event.title} at ${foundItem.event.location}`;
    } else {
      response = `${foundItem.event.title}`;
    }
  } else {
    response = `No events were found for ${sport} at this time`;
  }
  return response;
}

const UpcomingGameIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'UpcomingGameIntent';
  },
  async handle(handlerInput) {
    const sport = handlerInput.requestEnvelope.request.intent.slots.SPORTING_EVENT.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    const speechText = await getUpcomingSport(sport);
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  UpcomingGameIntentHandler
};
