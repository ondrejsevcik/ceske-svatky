const makeAScreenshot = require("./make-a-screenshot.js").makeAScreenshot;
const jmeniny = require("./svatky.js").jmeniny;

async function generate() {
  let p = Promise.resolve();
  Object.keys(jmeniny).map((monthDayKey) => {
    let names = jmeniny[monthDayKey];
    let date = new Date();

    // Makes those promises run in synchronous manner
    p = p.then(() => {
      console.log("Making a screenshot for ", date.toISOString(), names);
      return makeAScreenshot(date, "posters/" + monthDayKey + ".png");
    });
  });

  return p;
}

generate();
