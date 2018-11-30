const { SKILL_NAME } = require('../utilities/constants/constants');
const puppeteer = require('puppeteer');

const BJCEventIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BJCEventIntent';
  },

  async handle(handlerInput) {
    let slotId = null;
    // if (handlerInput.requestEnvelope.request.intent.slots.EVENT_TYPE.resolutions) {
    //   slotId = handlerInput.requestEnvelope.request.intent.slots.EVENT_TYPE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
    //   eventType = EVENT_TYPE_TO_NAME[slotId];
    // }

    let speechText;
    let eventTitle;

    const URL = 'https://bjc.psu.edu/events-list';

    // Launch Browser
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    await page.goto(URL, {waitUntil: 'networkidle0'});
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'})

    const result = await page.evaluate(() => {
        try {
            var data = [];
            let title = $('div.views-row-1').find('div.views-field-title').find('a').text();
            data.push({
              'eventTitle' : title,
            });

            return data; // Return our data array
        } catch(err) {
            reject(err.toString());
        }
    });

    // Close Browser
    await browser.close();

    eventTitle = result[0].eventTitle;


    if (slotId === null) {
      speechText = `The next event at the BJC is ${eventTitle}`;
      console.log('Speech If-Clause executes');
    } else {
      speechText = `Something isn't working right`;
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

module.exports = {
  BJCEventIntentHandler
};
