/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
// Variables
//=========================================================================================================================================

const APP_ID = 'amzn1.ask.skill.37be725f-9cab-4d97-84dd-95bbc6b889bc';

const SKILL_NAME = 'Clarity';
const GET_FACT_MESSAGE = "Here's your clarity status: ";
const HELP_MESSAGE = 'You can say clarity status, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
// Answer variations
//=========================================================================================================================================
const data = [
    'Your have 8 urgent alerts and 10 information on you portfolios',
    'No alerts. Clarity is doing pretty good!',
];

//=========================================================================================================================================
// Handler
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetPortfolioStatusIntent');
    },
    'GetPortfolioStatusIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
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