var Twit = require('twit');
var dotenv = require('dotenv');
var fs = require('fs');

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


// post a tweet with media
var b64content = fs.readFileSync('./julie.png', { encoding: 'base64' })

// first we must post the media to Twitter
twit.post('media/upload', { media_data: b64content }, function (err, data, response) {
  // now we can assign alt text to the media, for use by screen readers and
  // other text-based presentations and interpreters
  var mediaIdStr = data.media_id_string
  var altText = "Dnes ma svatek Julie";
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

  twit.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      // now we can reference the media and post a tweet (media will attach to the tweet)
      var params = { status: 'Dnes ma svatek Test!', media_ids: [mediaIdStr] }

      twit.post('statuses/update', params, function (err, data, response) {
        console.log(data)
      })
    } 
  })
})
