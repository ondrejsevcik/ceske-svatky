var puppeteer = require('puppeteer');
var svatky = require('./svatky.js');
var moment = require('moment-timezone');
var path = require('path');

async function makeAScreenshot() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  // 1080 is instagrams max resolution
  await page.setViewport({ width: 1080, height: 200 } );

  let posterHtmlPath = path.resolve(__dirname, 'poster.html');
  await page.goto('file://' + posterHtmlPath);

  let namedayMessage = svatky.getNamedayFor(moment());

  await page.evaluate((namedayMessage) => {
    document.querySelector('.name').innerText = namedayMessage;
  }, namedayMessage);

  let posterBase64 = await page.screenshot({
    path: 'poster.png',
    fullPage: true,
  })
    .then(buffer => buffer.toString('base64'));

  await browser.close();

  return posterBase64;
}

makeAScreenshot();

exports.makeAScreenshot = makeAScreenshot;
