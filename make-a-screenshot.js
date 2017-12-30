var puppeteer = require('puppeteer');
var svatky = require('./svatky.js');
var moment = require('moment-timezone');
var path = require('path');

async function makeAScreenshot(date = moment(), posterName = 'poster.png') {
  // no-sandbox to make it run in heroku
  // https://github.com/jontewks/puppeteer-heroku-buildpack
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  const page = await browser.newPage();

  // 1080 is instagrams max resolution
  // height is irrelevant as we will take a full page screenshot
  // (anything that's overflowing will be screenshotted as well)
  await page.setViewport({ width: 1080, height: 200 } );

  let posterHtmlPath = path.resolve(__dirname, 'poster.html');
  await page.goto('file://' + posterHtmlPath);

  let namedayMessage = svatky.getNamedayFor(date);

  await page.evaluate((namedayMessage) => {
    document.querySelector('.name').innerText = namedayMessage;
  }, namedayMessage);

  let posterBase64 = await page.screenshot({
    path: posterName,
    fullPage: true,
  })
    .then(buffer => buffer.toString('base64'));

  await browser.close();

  return posterBase64;
}

makeAScreenshot();

exports.makeAScreenshot = makeAScreenshot;
