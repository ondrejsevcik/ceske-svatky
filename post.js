var Twit = require('twit');
var dotenv = require('dotenv');

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

twit.post('statuses/update', { status: 'hello world! from the app' }, function(err, data, response) {
  console.log(data)
})
