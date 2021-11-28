var Twit = require("twit");
var dotenv = require("dotenv");
var svatky = require("./svatky.js");
var makeAScreenshot = require("./make-a-screenshot.js").makeAScreenshot;

// Setup environment variables
dotenv.config();

var twit = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  // optional HTTP request timeout to apply to all requests.
  timeout_ms: 60 * 1000,
});

async function post() {
  var today = new Date();
  console.info("Today's date: ", today.toISOString());

  var msg = svatky.getNamedayFor(today);
  console.info("Today's greeting:", msg);
  if (msg.length <= 0) {
    console.warn("Dneska nema nikdo svatek, netwitujem.");
    return;
  }

  let posterBase64 = await makeAScreenshot(new Date());

  // first we must post the media to Twitter
  twit.post(
    "media/upload",
    { media_data: posterBase64 },
    function (err, data, response) {
      // now we can assign alt text to the media, for use by screen readers and
      // other text-based presentations and interpreters
      var mediaIdStr = data.media_id_string;
      var altText = msg;
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

      twit.post(
        "media/metadata/create",
        meta_params,
        function (err, data, response) {
          if (!err) {
            // now we can reference the media and post a tweet (media will attach to the tweet)
            var params = { status: msg, media_ids: [mediaIdStr] };

            twit.post(
              "statuses/update",
              params,
              function (err, data, response) {
                console.log(data);
              }
            );
          }
        }
      );
    }
  );
}

post();
