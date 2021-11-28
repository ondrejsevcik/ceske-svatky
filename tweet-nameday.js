const Twit = require("twit");
const nameDay = require("./name-day.js");

(async () => {
  let tweetText = nameDay.getNameDayFor(new Date());
  if (tweetText.length <= 0) {
    throw new Error("Nothing to tweet.");
  }

  let twit = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    // optional HTTP request timeout to apply to all requests.
    timeout_ms: 60 * 1000,
  });

  let { data: media } = await twit.post("media/upload", {
    media_data: await nameDay.getPoster({ date: new Date() }),
  });

  await twit.post("media/metadata/create", {
    media_id: media.media_id_string,
    alt_text: { text: tweetText },
  });

  await twit.post("statuses/update", {
    status: tweetText,
    media_ids: [media.media_id_string],
  });
})();
