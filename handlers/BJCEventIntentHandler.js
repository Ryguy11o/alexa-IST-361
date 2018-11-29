const { SKILL_NAME } = require('../utilities/constants/constants');
const puppeteer = require('puppeteer');

const BJCEventIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'BJCEventIntent';
  },

  async handle(handlerInput) {
    console.log('Handler Test');
    let slotId = null;
    if (handlerInput.requestEnvelope.request.intent.slots.EVENT_TYPE.resolutions) {
      slotId = handlerInput.requestEnvelope.request.intent.slots.EVENT_TYPE.resolutions.resolutionsPerAuthority[0].values[0].value.id;
      eventType = EVENT_TYPE_TO_NAME[slotId];
    }

// element = document.querySelector("body > div.page > div.main > div.content > div > div.view-content > div.views-row.views-row-1.views-row-odd.views-row-first > div.views-field-title > span > a");

    let speechText;
    let eventTitle

    let scrape = async () => {
      console.log('Scrape called');
      const browser = await (puppeteer.launch({
        headless: false
      }));
      console.log('Puppeteer Launched');
      const page = await browser.newPage();

      await page.goto('https:///bjc.psu.edu/events-list');
      await page.waitFor(1000);
      console.log('Page open test');

      const result = await page.evaluate(() => {
        let title = document.querySelector("body > div.page > div.main > div.content > div > div.view-content > div.views-row.views-row-1.views-row-odd.views-row-first > div.views-field-title > span > a").innerText;

        return title;
      });

      browser.close();
      return result;
    }

    scrape().then((value) => {
      console.log(value);
      eventTitle = value;
    });

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
