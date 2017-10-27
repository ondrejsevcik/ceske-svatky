var cheerio = require('cheerio');
var fetch = require('node-fetch');

function download() {
  var url = 'https://cs.wikipedia.org/wiki/Mezin%C3%A1rodn%C3%AD_dny_a_roky';

  return fetch(url)
    .then(response => response.text())
    .then(body => cheerio.load(body))
    .then($ => {
      var table = $('table')[0];
      console.log(table);

      // Remove first row - it's heading and we don't need that
      $($(table).find('tr')[0]).remove();

      var rows = $(table).find('tr');

      return rows.map(row => {
        var date = $($(row).find('td')[0]).text();
        console.log(date);
        var holidayNames = $($(row).find('td')[1]).text();
        console.log(holidayNames);

        var result = {};
        result[date] = holidayNames;
        return result;
      })
      .get();
    });
}

download().then(result => console.log(result));
