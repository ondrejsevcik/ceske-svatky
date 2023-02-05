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

  const attachment = await masto.v2.mediaAttachments.create({
    file: await nameDay.getPosterBlob({ date: new Date() }),
    description: "Ilustrativní obrázek pro dnešní svátek.",
  });

  const status = await masto.v1.statuses.create({
    status: statusText,
    visibility: "public",
    mediaIds: [attachment.id],
  });

  console.log(status);
})();
