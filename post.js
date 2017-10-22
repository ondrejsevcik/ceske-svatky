var Twit = require('twit');
var dotenv = require('dotenv');
var fs = require('fs');
var moment = require('moment-timezone');
var jmeniny = require('./cs-jmeniny.json');

// Setup environment variables
dotenv.config();

var twit = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  // optional HTTP request timeout to apply to all requests.
  timeout_ms: 60*1000,
});

var dayMonth = moment.tz('Europe/Prague').format('MM-DD')
var jmena = jmeniny[dayMonth];
if (jmena.length < 0) {
  console.warn('Dneska nema nikdo svatek');
}



var message = 'Dnes ma svátek ' + jmena.join(', ');
twit.post('statuses/update', { status: message }, function(err, data, response) {
  console.log(data)
})

