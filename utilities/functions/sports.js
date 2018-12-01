const Parser = require('rss-parser');
const moment = require('moment-timezone');
const parser = new Parser({
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
  let fullList = feed.items.map(entry => {
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

async function getResponse(foundItem, sport) {
  const response = {};
  if (foundItem) {
    let title = foundItem.event.title;
    let date = title.match(/^(((0)[0-9])|((1)[0-2])|[0-9])(\/)([0-2][0-9]|(3)[0-1]|[1-9])/);
    let answer;
    if (date !== null) {
      title = title.replace(date[0], '');
      answer = `<say-as interpret-as="date" format="md">${date[0]}</say-as> ${title}`;
    } else {
      answer = title;
    }

    if (foundItem.event.title.includes('vs')) {
      response.speechText = `${answer} at ${foundItem.event.location}`;
      response.cardText = `${foundItem.event.title} at ${foundItem.event.location}`;
    } else {
      response.speechText = answer;
      response.cardText = foundItem.event.title;
    }
  } else {
    response.speechText = `No events were found for ${sport} at this time`;
    response.cardText = `No events were found for ${sport} at this time`;
  }
  return response;
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
  return getResponse(foundItem, sport);
}

async function getUpcomingHomeSport(sport) {
  let fullList = await getFullList();
  // eslint-disable-next-line consistent-return
  let foundItem = fullList.find(item => {
    if (item.event) {
      let title = item.event.title.replace(/\W/g, '');
      let fixedSport = sport.replace(/\W/g, '');
      if (title.includes(fixedSport) && item.event.startdate > moment().format()
      && (item.event.location.includes('University Park') || item.event.location.includes('Rec Hall'))) {
        return item;
      }
    }
  });
  return getResponse(foundItem, sport);
}

module.exports = {
  parser,
  getFullList,
  getUpcomingSport,
  getUpcomingHomeSport
};
