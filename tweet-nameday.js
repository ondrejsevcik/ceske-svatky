const Twit = require("twit");
const nameDay = require("./name-day.js");

(async () => {
  let today = new Date();
  let tweetText = nameDay.getNameDayFor(today);
  if (tweetText.length <= 0) {
    console.warn("No tweet text, nothing to tweet.");
    return;
  }

  let posterBase64 = await nameDay.getPoster({ date: new Date() });

  let twit = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    // optional HTTP request timeout to apply to all requests.
    timeout_ms: 60 * 1000,
  });

  const params = { media_data: posterBase64 };
  // The picture has to be uploaded first before we can tweet it.
  twit.post("media/upload", params, (err, data, response) => {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    let mediaIdStr = data.media_id_string;
    let altText = tweetText;
    let meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };

    twit.post("media/metadata/create", meta_params, (err, data, response) => {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { status: tweetText, media_ids: [mediaIdStr] };

        twit.post("statuses/update", params, (err, data, response) => {
          console.log(data);
        });
      }
    });
  });
})();
