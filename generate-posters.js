const makeAScreenshot = require("./make-a-screenshot.js").makeAScreenshot;
const jmeniny = require("./svatky.js").jmeniny;
const moment = require("moment-timezone");

async function generate() {
  let p = Promise.resolve();
  Object.keys(jmeniny).map((monthDayKey) => {
    let names = jmeniny[monthDayKey];
    let date = moment("2017-" + monthDayKey);

    // Makes those promises run in synchronous manner
    p = p.then(() => {
      console.log("Making a screenshot for ", date, names);
      return makeAScreenshot(date, "posters/" + monthDayKey + ".png");
    });
  });

  return p;
}

generate();
