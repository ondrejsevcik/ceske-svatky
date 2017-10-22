var data = require('./w.json');

var output = {};
for(var i = 0; i < data.length; i += 2) {
  output[data[i]] = data[i+1];
}

console.log(output);
