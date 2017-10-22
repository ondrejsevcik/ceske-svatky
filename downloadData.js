var fetch = require('node-fetch');
var cheerio = require('cheerio');
var moment = require('moment');


exports.downloadData = function () {
  var url = 'http://svatky.centrum.cz/kalendar-rocni/2020/';
  return fetch(url)
    .then(request => request.text())
    .then(body => cheerio.load(body, {decodeEntities: false}))
    .then($ => {
      return $('.calendar-items li a')
        .map((index, item) => {
          return {
            date: convertDateLabelToNumber($(item).attr('href')),
            text: $(item).find('.box').html()
              .split('\n')
            .map(i => i.trim())
            .map(i => i.replace(new RegExp('(<.+?>)', 'g'), '|')
              .split('|')
              .map(s => s.trim())
              .filter(s => s.length > 0))
            .filter(i => i.length > 0)
            .map(arr => {
              var obj = {};
              // Remove : at the end
              var categoryName = arr[0].substring(0, arr[0].length - 1);
              obj[categoryName] = arr.slice(1, arr.length);
              return obj;
            })
          }
        })
        .get()
        .reduce((result, nameDay) => {
          if (nameDay.text.length < 2) nameDay.text[1] = {};
          var record = {
            svatekSlavi: nameDay.text[0]['Svátek má'],
            // Zatim neresim - nejsou pravidelne tak jako jmeniny
            // vyznamneDny: nameDay.text[1]['Významné dny']
          };
          result[nameDay['date']] = record.svatekSlavi;
          return result;
        }, {});
    });
}

function convertDateLabelToNumber(strDate) {
  var dayToMonth = {
    "leden": 1,
    "unor": 2,
    "brezen": 3,
    "duben": 4,
    "kveten": 5,
    "cerven": 6,
    "cervenec": 7,
    "srpen": 8,
    "zari": 9,
    "rijen": 10,
    "listopad": 11,
    "prosinec": 12,
  };

  var d = strDate.split('/');
  var year = d[1];
  var month = dayToMonth[d[2]].toString();
  if (month.length < 2) month = "0" + month;
  var day = d[3];
  if (day.length < 2) day = "0" + day;

  var date = year + "-"  + month + "-" + day;
  return moment.utc(date).toISOString().substring(5, 10);
}

exports.downloadData().then(data => console.log(JSON.stringify(data, null, ' ')));
