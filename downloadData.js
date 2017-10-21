var fetch = require('node-fetch');
var cheerio = require('cheerio');


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
        .get();
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
    "prosinec": 11,
  };

  var d = strDate.split('/');
  var year = parseInt(d[1]);
  var month = dayToMonth[d[2]];
  var day = parseInt(d[3]);

  return new Date(year, month, day).toISOString();
}
exports.downloadData().then(data => console.log(JSON.stringify(data, null, ' ')));
