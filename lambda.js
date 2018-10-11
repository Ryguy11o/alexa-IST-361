/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.7f38e6e1-9c0c-464a-b950-c07c5e174084';
const WELCOME_MESSAGE = 'Welcome to P.S.U Helper, you can ask me different questions about Penn State!';
const SKILL_NAME = 'Happy Valley Helper';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const DESCRIPTION_DATE = {
        "classes_start": "Monday, August 20th",
        "classes_end": "Friday, December 7th",
        "student_reg_deadline": "Sunday, August 19th",
        "drop_deadline": "Saturday, August 25th",
        "add_deadline": " Sunday, August 26 at 11:59 p.m. Eastern Time",
        "finals_week_ends": "Friday, December 14",
        "withdrawl_deadline_ends":"Friday, December 7th",
        "finals_week_begins": "Monday, December 10th",
        "withdrawal_deadline_ends": "Friday, December 7th",
        "declare_minor_deadline": "Friday, November 9th",
        "late_drop_deadline": "Friday, November 9th",
        "final_exam_conflict": "Sunday, October 14th",
        "late_drop_begins":"Sunday, August 26th",
        "late_registration_begins": "Monday, August 27th",
        "final_exams": "Monday through Friday of December 10th through 14th",
        "thanksgiving_break": "Sunday through Saturday,	November 18th through 24th"
    };
//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = WELCOME_MESSAGE;
        
        this.response.cardRenderer(SKILL_NAME, speechOutput);
        this.response.speak(speechOutput).listen();
        this.response.shouldEndSession = false;
        this.emit(':responseReady');
    },
    'GetNewFactIntent': function () {
        let id = this.event.request.intent.slots.description.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        let answer = DESCRIPTION_DATE[id];
        const speechOutput = answer;
        
        this.response.cardRenderer(SKILL_NAME, answer);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
