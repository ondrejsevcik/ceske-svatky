const Masto = require("masto");
const nameDay = require("./name-day.js");

(async () => {
  let statusText = nameDay.getNameDayFor(new Date());
  if (statusText.length <= 0) {
    throw new Error("Nothing to post.");
  }

  const masto = await Masto.login({
    url: "https://mastodonczech.cz",
    accessToken: process.env.MASTODON_ACCESS_TOKEN,
  });

  // let { data: media } = await twit.post("media/upload", {
  //   media_data: await nameDay.getPoster({ date: new Date() }),
  // });

  const status = await masto.v1.statuses.create({
    status: statusText,
    visibility: "public",
    // mediaIds: [attachment.id],
  });

  console.log(status);
})();
